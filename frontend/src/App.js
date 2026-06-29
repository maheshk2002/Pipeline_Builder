import { useState, useCallback } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toast } from './components/Toast';

function App() {
  const [toast, setToast] = useState(null);
  const dismissToast = useCallback(() => setToast(null), []);

  return (
    <div className="pipeline-app">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton onShowToast={setToast} />
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
