import { generate, presetPalettes } from '@ant-design/colors';
import { Card, Col, Flex, Row, Space, Tag, theme, Tooltip, Typography } from 'antd';
import { PageHeader, Section, CopyValue } from '../../components/primitives';
import { useThemeSettings } from '../../theme/themeContext';
import {
  brandGradients,
  gradientCss,
  namedRamps,
  onBrandGradient,
} from '../../theme/palettes';
import {
  categoricalNames,
  chartDiverging,
  chartPalette,
  chartSequential,
  chartStatus,
} from '../../theme/charts';

const SEMANTIC = [
  { key: 'Primary', prefix: 'colorPrimary', use: 'Brand actions, selected state, links.' },
  { key: 'Success', prefix: 'colorSuccess', use: 'Completed, healthy, positive delta.' },
  { key: 'Warning', prefix: 'colorWarning', use: 'Needs attention, degraded, expiring.' },
  { key: 'Error', prefix: 'colorError', use: 'Destructive actions, validation failure.' },
  { key: 'Info', prefix: 'colorInfo', use: 'Neutral notices and hints.' },
];

/** The ten alias tokens antd derives for each semantic colour, in ramp order. */
const RAMP_SUFFIXES = [
  'Bg',
  'BgHover',
  'Border',
  'BorderHover',
  'Hover',
  '',
  'Active',
  'TextHover',
  'Text',
  'TextActive',
];

const NEUTRAL = [
  ['colorBgLayout', 'Page background'],
  ['colorBgContainer', 'Cards, tables, inputs'],
  ['colorBgElevated', 'Modals, dropdowns, popovers'],
  ['colorFillQuaternary', 'Subtle zebra / hover fill'],
  ['colorFillSecondary', 'Slider rails, skeletons'],
  ['colorBorderSecondary', 'Card and table dividers'],
  ['colorBorder', 'Input and control borders'],
  ['colorTextQuaternary', 'Disabled text'],
  ['colorTextTertiary', 'Placeholders, icons'],
  ['colorTextSecondary', 'Supporting copy'],
  ['colorText', 'Body copy'],
  ['colorTextHeading', 'Headings'],
];

function Chip({ color, name, label, height = 56 }) {
  const { token } = theme.useToken();
  return (
    <Tooltip title={`${name} · ${color}`}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            height,
            background: color,
            borderRadius: token.borderRadiusSM,
            border: `1px solid ${token.colorBorderSecondary}`,
          }}
        />
        {label !== false && (
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 11,
              display: 'block',
              marginTop: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {label ?? color}
          </Typography.Text>
        )}
      </div>
    </Tooltip>
  );
}

function SemanticRamp({ entry }) {
  const { token } = theme.useToken();
  const base = token[entry.prefix];

  return (
    <Card variant="outlined" styles={{ body: { padding: token.padding } }}>
      <Flex align="center" justify="space-between" style={{ marginBottom: token.marginSM }}>
        <Space size={token.marginSM}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: token.borderRadius,
              background: base,
            }}
          />
          <div>
            <Typography.Text strong>{entry.key}</Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              {entry.use}
            </Typography.Text>
          </div>
        </Space>
        <CopyValue value={base} />
      </Flex>

      <Flex gap={4}>
        {RAMP_SUFFIXES.map((suffix) => {
          const name = entry.prefix + suffix;
          return <Chip key={name} color={token[name]} name={name} label={false} height={40} />;
        })}
      </Flex>
      <Flex justify="space-between" style={{ marginTop: 4 }}>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          bg
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          border
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          base
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          text
        </Typography.Text>
      </Flex>
    </Card>
  );
}

/**
 * A hand-picked ten-step ramp, both modes side by side.
 *
 * These are the source values — antd does not derive them. Whichever ramp the
 * active primary matches is the one feeding colorPrimary* (see theme/index.js).
 */
function BrandRamp({ entry, active }) {
  const { token } = theme.useToken();
  const base = entry.ramp.light[5];

  return (
    <Card
      variant="outlined"
      styles={{ body: { padding: token.padding } }}
      title={
        <Flex align="center" gap={token.marginSM}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: token.borderRadiusSM,
              background: base,
              border: `1px solid ${token.colorBorderSecondary}`,
            }}
          />
          <Typography.Text strong>{entry.name}</Typography.Text>
          {active && (
            <Tag color={base} style={{ color: entry.on.light, marginInlineStart: 0 }}>
              active primary
            </Tag>
          )}
        </Flex>
      }
      extra={<CopyValue value={base} />}
    >
      {['light', 'dark'].map((mode) => (
        <div key={mode} style={{ marginBottom: mode === 'light' ? token.margin : 0 }}>
          <Typography.Text
            type="secondary"
            style={{ fontSize: token.fontSizeSM, textTransform: 'capitalize' }}
          >
            {mode}
          </Typography.Text>
          <Flex gap={4} style={{ marginTop: token.marginXXS }}>
            {entry.ramp[mode].map((c, i) => (
              <Chip
                key={`${mode}-${i}`}
                color={c}
                name={`${entry.name} ${mode} ${i + 1}`}
                label={i === 5 ? `${i + 1} ·` : `${i + 1}`}
                height={40}
              />
            ))}
          </Flex>
        </div>
      ))}
    </Card>
  );
}

/** One brand gradient: sample band, its stops, and the CSS to paste. */
function BrandGradient({ entry }) {
  const { token } = theme.useToken();
  const css = gradientCss(entry);

  return (
    <Card
      variant="outlined"
      styles={{ body: { padding: token.padding } }}
      title={<Typography.Text strong>{entry.name}</Typography.Text>}
      extra={
        <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
          ink {entry.minContrast}:1
        </Typography.Text>
      }
    >
      <div
        style={{
          background: css,
          borderRadius: token.borderRadius,
          border: `1px solid ${token.colorBorderSecondary}`,
          padding: token.paddingLG,
          minHeight: 116,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Typography.Text style={{ color: onBrandGradient, fontSize: token.fontSizeLG }} strong>
          Text on the gradient
        </Typography.Text>
        <Typography.Text style={{ color: onBrandGradient, fontSize: token.fontSizeSM }}>
          onBrandGradient at the darkest point of the sweep
        </Typography.Text>
      </div>

      <Flex gap={token.margin} wrap style={{ marginTop: token.margin }}>
        {[
          ['from', entry.from],
          ['to', entry.to],
          ['ink', onBrandGradient],
        ].map(([label, value]) => (
          <Flex key={label} align="center" gap={token.marginXS}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: token.borderRadiusSM,
                background: value,
                border: `1px solid ${token.colorBorderSecondary}`,
              }}
            />
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 11, display: 'block' }}>
                {label}
              </Typography.Text>
              <CopyValue value={value} />
            </div>
          </Flex>
        ))}
      </Flex>

      <div style={{ marginTop: token.marginSM }}>
        <CopyValue value={css}>{css}</CopyValue>
      </div>
    </Card>
  );
}

export default function Color() {
  const { token } = theme.useToken();
  const settings = useThemeSettings();
  const isDark = settings.mode === 'dark';

  const primaryPalette = generate(settings.primary, isDark ? { theme: 'dark' } : undefined);

  return (
    <>
      <PageHeader
        title="Color"
        description="Ant Design derives ten shades from every seed colour. Reference the alias token, never a raw hex — that is what keeps light and dark mode in sync."
      />

      <Section
        title="Semantic roles"
        description="Each row is one seed colour expanded into its usable ramp."
      >
        <Row gutter={[token.margin, token.margin]}>
          {SEMANTIC.map((entry) => (
            <Col key={entry.key} xs={24} xl={12}>
              <SemanticRamp entry={entry} />
            </Col>
          ))}
        </Row>
      </Section>

      <Section
        title="Brand ramps"
        description="Ten hand-picked steps per ramp, not generated from a seed. Step 6 is the base. Pick any of them from the Theme panel to see the whole UI rebuild on it."
      >
        <Row gutter={[token.margin, token.margin]}>
          {namedRamps.map((entry) => (
            <Col key={entry.name} xs={24} xl={12}>
              <BrandRamp
                entry={entry}
                active={entry.ramp.light[5].toLowerCase() === settings.primary.toLowerCase()}
              />
            </Col>
          ))}
        </Row>
      </Section>

      <Section
        title="Brand gradients"
        description="Decorative surfaces for hero panels, empty states and feature cards — not fills for controls. White fails on both, so text uses the brand ink. Light mode only: neither has a dark-mode pair yet, so gate them on mode rather than letting them through."
      >
        <Row gutter={[token.margin, token.margin]}>
          {brandGradients.map((entry) => (
            <Col key={entry.name} xs={24} xl={12}>
              <BrandGradient entry={entry} />
            </Col>
          ))}
        </Row>
      </Section>

      <Section
        title="Generated primary palette"
        description={`The full 10-step palette produced from the seed ${settings.primary}.`}
      >
        <Card variant="outlined">
          <Flex gap={token.marginXS}>
            {primaryPalette.map((c, i) => (
              <Chip key={c} color={c} name={`primary-${i + 1}`} label={`${i + 1}`} />
            ))}
          </Flex>
        </Card>
      </Section>

      <Section
        title="Neutrals & surfaces"
        description="Backgrounds, borders, and text colours — the tokens that carry most of the UI."
      >
        <Card variant="outlined">
          <Row gutter={[token.margin, token.margin]}>
            {NEUTRAL.map(([name, use]) => (
              <Col key={name} xs={24} sm={12} lg={8}>
                <Flex gap={token.marginSM} align="center">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      background: token[name],
                      border: `1px solid ${token.colorBorder}`,
                      borderRadius: token.borderRadiusSM,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <CopyValue value={token[name]}>{name}</CopyValue>
                    <Typography.Paragraph
                      type="secondary"
                      style={{ margin: 0, fontSize: token.fontSizeSM }}
                    >
                      {use}
                    </Typography.Paragraph>
                  </div>
                </Flex>
              </Col>
            ))}
          </Row>
        </Card>
      </Section>

      <Section
        title="Data visualisation"
        description="Chart colour is a separate job from UI colour, so it has its own tokens in src/theme/charts.js. Both palettes are validated for colour-vision deficiency separation against their own surface."
      >
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} xl={12}>
            <Card variant="outlined" title="Categorical" size="small">
              <Typography.Paragraph type="secondary" style={{ fontSize: token.fontSizeSM }}>
                Assigned in fixed order, never cycled. Colour follows the entity, not its rank —
                filtering a series out must not repaint the ones that remain.
              </Typography.Paragraph>
              <Space direction="vertical" size={token.marginXS} style={{ width: '100%' }}>
                {chartPalette(settings.mode).map((c, i) => (
                  <Flex key={c} align="center" gap={token.marginSM}>
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: token.borderRadiusSM,
                        background: c,
                        flexShrink: 0,
                      }}
                    />
                    <Typography.Text style={{ width: 64, fontSize: token.fontSizeSM }}>
                      slot {i}
                    </Typography.Text>
                    <Typography.Text
                      type="secondary"
                      style={{ width: 80, fontSize: token.fontSizeSM }}
                    >
                      {categoricalNames[i]}
                    </Typography.Text>
                    <CopyValue value={c} />
                  </Flex>
                ))}
              </Space>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Space direction="vertical" size={token.margin} style={{ width: '100%' }}>
              <Card variant="outlined" title="Sequential" size="small">
                <Typography.Paragraph type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  One hue, light to dark. For magnitude — heatmaps, intensity, density.
                </Typography.Paragraph>
                <Flex gap={4}>
                  {chartSequential(settings.mode).map((c) => (
                    <Chip key={c} color={c} name={c} label={false} height={34} />
                  ))}
                </Flex>
              </Card>

              <Card variant="outlined" title="Diverging" size="small">
                <Typography.Paragraph type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  Two hues with a neutral midpoint. For polarity — variance against a target.
                  Never a hue at the middle.
                </Typography.Paragraph>
                <Flex gap={4}>
                  {Object.entries(chartDiverging(settings.mode)).map(([k, c]) => (
                    <Chip key={k} color={c} name={k} label={k} height={34} />
                  ))}
                </Flex>
              </Card>

              <Card variant="outlined" title="Status" size="small">
                <Typography.Paragraph type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  Reserved for state. Never reused as a categorical slot, and always shipped
                  with a label or icon rather than colour alone.
                </Typography.Paragraph>
                <Flex gap={4}>
                  {Object.entries(chartStatus(settings.mode)).map(([k, c]) => (
                    <Chip key={k} color={c} name={k} label={k} height={34} />
                  ))}
                </Flex>
              </Card>
            </Space>
          </Col>
        </Row>
      </Section>

      <Section
        title="Preset palettes"
        description="Available to Tag, Badge, and Avatar via their `color` prop."
      >
        <Card variant="outlined">
          <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
            {Object.entries(presetPalettes)
              .filter(([name]) => !name.endsWith('Dark') && name !== 'grey')
              .map(([name, shades]) => (
                <Flex key={name} align="center" gap={token.margin}>
                  <Typography.Text
                    style={{
                      width: 78,
                      flexShrink: 0,
                      fontFamily: token.fontFamilyCode,
                      fontSize: token.fontSizeSM,
                    }}
                  >
                    {name}
                  </Typography.Text>
                  <Flex gap={3} style={{ flex: 1 }}>
                    {shades.map((c, i) => (
                      <Chip key={c + i} color={c} name={`${name}-${i + 1}`} label={false} height={26} />
                    ))}
                  </Flex>
                </Flex>
              ))}
          </Space>
        </Card>
      </Section>
    </>
  );
}
