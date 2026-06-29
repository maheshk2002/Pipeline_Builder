import {
  getNodeHeaderColor,
  getNodeHeaderTextColor,
  usesDarkHeaderText,
} from './nodes/nodeConfig';

export const DraggableNode = ({ type, label, headerColor, disabled = false }) => {
  const color = headerColor ?? getNodeHeaderColor(type);
  const textColor = getNodeHeaderTextColor(type);
  const labelClass = usesDarkHeaderText(type)
    ? 'toolbar-node__label toolbar-node__label--dark'
    : 'toolbar-node__label toolbar-node__label--light';

  const onDragStart = (event, nodeType) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`toolbar-node ${type} ${disabled ? 'toolbar-node--disabled' : ''}`}
      onDragStart={(event) => onDragStart(event, type)}
      style={{ backgroundColor: color }}
      draggable={!disabled}
      aria-disabled={disabled}
    >
      <span className={labelClass} style={{ color: textColor }}>
        {label}
      </span>
    </div>
  );
};
