import { theme as antdTheme } from 'antd';
import { seedToken } from './tokens';
import { componentTokens } from './components';
import { mangrove, namedRamp, rampFor, rampHover, rampTextActive } from './palettes';

export { seedToken, appTokens } from './tokens';
export { componentTokens } from './components';

/**
 * The ten alias tokens Ant Design derives for a semantic colour, in ramp order.
 * Mapping our fixed brand ramp onto these is what makes Calamansi exact rather
 * than generated.
 */
const PRIMARY_ALIASES = [
  'colorPrimaryBg',
  'colorPrimaryBgHover',
  'colorPrimaryBorder',
  'colorPrimaryBorderHover',
  'colorPrimaryHover',
  'colorPrimary',
  'colorPrimaryActive',
  'colorPrimaryTextHover',
  'colorPrimaryText',
  'colorPrimaryTextActive',
];

/** Pins the primary alias tokens to a hand-picked ten-step ramp. */
function applyRamp(token, ramp, mode) {
  const steps = rampFor(ramp, mode);
  PRIMARY_ALIASES.forEach((alias, i) => {
    token[alias] = steps[i];
  });
}

/**
 * Re-pins the ramp in the MAP token, after the light/dark algorithm has run.
 *
 * Nine of the ten aliases survive as plain overrides on `token`, but
 * `colorPrimary` is also a SEED, so the algorithm re-derives it —
 * generate(seed, { theme: 'dark' })[5] — and in dark mode that lands several
 * shades off the step we picked. Running last as an algorithm is what makes the
 * pinned value stick; setting it on `token` alone does not.
 */
const pinRampAlgorithm = (steps) => (seed, map) => ({
  ...map,
  ...Object.fromEntries(PRIMARY_ALIASES.map((alias, i) => [alias, steps[i]])),
});

/**
 * Builds the ConfigProvider `theme` prop.
 *
 * @param {object}  options
 * @param {'light'|'dark'} options.mode
 * @param {boolean} options.compact   apply antd's compact algorithm on top
 * @param {string}  [options.primary] override colorPrimary (theme playground)
 * @param {number}  [options.radius]  override borderRadius (theme playground)
 */
export function buildTheme({ mode = 'light', compact = false, primary, radius }) {
  const algorithm = [
    mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  ];
  if (compact) algorithm.push(antdTheme.compactAlgorithm);

  const token = { ...seedToken };
  if (typeof radius === 'number') {
    token.borderRadius = radius;
    token.borderRadiusLG = radius + 4;
    token.borderRadiusSM = Math.max(2, radius - 4);
  }

  // Our ramps are hand-picked, so we pin all ten steps rather than let antd
  // generate them from a seed. That applies to any ramp in ./palettes, not just
  // the brand — picking Mangrove gets its exact steps too. An arbitrary
  // playground colour has no ramp, so antd derives that one normally.
  const picked = namedRamp(primary);
  if (picked) {
    applyRamp(token, picked.ramp, mode);
    algorithm.push(pinRampAlgorithm(rampFor(picked.ramp, mode)));
  } else {
    token.colorPrimary = primary;
  }

  // Shadows in the seed are tuned for light surfaces; dark needs more contrast.
  if (mode === 'dark') {
    token.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.45), 0 1px 3px 0 rgba(0, 0, 0, 0.35)';
    token.boxShadowSecondary =
      '0 4px 6px -2px rgba(0, 0, 0, 0.40), 0 12px 16px -4px rgba(0, 0, 0, 0.45)';
  }

  // colorText is algorithm-derived, so ask antd for it rather than guessing.
  const derived = antdTheme.getDesignToken({ algorithm, token });

  return {
    algorithm,
    token,
    components: componentTokens({
      usingBrand: Boolean(picked),
      onPrimary: picked?.on[mode === 'dark' ? 'dark' : 'light'],
      // antd points the default button's hover at colorPrimaryHover, which is a
      // LIGHTER step than the base — 1.70:1 on white. Pull it down the ramp.
      defaultActive: picked && rampTextActive(picked.ramp, mode),
      // The secondary hover surface is pinned to Mangrove rather than the active
      // ramp, so it stays put while the playground previews another primary.
      // Both ends flip with mode, so the pair reads correctly either way:
      // step 1 fill with step 10 border and label, 16.16:1 in both.
      defaultHoverBg: rampFor(mangrove, mode)[0],
      defaultHoverInk: rampFor(mangrove, mode)[9],
      // Sidebar nav: the selected label is Mangrove 10 rather than the brand,
      // so the vertical menu does not compete with the primary colour.
      navSelectedColor: rampFor(mangrove, mode)[9],
      primaryHover: picked && rampHover(picked.ramp, mode),
      // Active menu items and tabs read as body text, not as brand links; the
      // underline / ink bar is what carries the selected state.
      selectedLabelColor: derived.colorText,
      radiusSM: token.borderRadiusSM,
    }),
    cssVar: true,
  };
}
