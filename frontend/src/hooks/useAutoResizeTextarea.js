import { useEffect, useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';

const DEFAULT_MIN_WIDTH = 220;
const DEFAULT_MIN_HEIGHT = 60;
const DEFAULT_MAX_WIDTH = 320; 

export const useAutoResizeTextarea = (nodeId, dependencyKey = '', options = {}) => {
  const {
    minWidth = DEFAULT_MIN_WIDTH,
    minHeight = DEFAULT_MIN_HEIGHT,
    maxWidth = DEFAULT_MAX_WIDTH,
  } = options;

  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: minWidth,
    height: minHeight,
  });
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;

    // 1. Measure and cap the width FIRST
    element.style.width = 'auto';
    const rawWidth = element.scrollWidth + 4;
    const width = Math.max(minWidth, Math.min(rawWidth, maxWidth));
    element.style.width = `${width}px`;

    // 2. NOW measure height while the width is strictly capped (forcing text to wrap!)
    element.style.height = 'auto';
    const height = Math.max(minHeight, element.scrollHeight);
    element.style.height = `${height}px`;

    setDimensions({ width, height });
    updateNodeInternals(nodeId);
  }, [nodeId, minWidth, minHeight, maxWidth, updateNodeInternals, dependencyKey]);

  return { textareaRef, dimensions };
};
