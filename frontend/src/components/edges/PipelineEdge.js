import { memo } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from 'reactflow';
import { useStore } from '../../store';
import { FLOW_COLORS } from '../../constants/flowConfig';

function PipelineEdgeInner({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  selected,
}) {
  const hoveredEdgeId = useStore((state) => state.hoveredEdgeId);
  const setHoveredEdgeId = useStore((state) => state.setHoveredEdgeId);
  const scheduleClearHoveredEdge = useStore((state) => state.scheduleClearHoveredEdge);
  const removeEdge = useStore((state) => state.removeEdge);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const isHovered = hoveredEdgeId === id;
  const showDelete = selected || isHovered;

  return (
    <>
      {/* Wide transparent hit-area powers reliable hover detection */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={28}
        className="pipeline-edge__hit-area"
        onMouseEnter={() => setHoveredEdgeId(id)}
        onMouseLeave={scheduleClearHoveredEdge}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: FLOW_COLORS.edge,
          strokeWidth: selected ? 3.5 : 2.5,
          pointerEvents: 'none',
        }}
      />
      <EdgeLabelRenderer>
        {showDelete && (
          <div
            className="edge-delete nodrag nopan"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            onMouseEnter={() => setHoveredEdgeId(id)}
            onMouseLeave={scheduleClearHoveredEdge}
          >
            <button
              type="button"
              className="edge-delete__btn"
              onClick={(event) => {
                event.stopPropagation();
                removeEdge(id);
              }}
              aria-label="Delete connection"
              title="Delete connection"
            >
              ×
            </button>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}

export const PipelineEdge = memo(PipelineEdgeInner);
