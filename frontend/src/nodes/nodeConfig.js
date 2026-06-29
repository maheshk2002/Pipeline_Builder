export const NODE_HEADER_COLORS = {
  customInput: '#27ae60',
  llm: '#c0392b',
  customOutput: '#00cec9',
  text: '#34495e',
  note: '#f1c40f',
  condition: '#9b59b6',
  api: '#e67e22',
  dataFilter: '#e84393',
  dashboard: '#2980b9',
};

export const NODE_HEADER_TEXT_COLORS = {
  note: '#0f172a',
};

export const TOOLBAR_NODES = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'note', label: 'NOTE' },
  { type: 'condition', label: 'Condition' },
  { type: 'api', label: 'API Request' },
  { type: 'dataFilter', label: 'Data Filter' },
  { type: 'dashboard', label: 'Dashboard' },
];

export const getNodeHeaderColor = (type) =>
  NODE_HEADER_COLORS[type] ?? '#34495e';

export const getNodeHeaderTextColor = (type) =>
  NODE_HEADER_TEXT_COLORS[type] ?? '#ffffff';

export const usesDarkHeaderText = (type) =>
  type in NODE_HEADER_TEXT_COLORS;
