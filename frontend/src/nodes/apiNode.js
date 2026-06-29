import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');

  return (
    <BaseNode
      id={id}
      title="API Request"
      headerColor={getNodeHeaderColor('api')}
      handles={
        <>
          <NodeHandle id={`${id}-trigger`} type="target" position="left" />
          <NodeHandle id={`${id}-response`} type="source" position="right" />
        </>
      }
    >
      <label className="base-node__field-label">Endpoint URL</label>
      <input
        type="text"
        className="base-node__input nodrag"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </BaseNode>
  );
};
