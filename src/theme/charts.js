/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DATA VISUALISATION TOKENS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Chart colour is a separate job from UI colour, so it lives in its own file.
 *  Series colour follows the *entity*, never its rank — a filter that drops a
 *  series must not repaint the survivors. Assign in fixed order; never cycle.
 *
 *  Both palettes below were validated for colour-vision deficiency separation,
 *  lightness band, chroma floor, and contrast against their own surface. If you
 *  change a value, re-validate rather than eyeballing it — a pair that looks
 *  distinct to you can be identical under protanopia.
 *
 *  Steps are drawn from Ant Design's own preset ramps (light) and dark preset
 *  ramps (dark), nudged only where a step fell outside the lightness band.
 */

/** Fixed categorical order. Slot 0 is the first series in any chart. */
export const categorical = {
  light: ['#2f54eb', '#08979c', '#ad6800', '#c41d7f', '#722ed1', '#389e0d'],
  dark: ['#5273e0', '#13a8a8', '#bd8409', '#e0529c', '#854eca', '#49aa19'],
};

/** Human-readable names, so a legend never has to say "Series 3". */
export const categoricalNames = [
  'geekblue',
  'cyan',
  'gold',
  'magenta',
  'purple',
  'green',
];

/** Single hue, light → dark. For magnitude (heatmaps, choropleths, intensity). */
export const sequential = {
  light: ['#d6e4ff', '#adc6ff', '#85a5ff', '#597ef7', '#2f54eb', '#1d39c4'],
  dark: ['#131629', '#161d40', '#1c2755', '#263ea0', '#2b4acb', '#5273e0'],
};

/** Two poles plus a neutral midpoint. For polarity (variance, above/below target). */
export const diverging = {
  light: { negative: '#c41d7f', mid: '#8c8c8c', positive: '#08979c' },
  dark: { negative: '#e0529c', mid: '#8c8c8c', positive: '#13a8a8' },
};

/** Reserved for state. Never reuse these as a categorical slot. */
export const status = {
  light: { good: '#389e0d', warning: '#ad6800', serious: '#d4380d', critical: '#cf1322' },
  dark: { good: '#49aa19', warning: '#bd8409', serious: '#e87040', critical: '#e84749' },
};

/** Pick the palette for the active mode. */
export const chartPalette = (mode) => categorical[mode === 'dark' ? 'dark' : 'light'];
export const chartStatus = (mode) => status[mode === 'dark' ? 'dark' : 'light'];
export const chartSequential = (mode) => sequential[mode === 'dark' ? 'dark' : 'light'];
export const chartDiverging = (mode) => diverging[mode === 'dark' ? 'dark' : 'light'];
