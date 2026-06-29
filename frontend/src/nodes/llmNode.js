import { BaseNode } from './BaseNode';
import { getNodeHeaderColor } from './nodeConfig';
import { NodeHandle } from '../components/handles/NodeHandle';
import { getHandleTopPercent } from '../utils/flowUtils';

export const LLMNode = ({ id }) => (
  // 1. THE BASENODE WRAPPER
  // We wrap the entire component in BaseNode so it instantly inherits your premium UI:
  // the dark mode background, the header bar, the delete button, and the box shadows.
  <BaseNode
    id={id}
    title="LLM Engine"
    // Dynamically grab the specific header color for LLM nodes (defined in your theme)
    headerColor={getNodeHeaderColor('llm')}
    handles={
      <>
        {/* INPUT 1: THE SYSTEM PROMPT MAGNET 
          This is where a user connects the "rules" for the AI (e.g., "You are a logistics expert...").
        */}
        <NodeHandle
          id={`${id}-system`}
          type="target"       // 'target' means this receives incoming data from another node
          position="left"     // Anchors the magnet to the left wall
          label="system"      // Triggers our custom CSS to render the label safely outside the node
          // getHandleTopPercent(index, total) spaces multiple handles perfectly without CSS grid.
          // For the 1st of 2 handles (index 0), this calculates to exactly 33.33% from the top.
          style={{ top: getHandleTopPercent(0, 2) }}
        />
        
        {/* INPUT 2: THE USER PROMPT MAGNET 
          This is where the user connects the actual dynamic data or question to be processed.
        */}
        <NodeHandle
          id={`${id}-prompt`}
          type="target"
          position="left"
          label="prompt"
          // For the 2nd of 2 handles (index 1), this calculates to exactly 66.66% from the top.
          style={{ top: getHandleTopPercent(1, 2) }}
        />
        
        {/* OUTPUT: THE AI RESPONSE MAGNET 
          This sends the AI's generated answer further down the pipeline.
        */}
        <NodeHandle
          id={`${id}-response`}
          type="source"       // 'source' means this sends data OUT to another node
          position="right"    // Anchors it to the right wall
          // Notice no label or 'top' style is needed here! Because there is only one output,
          // the NodeHandle component automatically defaults it to '50%' (perfectly centered).
        />
      </>
    }
  >
    {/* THE BODY CONTENT
      Unlike the Text or Condition nodes, the LLM node just processes data behind the scenes.
      It doesn't need text boxes or dropdowns, just a clean, descriptive label for the user.
    */}
    <p className="base-node__description">Large Language Model processor</p>
  </BaseNode>
);
