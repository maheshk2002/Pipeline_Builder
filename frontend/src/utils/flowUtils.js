/** Matches valid JS identifiers inside {{ }} */
export const TEXT_VARIABLE_REGEX = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;

export const parseTextVariables = (text) => {
  const matches = [...text.matchAll(TEXT_VARIABLE_REGEX)];
  return [...new Set(matches.map((match) => match[1]))];
};

export const getHandleTopPercent = (index, total) => {
  if (total <= 1) return '50%';
  return `${((index + 1) * 100) / (total + 1)}%`;
};
