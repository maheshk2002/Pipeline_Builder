import { DraggableNode } from './draggableNode';
import { TOOLBAR_NODES } from './nodes/nodeConfig';
import { useStore } from './store';

export const PipelineToolbar = () => {
  const isInteractive = useStore((state) => state.isInteractive);

  return (
    <header className={`pipeline-header ${!isInteractive ? 'pipeline-header--locked' : ''}`}>
      <div className="pipeline-header__brand">
        <span className="pipeline-header__title">Pipeline Builder</span>
        <span className="pipeline-header__divider" aria-hidden="true">·</span>
        <span className="pipeline-header__hint">
          {isInteractive ? 'Drag nodes onto the canvas' : 'Unlock canvas to add nodes'}
        </span>
      </div>
      <div className="toolbar-palette">
        {TOOLBAR_NODES.map(({ type, label }) => (
          <DraggableNode key={type} type={type} label={label} disabled={!isInteractive} />
        ))}
      </div>
    </header>
  );
};
