import { Handle, Position } from 'reactflow';

const POSITIONS = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const NodeHandle = ({
  id,
  type,
  position = 'left',
  style,
  label,
}) => {
  // 1. Convert our standard string position (e.g., 'left') into a React Flow Position object.
  const resolvedPosition =
    typeof position === 'string' ? POSITIONS[position] : position;

  // 2. Check if this specific magnet is sitting on the right side of the node.
  const isRight = resolvedPosition === Position.Right;

  // 3. Dynamic Label Math:
  // If the magnet is on the RIGHT, we push the label exactly -16px past the right edge,
  // and use CSS translate(100%) so the text expands outward away from the node.
  // If the magnet is on the LEFT, we mirror that math and push it outside the left edge.
  const labelStyle = {
    top: style?.top ?? '50%', // Keep the vertical spacing passed down from the parent
    ...(isRight
      ? { right: '-16px', left: 'auto', transform: 'translate(100%, -50%)' }
      : { left: '-16px', right: 'auto', transform: 'translate(-100%, -50%)' }
    )
  };

  return (
    <>
      {/* 4. The Label: Only render this span if a label string was actually passed in */}
      {label && (
        <span className="node-handle__label" style={labelStyle}>
          {label}
        </span>
      )}
      
      {/* 5. The Magnet: The actual physical React Flow connection point */}
      <Handle
        id={id}
        type={type}
        position={resolvedPosition}
        style={style}
        className={`node-handle node-handle--${type}`}
      />
    </>
  );
};