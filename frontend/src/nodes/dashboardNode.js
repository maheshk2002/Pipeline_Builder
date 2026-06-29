import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';

export const DashboardNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Dashboard"
    headerColor={getNodeHeaderColor('dashboard')}
    handles={<NodeHandle id={`${id}-data-in`} type="target" position="left" />}
  >
    <button type="button" className="base-node__action-btn nodrag">
      Ready to Visualize
    </button>
  </BaseNode>
);
