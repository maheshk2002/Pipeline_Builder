import { MarkerType } from 'reactflow';

export const GRID_SIZE = 20;
export const PRO_OPTIONS = { hideAttribution: true };

export const FLOW_COLORS = {
  edge: '#60a5fa',
  edgeGlow: '#3b82f6',
  handle: '#60a5fa',
  handleSource: '#34d399',
  handleBorder: '#1e3a5f',
  minimapEdge: '#60a5fa',
};

export const EDGE_TYPE = 'pipeline';

export const defaultEdgeOptions = {
  type: EDGE_TYPE,
  animated: true,
  markerEnd: {
    type: MarkerType.Arrow,
    height: 22,
    width: 22,
    color: FLOW_COLORS.edge,
  },
  style: {
    stroke: FLOW_COLORS.edge,
    strokeWidth: 2.5,
  },
};

export const createConnectionEdge = (connection) => ({
  ...connection,
  ...defaultEdgeOptions,
});
