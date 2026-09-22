# Tropisure — Design System & Prototypes

A static front-end reference for Tropisure's prototypes and the design system
behind them.
Nothing here talks to a backend — every screen is fixed data, so the only thing
under review is the design.

Built on **React 19 + Vite** with **Ant Design 6.3.2**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static dist/, openable from any path
npm run lint
```

---

## What's in here

| Route | What it is |
|---|---|
| `/` | Index — every prototype plus the design-system entry points |
| `/foundations/color` | Semantic ramps, neutrals, chart palettes, antd presets |
| `/foundations/typography` | Type scale, font stacks, inline treatments |
| `/foundations/layout` | Spacing, radius, control heights, elevation, breakpoints |
| `/foundations/tokens` | Searchable table of every resolved token, live |
| `/system/components` | Live gallery of antd components under this theme |
| `/system/patterns` | Agreed compositions — page headers, filter bars, forms, empty states |
| `/prototypes/*` | The prototypes themselves |

---

## Tweaking the design system

**Start here: [`src/theme/tokens.js`](src/theme/tokens.js).** It holds the seed
tokens — brand colours, type scale, radii, spacing rhythm, elevation. Ant Design
expands those seeds into ~400 map and alias tokens, so changing one value ripples
through every component and every prototype at once. Check the result on
`/foundations/tokens`, which reads the live theme.

Other files, in the order you'll reach for them:

| File | When to touch it |
|---|---|
| `src/theme/tokens.js` | Almost always. Seed values — the whole system derives from these. |
| `src/theme/components.js` | A single component needs to break from its derived default. |
| `src/theme/charts.js` | Chart colour. Separate from UI colour on purpose. |
| `src/theme/index.js` | How the theme is assembled (algorithms, dark-mode shadow overrides). |

The **Theme** button in the header is a preview playground — dark mode, primary
colour, corner radius, compact density. It writes to `localStorage`, not to the
source. Once you like something, commit it in `tokens.js`; the panel's reset
button takes you back to the committed seed.

### Chart colour

`src/theme/charts.js` carries four palettes — categorical, sequential, diverging,
and status — in light and dark variants. The categorical sets were validated for
colour-vision-deficiency separation, lightness band, chroma floor, and contrast
against their own surface. **Re-validate rather than eyeball if you change them**:
a pair that looks distinct to you can be identical under protanopia.

Rules the charts follow:

- Categorical hues are assigned in fixed order and never cycled. Colour follows
  the entity, not its rank — filtering a series out must not repaint the rest.
- One y-axis, ever. Two measures of different scale get two charts.
- A legend for two or more series, plus direct labels at the line ends, so
  identity is never carried by colour alone.
- Every chart has a table view (the toggle in its top-right corner).

---

## Adding a prototype

1. Drop a component in `src/pages/prototypes/`.
2. Wrap it in `<PrototypeFrame id="your-id">` so it gets the standard status bar.
3. Add one entry to `src/registry/prototypes.js`.

The index card, the sidebar link, and the route are all generated from that
entry. Nothing else needs editing.

```js
{
  id: 'your-id',
  title: 'Your prototype',
  summary: 'One or two lines — this shows on the index card.',
  status: 'concept',            // concept | review | approved | archived
  tags: ['Dashboard', 'Table'],
  owner: 'Design',
  updated: '2026-09-22',
  accent: ['#6366f1', '#a855f7'],   // the card thumbnail gradient
  component: lazy(() => import('../pages/prototypes/YourPrototype')),
}
```

---

## House rules for prototypes

These are what keep four prototypes from looking like four products.

- **Spacing and radius come from tokens** (`token.margin`, `token.borderRadiusLG`),
  never hard-coded pixels — otherwise compact mode breaks.
- **Colour comes from alias tokens** (`token.colorPrimary`, `token.colorBorderSecondary`),
  never raw hex. That is what keeps light and dark in sync.
- **One primary button per view.** Everything else is default, text, or link.
- **Check a pattern before inventing a layout.** `/system/patterns` already covers
  page headers, filter bars, metric rows, form layouts, and empty states.
- **Neutral tags need `variant="outlined"`.** The antd 6 default is `filled`,
  which is nearly invisible without a colour.
- **Destructive actions confirm, and name the thing** being destroyed.

---

## Project layout

```
src/
  theme/            seed tokens, component overrides, chart palettes, provider
  registry/         the prototype registry — single source for cards/nav/routes
  layouts/          app shell (sidebar, header, theme playground)
  components/       shared primitives (Section, Demo, CopyValue) and charts
  pages/
    Home.jsx        the index
    foundations/    colour, typography, spacing, token reference
    system/         component gallery + patterns
    prototypes/     the prototypes
```
