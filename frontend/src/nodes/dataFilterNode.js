import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';

export const DataFilterNode = ({ id, data }) => {
  const [filterLogic, setFilterLogic] = useState(data?.filterLogic || 'Remove Duplicates');

  return (
    <BaseNode
      id={id}
      title="Data Filter"
      headerColor={getNodeHeaderColor('dataFilter')}
      handles={
        <>
          <NodeHandle id={`${id}-raw-data`} type="target" position="left" />
          <NodeHandle id={`${id}-clean-data`} type="source" position="right" />
        </>
      }
    >
      <label className="base-node__field-label">Operation</label>
      <select
        className="base-node__select nodrag"
        value={filterLogic}
        onChange={(e) => setFilterLogic(e.target.value)}
      >
        <option value="Remove Duplicates">Remove Duplicates</option>
        <option value="Sort Ascending">Sort Ascending</option>
        <option value="Filter Nulls">Filter Nulls</option>
      </select>
    </BaseNode>
  );
};
