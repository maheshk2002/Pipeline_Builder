import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      headerColor={getNodeHeaderColor('customInput')}
      handles={<NodeHandle id={`${id}-value`} type="source" position="right" />}
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
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
      >
        <option value="Text">Text</option>
        <option value="File">File</option>
      </select>
    </BaseNode>
  );
};
