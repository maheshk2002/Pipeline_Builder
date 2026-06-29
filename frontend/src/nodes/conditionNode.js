import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';

export const ConditionNode = ({ id, data }) => {
  // Manage the local state of the text input box
  const [condition, setCondition] = useState(data?.condition || 'If weight > 50kg');

  return (
    <BaseNode
      id={id}
      title="Condition"
      headerColor={getNodeHeaderColor('condition')}
      handles={
        <>
          {/* SINGLE INPUT: The data coming in to be evaluated */}
          <NodeHandle 
            id={`${id}-input`} 
            type="target" 
            position="left" 
          />
          
          {/* OUTPUT 1: The 'True' Branch */}
          <NodeHandle 
            id={`${id}-true`} 
            type="source" 
            position="right" 
            label="true" 
            // Hardcoding top: '30%' pushes this magnet up towards the top-right corner
            style={{ top: '30%' }} 
          />
          
          {/* OUTPUT 2: The 'False' Branch */}
          <NodeHandle 
            id={`${id}-false`} 
            type="source" 
            position="right" 
            label="false" 
            // Hardcoding top: '70%' pushes this magnet down towards the bottom-right corner
            style={{ top: '70%' }} 
          />
        </>
      }
    >
      <label className="base-node__field-label">Logic Rule</label>
      <input
        type="text"
        className="base-node__input nodrag"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      />
    </BaseNode>
  );
};
