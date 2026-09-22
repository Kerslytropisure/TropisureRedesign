/**
 * Per-component token overrides.
 *
 * Use this when a single component needs to break from the seed-derived default.
 * Prefer changing a seed token first — overrides here are local and won't ripple.
 *
 * Full list of overridable keys per component:
 * https://ant.design/docs/react/customize-theme#customize-component-token
 *
 * @param {object}  options
 * @param {boolean} options.usingBrand  false while the theme playground previews
 *                                      some other primary — antd's own derived
 *                                      ink is correct then, so stand aside.
 * @param {string}  options.onPrimary     ink for text/marks sitting on a brand fill.
 * @param {string}  options.defaultActive   pressed colour + border, default button.
 * @param {string}  options.defaultHoverBg  its hover background.
 * @param {string}  options.defaultHoverInk its hover border AND label.
 * @param {string}  options.primaryHover      primary button hover fill.
 * @param {string}  options.selectedLabelColor label of the active menu item / tab.
 * @param {string}  options.navSelectedColor   label of the selected sidebar item.
 * @param {number}  options.radiusSM        the resolved small corner radius.
 */
export const componentTokens = ({
  usingBrand = true,
  onPrimary,
  defaultActive,
  defaultHoverBg,
  defaultHoverInk,
  primaryHover,
  selectedLabelColor,
  navSelectedColor,
  radiusSM,
} = {}) => ({
  Button: {
    fontWeight: 500,
    primaryShadow: 'none',
    defaultShadow: 'none',
    dangerShadow: 'none',
    // Large buttons keep the small radius rather than borderRadiusLG, which
    // reads too soft at that size. Tracks the radius slider, not a fixed 6.
    ...(typeof radiusSM === 'number' ? { borderRadiusLG: radiusSM } : null),
    // White on Calamansi is 1.83:1. See onCalamansi in ./palettes.
    ...(usingBrand && onPrimary ? { primaryColor: onPrimary } : null),
    // Hover surface: Mangrove 1 fill, Mangrove 10 border and label. antd would
    // otherwise use colorPrimaryHover, a LIGHTER step than the base at 1.70:1.
    ...(defaultHoverBg ? { defaultHoverBg } : null),
    ...(defaultHoverInk
      ? { defaultHoverColor: defaultHoverInk, defaultHoverBorderColor: defaultHoverInk }
      : null),
    // Scoped to Button so links and menus keep antd's colorPrimaryHover.
    ...(primaryHover ? { colorPrimaryHover: primaryHover } : null),
    ...(defaultActive
      ? { defaultActiveColor: defaultActive, defaultActiveBorderColor: defaultActive }
      : null),
  },
  Card: {
    headerFontSize: 15,
    paddingLG: 20,
  },
  Checkbox: {
    // The tick is painted with colorWhite, which disappears on a brand fill.
    ...(usingBrand && onPrimary ? { colorWhite: onPrimary } : null),
  },
  Layout: {
    headerBg: 'transparent',
    bodyBg: 'transparent',
    siderBg: 'transparent',
  },
  Menu: {
    itemBorderRadius: 8,
    itemMarginInline: 8,
    itemHeight: 36,
    collapsedIconSize: 15,
    // Horizontal menus: the active item's label matches an inactive one, so the
    // underline carries the state on its own rather than a colour change too.
    ...(selectedLabelColor ? { horizontalItemSelectedColor: selectedLabelColor } : null),
    // Vertical/inline nav: antd puts colorPrimary here; Mangrove 10 instead.
    ...(navSelectedColor ? { itemSelectedColor: navSelectedColor } : null),
  },
  Table: {
    headerBorderRadius: 0,
    cellPaddingBlock: 12,
  },
  Tabs: {
    horizontalItemPadding: '10px 0',
    // Same rule as the horizontal menu: the active label reads as body text and
    // the ink bar alone carries the state. antd keeps inkBarColor on
    // colorPrimary by default, which is the brand — left untouched.
    ...(selectedLabelColor ? { itemSelectedColor: selectedLabelColor } : null),
  },
  Segmented: {
    trackPadding: 3,
  },
});
