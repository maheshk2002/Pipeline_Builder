const API_BASE = 'http://localhost:8000';

/** Backend response: { num_nodes, num_edges, is_dag } or { error } */
export async function parsePipeline(nodes, edges) {
  const formData = new FormData();
  formData.append('pipeline', JSON.stringify({ nodes, edges }));

  const response = await fetch(`${API_BASE}/pipelines/parse`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error ?? 'Pipeline parse request failed');
  }

  return data;
}

export function buildSuccessToast({ num_nodes, num_edges, is_dag }) {
  return {
    type: is_dag ? 'success' : 'warning',
    title: 'Pipeline Parse Result',
    subtitle: 'Response from /pipelines/parse',
    stats: [
      { key: 'num_nodes', label: 'num_nodes', value: num_nodes },
      { key: 'num_edges', label: 'num_edges', value: num_edges },
      {
        key: 'is_dag',
        label: 'is_dag',
        value: is_dag,
        display: is_dag ? 'true — Valid DAG' : 'false — Cycle detected',
        variant: is_dag ? 'success' : 'warning',
      },
    ],
    hint: is_dag
      ? undefined
      : 'Hover a connection and click × to remove it, or select an edge and press Delete.',
  };
}

export function buildErrorToast(error) {
  const isNetwork = error instanceof TypeError;
  return {
    type: 'error',
    title: isNetwork ? 'Backend Unreachable' : 'Parse Failed',
    subtitle: isNetwork ? 'Could not reach localhost:8000' : 'Server returned an error',
    message: isNetwork
      ? 'Start the Python backend with: uvicorn main:app --reload'
      : error.message,
  };
}
