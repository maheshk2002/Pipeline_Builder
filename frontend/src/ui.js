import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from './constants/nodeRegistry';
import {
  GRID_SIZE,
  PRO_OPTIONS,
  FLOW_COLORS,
  defaultEdgeOptions,
} from './constants/flowConfig';
import { edgeTypes } from './constants/edgeRegistry';
import { PipelineMiniMap } from './components/PipelineMiniMap';

import 'reactflow/dist/style.css';

const storeSelector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  isInteractive: state.isInteractive,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setInteractive: state.setInteractive,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    isInteractive,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setInteractive,
  } = useStore(storeSelector, shallow);

  const onDrop = useCallback(
    (event) => {
      if (!isInteractive) return;
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const rawData = event.dataTransfer?.getData('application/reactflow');
      if (!rawData) return;

      const { nodeType: type } = JSON.parse(rawData);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: { id: nodeID, nodeType: type },
      });
    },
    [isInteractive, reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback(
    (event) => {
      if (!isInteractive) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [isInteractive]
  );

  const canvasClass = isInteractive
    ? 'pipeline-canvas'
    : 'pipeline-canvas pipeline-canvas--locked';

  return (
    <main className="pipeline-main">
      <div ref={reactFlowWrapper} className={canvasClass}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={isInteractive ? onConnect : undefined}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          proOptions={PRO_OPTIONS}
          snapGrid={[GRID_SIZE, GRID_SIZE]}
          connectionLineType="smoothstep"
          connectionLineStyle={{
            stroke: FLOW_COLORS.edge,
            strokeWidth: 2.5,
          }}
          nodesDraggable={isInteractive}
          nodesConnectable={isInteractive}
          elementsSelectable={isInteractive}
          edgesFocusable={isInteractive}
          edgesDeletable={isInteractive}
          deleteKeyCode={isInteractive ? ['Backspace', 'Delete'] : null}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          panOnScroll={false}
        >
          <Background color="#4a6280" gap={GRID_SIZE} size={1.2} />
          <Controls position="bottom-left" onInteractiveChange={setInteractive} />
          <PipelineMiniMap />
        </ReactFlow>
        {!isInteractive && (
          <div className="pipeline-canvas__lock-badge" aria-live="polite">
            Canvas locked — unlock to edit
          </div>
        )}
      </div>
    </main>
  );
};
