import { calamansiBase } from './palettes';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEED TOKENS — this is the file you tweak.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything else in the app derives from here. Ant Design expands these seeds
 *  into ~400 map + alias tokens (see the "Tokens" page for the live table).
 *
 *  Reference: https://ant.design/docs/react/customize-theme
 */

/** Brand palette. Swap these for your own brand colours. */
export const brand = {
  /** Calamansi step 6. The full ramp lives in ./palettes.js. */
  colorPrimary: calamansiBase,
  colorSuccess: '#16a34a',
  colorWarning: '#d97706',
  colorError: '#dc2626',
  colorInfo: '#0ea5e9',
};

/** Type scale + font stacks. */
export const typography = {
  fontFamily:
    "'Google Sans', 'Google Sans Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontFamilyCode:
    "'Google Sans Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  fontSize: 14,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,
  lineHeight: 1.5714285714285714,
};

/** Shape: corner radii and control heights. */
export const shape = {
  borderRadius: 10,
  borderRadiusLG: 14,
  borderRadiusSM: 6,
  borderRadiusXS: 4,
  controlHeight: 38,
};

/** Spacing rhythm + elevation. */
export const layout = {
  sizeUnit: 4,
  sizeStep: 4,
  padding: 16,
  margin: 16,
  wireframe: false,
  boxShadow:
    '0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0 rgba(16, 24, 40, 0.10)',
  boxShadowSecondary:
    '0 4px 6px -2px rgba(16, 24, 40, 0.05), 0 12px 16px -4px rgba(16, 24, 40, 0.10)',
  boxShadowTertiary:
    '0 1px 2px 0 rgba(16, 24, 40, 0.03), 0 1px 6px -1px rgba(16, 24, 40, 0.02)',
};

/** The seed object handed to ConfigProvider. */
export const seedToken = {
  ...brand,
  ...typography,
  ...shape,
  ...layout,
};

/**
 * Non-antd design decisions the app itself uses (page widths, nav sizing).
 * Kept separate so they never collide with real antd token names.
 */
export const appTokens = {
  maxContentWidth: 1240,
  sidebarWidth: 248,
  headerHeight: 60,
};
