import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      headerColor={getNodeHeaderColor('customOutput')}
      handles={<NodeHandle id={`${id}-value`} type="target" position="left" />}
    >
      <label className="base-node__field-label">Name</label>
      <input
        type="text"
        className="base-node__input nodrag"
        value={currName}
        onChange={(e) => setCurrName(e.target.value)}
      />
      <label className="base-node__field-label">Type</label>
      <select
        className="base-node__select nodrag"
        value={outputType}
        onChange={(e) => setOutputType(e.target.value)}
      >
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </BaseNode>
  );
};
