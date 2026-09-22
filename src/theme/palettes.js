/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BRAND RAMP — Calamansi
 * ─────────────────────────────────────────────────────────────────────────────
 *  Ten fixed steps, hand-picked rather than generated, so the brand green is
 *  exactly the green Design signed off on. Ant Design normally derives these
 *  from a single seed; we map them explicitly instead (see src/theme/index.js).
 *
 *  Step 6 is the base — the colour people mean when they say "Calamansi".
 *  Index in code is 0-based, so calamansi.light[5] is step 6.
 *
 *  Step → Ant Design alias token
 *    1  colorPrimaryBg            8  colorPrimaryTextHover
 *    2  colorPrimaryBgHover       9  colorPrimaryText
 *    3  colorPrimaryBorder       10  colorPrimaryTextActive
 *    4  colorPrimaryBorderHover
 *    5  colorPrimaryHover
 *    6  colorPrimary   ← base
 *    7  colorPrimaryActive
 */
export const calamansi = {
  light: [
    '#F3F9E5', // 1
    '#E1F0BF', // 2
    '#CCE893', // 3
    '#B5DC64', // 4
    '#A7D645', // 5
    '#98D125', // 6  base
    '#7DB80F', // 7
    '#639C00', // 8
    '#4B7E00', // 9
    '#356000', // 10
  ],
  dark: [
    '#212716', // 1
    '#2C3617', // 2
    '#3A4A19', // 3
    '#49601B', // 4
    '#698E1F', // 5
    '#7EAB22', // 6  base
    '#8ABD23', // 7
    '#96CE25', // 8
    '#B3DD5F', // 9
    '#D6EDA9', // 10
  ],
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SECONDARY RAMP — Mangrove
 * ─────────────────────────────────────────────────────────────────────────────
 *  Same ten-step contract as Calamansi, same step → alias mapping. Calamansi is
 *  still the brand; Mangrove is selectable from the theme playground and is
 *  pinned step-for-step there rather than regenerated from its base.
 *
 */
export const mangrove = {
  light: [
    '#EDF3F3', // 1
    '#D1E0E1', // 2
    '#A9C5C7', // 3
    '#7DA4A8', // 4
    '#518489', // 5
    '#2D696E', // 6  base
    '#145156', // 7
    '#033B41', // 8
    '#002F34', // 9
    '#00191E', // 10
  ],
  dark: [
    '#1A2728', // 1
    '#1E3739', // 2
    '#244A4D', // 3
    '#2A6065', // 4
    '#5B8A8E', // 5
    '#7FA4A7', // 6  base
    '#94B3B5', // 7
    '#A9C2C4', // 8
    '#C0D2D4', // 9
    '#DCE6E7', // 10
  ],
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SECONDARY RAMP — Lagoon
 * ─────────────────────────────────────────────────────────────────────────────
 *  Same ten-step contract as the others.
 *
 *  Note the light ramp is not monotonic in lightness: steps 4-6 (#00BFBC,
 *  #00ACA9, #009E9C) are close in value and separate mostly by saturation, so
 *  adjacent steps read as one colour at chip size. Fine for fills, weak for
 *  anything that needs steps 4 and 5 to be told apart.
 */
export const lagoon = {
  light: [
    '#E2F7F5', // 1
    '#ACE7E6', // 2
    '#6BD4D2', // 3
    '#00BFBC', // 4
    '#00ACA9', // 5
    '#009E9C', // 6  base
    '#008280', // 7
    '#006966', // 8
    '#004F4D', // 9
    '#003633', // 10
  ],
  dark: [
    '#112928', // 1
    '#0F3938', // 2
    '#0C4C4C', // 3
    '#096362', // 4
    '#029190', // 5
    '#2AAEAC', // 6  base
    '#51BDBC', // 7
    '#76CBCA', // 8
    '#9DDAD9', // 9
    '#C9EBEA', // 10
  ],
};

/** The base step, used as the seed `colorPrimary`. */
export const calamansiBase = calamansi.light[5];

/**
 * Ink for text and icons sitting ON a Calamansi surface.
 *
 * The brand green is bright: white on step 6 is 1.83:1, far below the 4.5:1
 * that body-sized text needs. This dark olive clears 8:1 on both the light and
 * dark base steps, so anything on a brand fill uses it instead of white.
 */
export const onCalamansi = '#1F2A14';

/** Mangrove's base step. */
export const mangroveBase = mangrove.light[5];

/**
 * Ink on a Mangrove surface.
 *
 * Mangrove is a deep teal rather than a bright green, so white clears 6.25:1 on
 * the light base and no dark-ink swap is needed. Worth knowing: the dark ramp's
 * base (#518489) only reaches 4.19:1 with white, so on dark mode treat a
 * Mangrove fill as a large-text/UI surface, not a place for body copy.
 */
export const onMangrove = '#FFFFFF';

/**
 * Mangrove ink in dark mode.
 *
 * The dark base lightened to #7FA4A7 when the dark ramp was rebuilt, and white
 * only reaches 2.70:1 on it. Mangrove's own darkest step clears 6.71:1 instead.
 */
export const onMangroveDark = '#00191E';

/** Lagoon's base step. */
export const lagoonBase = lagoon.light[5];

/**
 * Ink on a Lagoon surface.
 *
 * Lagoon sits in the awkward middle: white on the light base is 3.3:1 and on
 * the dark base 2.81:1, so white fails outright. Even the ramp's own step 10
 * (#003633) only reaches 4.04:1. This darker teal clears 5.10:1 on the light
 * base and 5.98:1 on the dark one, so it is the ink for any Lagoon fill.
 */
export const onLagoon = '#002220';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BRAND GRADIENTS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Decorative surfaces — hero panels, empty states, feature cards. Not fills for
 *  controls, and never behind body copy at small sizes where the sweep competes
 *  with the text.
 *
 *  White fails on both (1.17:1 and 1.35:1), so everything on a gradient uses
 *  onBrandGradient. `minContrast` is that ink measured at the darkest point of
 *  each sweep, so it is the floor, not a best case.
 *
 *  Light-surface assets only — there is no dark-mode pair for either. On a dark
 *  page they glare, so gate them on mode rather than letting them through.
 *
 *  Names are descriptive placeholders; rename if design has real ones.
 */
export const brandGradients = [
  {
    // Warm cream into soft mint. Neither stop comes from a ramp.
    // Very pale and very flat — luminance only moves 0.81 → 0.84 across the
    // whole sweep, so it reads as a tint rather than a gradient at small sizes.
    name: 'Cream → Mint',
    from: '#FEEBC4',
    to: '#D0F0D7',
    angle: 135,
    minContrast: 12.24,
  },
  {
    // Lagoon step 3 into Calamansi step 3 — both are real ramp steps, so this
    // one ties the two ramps together. Deeper and with a much wider sweep than
    // Cream → Mint (luminance 0.55 → 0.73), so it carries at larger sizes but
    // leaves less contrast headroom for ink.
    name: 'Lagoon → Calamansi',
    from: '#6BD4D2',
    to: '#CCE893',
    angle: 135,
    minContrast: 8.56,
  },
];

/** A gradient as a CSS value. Angle is overridable for vertical hero bands. */
export const gradientCss = (g, angle = g.angle) =>
  `linear-gradient(${angle}deg, ${g.from} 0%, ${g.to} 100%)`;

/** The primary gradient, for callers that just want "the" brand gradient. */
export const brandGradient = brandGradients[0];
export const brandGradientCss = (angle) => gradientCss(brandGradient, angle);

/** Ink for text and icons on any brand gradient — the Calamansi ink, reused. */
export const onBrandGradient = onCalamansi;

/**
 * The hand-picked ramps, keyed by base hex.
 *
 * A primary that matches one of these gets its ten steps pinned exactly (see
 * src/theme/index.js). Anything else is a playground colour and antd derives it.
 */
const NAMED_RAMPS = {
  [calamansi.light[5].toLowerCase()]: {
    name: 'Calamansi',
    ramp: calamansi,
    on: { light: onCalamansi, dark: onCalamansi },
  },
  [mangrove.light[5].toLowerCase()]: {
    name: 'Mangrove',
    ramp: mangrove,
    on: { light: onMangrove, dark: onMangroveDark },
  },
  [lagoon.light[5].toLowerCase()]: {
    name: 'Lagoon',
    ramp: lagoon,
    on: { light: onLagoon, dark: onLagoon },
  },
};

/** Both hand-picked ramps, in brand order — what the Color page renders. */
export const namedRamps = Object.values(NAMED_RAMPS);

/** Look up a ramp by name, for anything that stores a ramp by label. */
export const rampByName = (name) =>
  namedRamps.find((r) => r.name.toLowerCase() === String(name).toLowerCase())?.ramp;

/** Look up a hand-picked ramp by primary hex. Falls back to the brand. */
export function namedRamp(primary) {
  if (!primary) return NAMED_RAMPS[calamansi.light[5].toLowerCase()];
  return NAMED_RAMPS[primary.toLowerCase()] ?? null;
}

/** Ramp lookup for the active mode. */
export const rampFor = (ramp, mode) => ramp[mode === 'dark' ? 'dark' : 'light'];

export const brandRamp = (mode) => rampFor(calamansi, mode);

/**
 * The readable brand step for text/borders on a neutral surface, for any ramp.
 *
 * Generalised from the calamansi* helpers below. The base step is a fill colour,
 * not a text colour (#98D125 on white is 1.83:1), so light mode drops to step 9
 * and dark mode rises to the dark ramp's base.
 */
export const rampText = (ramp, mode) => (mode === 'dark' ? ramp.dark[5] : ramp.light[8]);

/**
 * The primary BUTTON's hover fill: two steps toward the light end of the ramp.
 *
 * antd uses step 5 for this, which lightens in light mode but DARKENS in dark
 * mode (the ramp runs the other way), so hover read as a dip rather than a lift.
 * Two steps toward light gives the same lift in both modes.
 */
export const rampHover = (ramp, mode) => (mode === 'dark' ? ramp.dark[7] : ramp.light[3]);

/** One step further, for the pressed state. */
export const rampTextActive = (ramp, mode) => (mode === 'dark' ? ramp.dark[6] : ramp.light[9]);

/**
 * Brand-coloured TEXT on a neutral surface (links, selected tab labels,
 * selected menu items).
 *
 * Not the same as the base step: #98D125 on white is 1.83:1, so the base is a
 * fill colour, not a text colour. In light mode text drops to step 9 (4.90:1 on
 * white); in dark mode it rises to the dark ramp's base (10.8:1 on #141414).
 */
export const calamansiText = (mode) =>
  mode === 'dark' ? calamansi.dark[5] : calamansi.light[8];

export const calamansiTextHover = (mode) =>
  mode === 'dark' ? calamansi.dark[6] : calamansi.light[7];

export const calamansiTextActive = (mode) =>
  mode === 'dark' ? calamansi.dark[7] : calamansi.light[9];
