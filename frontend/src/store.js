import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { createConnectionEdge } from './constants/flowConfig';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  isInteractive: true,
  hoveredEdgeId: null,
  _hoverClearTimer: null,

  setInteractive: (isInteractive) => set({ isInteractive }),

  setHoveredEdgeId: (hoveredEdgeId) => {
    clearTimeout(get()._hoverClearTimer);
    set({ hoveredEdgeId, _hoverClearTimer: null });
  },

  scheduleClearHoveredEdge: () => {
    clearTimeout(get()._hoverClearTimer);
    const timer = setTimeout(() => set({ hoveredEdgeId: null, _hoverClearTimer: null }), 120);
    set({ _hoverClearTimer: timer });
  },

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  removeNode: (id) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
    });
  },

  removeEdge: (id) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== id),
      hoveredEdgeId: get().hoveredEdgeId === id ? null : get().hoveredEdgeId,
    });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    if (!get().isInteractive) return;
    set({
      edges: addEdge(createConnectionEdge(connection), get().edges),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    });
  },
}));
