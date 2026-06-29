import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import {
  parsePipeline,
  buildSuccessToast,
  buildErrorToast,
} from './services/pipelineApi';

export const SubmitButton = ({ onShowToast }) => {
  const { nodes, edges } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await parsePipeline(nodes, edges);
      onShowToast(buildSuccessToast(result));
    } catch (error) {
      onShowToast(buildErrorToast(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="pipeline-footer">
      <div className="submit-section">
        <p className="submit-section__hint">
          {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} connection{edges.length !== 1 ? 's' : ''}
        </p>
        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="submit-btn__spinner" aria-hidden="true" />
          ) : (
            <span className="submit-btn__icon" aria-hidden="true">▶</span>
          )}
          {isSubmitting ? 'Analyzing…' : 'Submit Pipeline'}
        </button>
      </div>
    </footer>
  );
};
