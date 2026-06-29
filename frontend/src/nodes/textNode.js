import { useMemo, useState } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea';
import { parseTextVariables, getHandleTopPercent } from '../utils/flowUtils';
import { TEXT_NODE_LIMITS } from '../constants/uiConfig';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const variables = useMemo(() => parseTextVariables(currText), [currText]);

  const { textareaRef, dimensions } = useAutoResizeTextarea(
    id,
    `${currText}|${variables.join(',')}`,
    { ...TEXT_NODE_LIMITS, maxWidth: 225 } // Explicitly cap width to force vertical growth
  );

  const containerWidth = dimensions.width + 50;

  return (
    <BaseNode
      id={id}
      title="Text Prompt"
      headerColor={getNodeHeaderColor('text')}
      className="base-node--text"
      style={{
        width: containerWidth,
        minWidth: TEXT_NODE_LIMITS.minWidth + 50,
      }}
      handles={
        <>
          {variables.map((variable, index) => (
            <NodeHandle
              key={`${id}-${variable}`}
              id={`${id}-${variable}`}
              type="target"
              position="left"
              label={variable}
              style={{ top: getHandleTopPercent(index, variables.length) }}
            />
          ))}
          <NodeHandle id={`${id}-output`} type="source" position="right" />
        </>
      }
    >
      <label className="base-node__field-label">Text</label>
      <textarea
        ref={textareaRef}
        className="base-node__textarea nodrag"
        value={currText}
        onChange={(event) => setCurrText(event.target.value)}
        placeholder="Use {{variableName}} for inputs"
        style={{
          overflow: 'hidden',
          resize: 'none',
          boxSizing: 'border-box',
          whiteSpace: 'pre-wrap', // Guarantees word wrapping
          minHeight: `${TEXT_NODE_LIMITS.minHeight}px`,
        }}
      />
    </BaseNode>
  );
};