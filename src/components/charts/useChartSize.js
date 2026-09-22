import { useEffect, useRef, useState } from 'react';

/** Tracks a container's width so SVG charts can lay out responsively. */
export function useChartSize(initial = 640) {
  const ref = useRef(null);
  const [width, setWidth] = useState(initial);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(240, Math.floor(entry.contentRect.width)));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

/** Step sizes that produce axis labels people read without decoding. */
const NICE_STEPS = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

function niceStep(raw) {
  if (raw <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const normalised = raw / magnitude;
  return (NICE_STEPS.find((s) => s >= normalised) ?? 10) * magnitude;
}

/**
 * Picks an axis maximum that is a whole number of readable steps, so the plot
 * fills its box instead of leaving the top third empty.
 */
export function niceAxis(dataMax, lines) {
  const step = niceStep(dataMax / lines);
  return { max: step * lines, step };
}

/** Rounds a bar-chart baseline maximum up to a readable value. */
export function niceMax(value) {
  return niceStep(value);
}
