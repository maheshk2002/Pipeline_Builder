import { memo, useRef, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import {
  Panel,
  useStore,
  useStoreApi,
  getNodePositionWithOrigin,
  getBoundsOfRects,
  getRectOfNodes,
  getSmoothStepPath,
  Position,
} from 'reactflow';
import { getNodeHeaderColor } from '../nodes/nodeConfig';
import { theme } from '../theme';

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 150;
const OFFSET_SCALE = 5;

const viewportSelector = (s) => {
  const nodes = s.getNodes();
  const viewBB = {
    x: -s.transform[0] / s.transform[2],
    y: -s.transform[1] / s.transform[2],
    width: s.width / s.transform[2],
    height: s.height / s.transform[2],
  };

  return {
    nodes: nodes.filter((node) => !node.hidden && node.width && node.height),
    edges: s.edges.filter((edge) => !edge.hidden),
    nodeOrigin: s.nodeOrigin,
    viewBB,
    boundingRect:
      nodes.length > 0
        ? getBoundsOfRects(getRectOfNodes(nodes, s.nodeOrigin), viewBB)
        : viewBB,
    rfId: s.rfId,
  };
};

const getNodeCenter = (node, nodeOrigin) => {
  const { x, y } = getNodePositionWithOrigin(node, nodeOrigin).positionAbsolute;
  return {
    x: x + (node.width ?? 0) / 2,
    y: y + (node.height ?? 0) / 2,
  };
};

function PipelineMiniMapInner() {
  const svgRef = useRef(null);
  const viewScaleRef = useRef(0);
  const store = useStoreApi();
  const { nodes, edges, nodeOrigin, viewBB, boundingRect, rfId } = useStore(
    viewportSelector,
    shallow
  );

  const elementWidth = DEFAULT_WIDTH;
  const elementHeight = DEFAULT_HEIGHT;
  const scaledWidth = boundingRect.width / elementWidth;
  const scaledHeight = boundingRect.height / elementHeight;
  const viewScale = Math.max(scaledWidth, scaledHeight);
  const viewWidth = viewScale * elementWidth;
  const viewHeight = viewScale * elementHeight;
  const offset = OFFSET_SCALE * viewScale;
  const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
  const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
  const width = viewWidth + offset * 2;
  const height = viewHeight + offset * 2;

  viewScaleRef.current = viewScale;

  useEffect(() => {
    if (!svgRef.current) return undefined;

    const selection = select(svgRef.current);
    const panHandler = (event) => {
      const { transform, d3Selection, d3Zoom, translateExtent, width: w, height: h } =
        store.getState();
      if (event.sourceEvent.type !== 'mousemove' || !d3Selection || !d3Zoom) return;

      const moveScale = viewScaleRef.current * Math.max(1, transform[2]);
      const position = {
        x: transform[0] - event.sourceEvent.movementX * moveScale,
        y: transform[1] - event.sourceEvent.movementY * moveScale,
      };
      const extent = [
        [0, 0],
        [w, h],
      ];
      const nextTransform = zoomIdentity.translate(position.x, position.y).scale(transform[2]);
      const constrainedTransform = d3Zoom.constrain()(nextTransform, extent, translateExtent);
      d3Zoom.transform(d3Selection, constrainedTransform);
    };

    const zoomHandler = (event) => {
      const { transform, d3Selection, d3Zoom } = store.getState();
      if (event.sourceEvent.type !== 'wheel' || !d3Selection || !d3Zoom) return;

      const pinchDelta =
        -event.sourceEvent.deltaY *
        (event.sourceEvent.deltaMode === 1 ? 0.05 : event.sourceEvent.deltaMode ? 1 : 0.002) *
        10;
      const nextZoom = transform[2] * 2 ** pinchDelta;
      d3Zoom.scaleTo(d3Selection, nextZoom);
    };

    const zoomAndPan = zoom()
      .on('zoom', panHandler)
      .on('zoom.wheel', zoomHandler);

    selection.call(zoomAndPan);

    return () => {
      selection.on('zoom', null);
    };
  }, [store]);

  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));

  const edgePaths = edges
    .map((edge) => {
      const source = nodeById[edge.source];
      const target = nodeById[edge.target];
      if (!source || !target) return null;

      const sourceCenter = getNodeCenter(source, nodeOrigin);
      const targetCenter = getNodeCenter(target, nodeOrigin);
      const [path] = getSmoothStepPath({
        sourceX: sourceCenter.x,
        sourceY: sourceCenter.y,
        targetX: targetCenter.x,
        targetY: targetCenter.y,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });

      return { id: edge.id, path };
    })
    .filter(Boolean);

  const labelledBy = `pipeline-minimap-desc-${rfId}`;

  return (
    <Panel position="bottom-right" className="react-flow__minimap pipeline-minimap">
      <svg
        ref={svgRef}
        width={elementWidth}
        height={elementHeight}
        viewBox={`${x} ${y} ${width} ${height}`}
        role="img"
        aria-labelledby={labelledBy}
      >
        <title id={labelledBy}>Pipeline minimap</title>

        <g className="pipeline-minimap__edges">
          {edgePaths.map(({ id, path }) => (
            <path
              key={id}
              className="pipeline-minimap__edge"
              d={path}
              fill="none"
            />
          ))}
        </g>

        <g className="pipeline-minimap__nodes">
          {nodes.map((node) => {
            const { x: nx, y: ny } = getNodePositionWithOrigin(node, nodeOrigin)
              .positionAbsolute;
            return (
              <rect
                key={node.id}
                className="react-flow__minimap-node"
                x={nx}
                y={ny}
                width={node.width}
                height={node.height}
                rx={4}
                ry={4}
                fill={getNodeHeaderColor(node.type)}
                stroke={theme.colors.panelBg}
                strokeWidth={2}
              />
            );
          })}
        </g>

        <path
          className="react-flow__minimap-mask"
          d={`M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
              M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z`}
          fill="rgba(2, 10, 26, 0.72)"
          fillRule="evenodd"
          stroke="rgba(148, 163, 184, 0.35)"
          strokeWidth={1}
          pointerEvents="none"
        />
      </svg>
    </Panel>
  );
}

export const PipelineMiniMap = memo(PipelineMiniMapInner);
