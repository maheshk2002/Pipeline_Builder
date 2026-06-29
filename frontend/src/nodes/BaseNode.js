import { useStore } from '../store';

export const BaseNode = ({
  id,
  title,
  children,
  handles,
  style,
  className = '',
  headerColor = '#34495e',
  headerTextColor = '#ffffff',
}) => {
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div className={`base-node ${className}`.trim()} style={style}>
      <div
        className="base-node__header"
        style={{ backgroundColor: headerColor }}
      >
        <div className="base-node__header-spacer" aria-hidden="true" />
        <span
          className="base-node__title"
          style={{ color: headerTextColor }}
        >
          {title}
        </span>
        <button
          type="button"
          className="base-node__delete nodrag"
          onClick={() => removeNode(id)}
          aria-label="Remove node"
        >
          ×
        </button>
      </div>
      <div className="base-node__body">{children}</div>
      {handles && <div className="base-node__handles">{handles}</div>}
    </div>
  );
};
