import { Button, Card, Col, Flex, Input, Row, Space, Table, theme, Typography } from 'antd';
import { PageHeader, Section, CopyValue } from '../../components/primitives';

const SPACING = [
  'sizeXXS',
  'sizeXS',
  'sizeSM',
  'size',
  'sizeMD',
  'sizeLG',
  'sizeXL',
  'sizeXXL',
];

const RADIUS = ['borderRadiusXS', 'borderRadiusSM', 'borderRadius', 'borderRadiusLG'];

const CONTROLS = [
  { size: 'small', token: 'controlHeightSM' },
  { size: 'middle', token: 'controlHeight' },
  { size: 'large', token: 'controlHeightLG' },
];

const SHADOWS = [
  ['boxShadowTertiary', 'Resting cards and sticky bars'],
  ['boxShadow', 'Raised cards, hovered surfaces'],
  ['boxShadowSecondary', 'Dropdowns, popovers, modals'],
];

const BREAKPOINTS = [
  ['xs', '< 576', 'Single column, stacked filters'],
  ['sm', '≥ 576', 'Two-up cards'],
  ['md', '≥ 768', 'Table meta columns appear'],
  ['lg', '≥ 992', 'Persistent sidebar'],
  ['xl', '≥ 1200', 'Three-up cards'],
  ['xxl', '≥ 1600', 'Max content width reached'],
];

export default function LayoutFoundations() {
  const { token } = theme.useToken();

  return (
    <>
      <PageHeader
        title="Spacing & shape"
        description="A 4px base unit drives every gap, and four radii cover every surface. Use the size tokens rather than hard-coded pixels so compact mode keeps working."
      />

      <Section
        title="Spacing scale"
        description="Ant Design derives these from sizeUnit (4) and sizeStep (4)."
      >
        <Card variant="outlined">
          <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
            {SPACING.map((name) => (
              <Flex key={name} align="center" gap={token.margin}>
                <div style={{ width: 92, flexShrink: 0 }}>
                  <CopyValue value={token[name]}>{name}</CopyValue>
                </div>
                <div
                  style={{
                    height: 18,
                    width: token[name],
                    background: token.colorPrimary,
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                />
                <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  {token[name]}px
                </Typography.Text>
              </Flex>
            ))}
          </Space>
        </Card>
      </Section>

      <Section title="Corner radius">
        <Row gutter={[token.margin, token.margin]}>
          {RADIUS.map((name) => (
            <Col key={name} xs={12} md={6}>
              <Card variant="outlined" styles={{ body: { padding: token.padding } }}>
                <div
                  style={{
                    height: 68,
                    background: token.colorPrimaryBg,
                    border: `1.5px solid ${token.colorPrimaryBorder}`,
                    borderRadius: token[name],
                    marginBottom: token.marginSM,
                  }}
                />
                <CopyValue value={token[name]}>{name}</CopyValue>
                <Typography.Text
                  type="secondary"
                  style={{ display: 'block', fontSize: token.fontSizeSM }}
                >
                  {token[name]}px
                </Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Section>

      <Section
        title="Control heights"
        description="Buttons, inputs, and selects share one height per size so they line up in a row."
      >
        <Card variant="outlined">
          <Space direction="vertical" size={token.marginLG} style={{ width: '100%' }}>
            {CONTROLS.map((c) => (
              <Flex key={c.size} align="center" gap={token.margin} wrap>
                <div style={{ width: 150, flexShrink: 0 }}>
                  <CopyValue value={token[c.token]}>{c.token}</CopyValue>
                  <Typography.Text
                    type="secondary"
                    style={{ display: 'block', fontSize: token.fontSizeSM }}
                  >
                    size=&quot;{c.size}&quot; · {token[c.token]}px
                  </Typography.Text>
                </div>
                <Space size={token.marginSM} wrap>
                  <Button size={c.size} type="primary">
                    Primary
                  </Button>
                  <Button size={c.size}>Default</Button>
                  <Input size={c.size} placeholder="Input" style={{ width: 150 }} />
                </Space>
              </Flex>
            ))}
          </Space>
        </Card>
      </Section>

      <Section title="Elevation" description="Three levels. Anything deeper is over-designed.">
        <Row gutter={[token.margin, token.margin]}>
          {SHADOWS.map(([name, usage]) => (
            <Col key={name} xs={24} md={8}>
              <div
                style={{
                  background: token.colorBgElevated,
                  borderRadius: token.borderRadiusLG,
                  padding: token.paddingLG,
                  boxShadow: token[name],
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                <CopyValue value={token[name]}>{name}</CopyValue>
                <Typography.Paragraph
                  type="secondary"
                  style={{ margin: `${token.marginXXS}px 0 0`, fontSize: token.fontSizeSM }}
                >
                  {usage}
                </Typography.Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </Section>

      <Section
        title="Borders & dividers"
        description="Two weights: a strong border for interactive edges, a soft one for structure."
      >
        <Row gutter={[token.margin, token.margin]}>
          {[
            ['colorBorder', 'Inputs, selects, outlined buttons'],
            ['colorBorderSecondary', 'Card edges, table row lines'],
            ['colorSplit', 'Dividers inside a surface'],
          ].map(([name, usage]) => (
            <Col key={name} xs={24} md={8}>
              <Card variant="outlined" styles={{ body: { padding: token.padding } }}>
                <div
                  style={{
                    height: 0,
                    borderTop: `${token.lineWidth}px solid ${token[name]}`,
                    marginBottom: token.marginSM,
                  }}
                />
                <CopyValue value={token[name]}>{name}</CopyValue>
                <Typography.Paragraph
                  type="secondary"
                  style={{ margin: `${token.marginXXS}px 0 0`, fontSize: token.fontSizeSM }}
                >
                  {usage}
                </Typography.Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Section>

      <Section title="Breakpoints" description="Grid and Layout use these; so should your prototype.">
        <Card variant="outlined" styles={{ body: { padding: 0 } }}>
          <Table
            size="middle"
            pagination={false}
            rowKey={(r) => r[0]}
            dataSource={BREAKPOINTS}
            columns={[
              {
                title: 'Key',
                render: (_, r) => (
                  <Typography.Text style={{ fontFamily: token.fontFamilyCode }}>
                    {r[0]}
                  </Typography.Text>
                ),
                width: 100,
              },
              { title: 'Width (px)', render: (_, r) => r[1], width: 140 },
              { title: 'What changes', render: (_, r) => r[2] },
            ]}
          />
        </Card>
      </Section>

      <Section title="Motion" description="Durations are short on purpose — UI should feel instant.">
        <Card variant="outlined">
          <Row gutter={[token.margin, token.margin]}>
            {['motionDurationFast', 'motionDurationMid', 'motionDurationSlow'].map((name) => (
              <Col key={name} xs={24} sm={8}>
                <CopyValue value={token[name]}>{name}</CopyValue>
                <Typography.Text
                  type="secondary"
                  style={{ display: 'block', fontSize: token.fontSizeSM }}
                >
                  {token[name]}
                </Typography.Text>
              </Col>
            ))}
            {['motionEaseOut', 'motionEaseInOut', 'motionEaseOutBack'].map((name) => (
              <Col key={name} xs={24} sm={8}>
                <CopyValue value={token[name]}>{name}</CopyValue>
                <Typography.Text
                  type="secondary"
                  style={{ display: 'block', fontSize: token.fontSizeSM }}
                >
                  {token[name]}
                </Typography.Text>
              </Col>
            ))}
          </Row>
        </Card>
      </Section>
    </>
  );
}
