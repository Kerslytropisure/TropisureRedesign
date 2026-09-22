import {
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Space,
  Table,
  Typography as AntTypography,
  theme,
} from 'antd';
import { PageHeader, Section, CopyValue } from '../../components/primitives';

const { Title, Paragraph, Text, Link } = AntTypography;

const SCALE = [
  { token: 'fontSizeHeading1', level: 1, usage: 'Page hero — one per screen at most.' },
  { token: 'fontSizeHeading2', level: 2, usage: 'Page title.' },
  { token: 'fontSizeHeading3', level: 3, usage: 'Major section.' },
  { token: 'fontSizeHeading4', level: 4, usage: 'Sub-section, card group heading.' },
  { token: 'fontSizeHeading5', level: 5, usage: 'Card title, dense list heading.' },
];

const BODY = [
  { token: 'fontSizeLG', usage: 'Lead paragraph, page description.' },
  { token: 'fontSize', usage: 'Default body copy and control labels.' },
  { token: 'fontSizeSM', usage: 'Captions, table meta, helper text.' },
];

export default function TypographyPage() {
  const { token } = theme.useToken();

  const columns = [
    {
      title: 'Token',
      dataIndex: 'token',
      render: (v) => <CopyValue value={v}>{v}</CopyValue>,
    },
    { title: 'Size', dataIndex: 'size', width: 90, render: (v) => `${v}px` },
    { title: 'Line height', dataIndex: 'lineHeight', width: 120 },
    { title: 'Usage', dataIndex: 'usage', responsive: ['md'] },
  ];

  return (
    <>
      <PageHeader
        title="Typography"
        description="A five-step heading scale plus three body sizes. Anything outside this list is a bug, not a style choice."
      />

      <Section title="Font stacks">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} md={12}>
            <Card variant="outlined" title="Interface">
              <Title level={3} style={{ margin: 0 }}>
                The quick brown fox
              </Title>
              <Paragraph type="secondary" style={{ marginTop: token.marginXS, marginBottom: 0 }}>
                jumps over the lazy dog — 0123456789
              </Paragraph>
              <Divider style={{ margin: `${token.margin}px 0` }} />
              <CopyValue value={token.fontFamily}>fontFamily</CopyValue>
              <Paragraph type="secondary" style={{ fontSize: token.fontSizeSM, margin: 0 }}>
                {token.fontFamily}
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card variant="outlined" title="Code">
              <Title level={3} style={{ margin: 0, fontFamily: token.fontFamilyCode }}>
                const token = 0;
              </Title>
              <Paragraph
                type="secondary"
                style={{
                  marginTop: token.marginXS,
                  marginBottom: 0,
                  fontFamily: token.fontFamilyCode,
                }}
              >
                ILl1 O0 — {'{}'} [] () =&gt; !==
              </Paragraph>
              <Divider style={{ margin: `${token.margin}px 0` }} />
              <CopyValue value={token.fontFamilyCode}>fontFamilyCode</CopyValue>
              <Paragraph type="secondary" style={{ fontSize: token.fontSizeSM, margin: 0 }}>
                {token.fontFamilyCode}
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Section>

      <Section title="Heading scale">
        <Card variant="outlined">
          <Space direction="vertical" size={token.marginLG} style={{ width: '100%' }}>
            {SCALE.map((s) => (
              <Flex key={s.token} align="baseline" justify="space-between" gap={token.margin} wrap>
                <Title level={s.level} style={{ margin: 0 }}>
                  Heading level {s.level}
                </Title>
                <Space size={token.marginSM}>
                  <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                    {token[s.token]}px
                  </Text>
                  <CopyValue value={s.token}>{s.token}</CopyValue>
                </Space>
              </Flex>
            ))}
          </Space>
        </Card>
      </Section>

      <Section title="Body & supporting text">
        <Card variant="outlined" styles={{ body: { padding: 0 } }}>
          <Table
            size="middle"
            pagination={false}
            columns={columns}
            rowKey="token"
            dataSource={[
              ...SCALE.map((s) => ({
                token: s.token,
                size: token[s.token],
                lineHeight: (token[`lineHeightHeading${s.level}`] ?? token.lineHeight).toFixed(2),
                usage: s.usage,
              })),
              ...BODY.map((b) => ({
                token: b.token,
                size: token[b.token],
                lineHeight: (
                  token[b.token === 'fontSize' ? 'lineHeight' : `lineHeight${b.token.slice(8)}`] ??
                  token.lineHeight
                ).toFixed(2),
                usage: b.usage,
              })),
            ]}
          />
        </Card>
      </Section>

      <Section title="Inline styles" description="Everything the Typography component ships with.">
        <Card variant="outlined">
          <Paragraph>
            Body copy sits at <Text code>fontSize</Text> with a{' '}
            <Text code>lineHeight</Text> of {token.lineHeight.toFixed(3)}. Inside a paragraph
            you can mark text as <Text strong>strong</Text>, <Text italic>italic</Text>,{' '}
            <Text underline>underline</Text>, <Text delete>deleted</Text>,{' '}
            <Text mark>highlighted</Text>, or <Text keyboard>Cmd</Text> +{' '}
            <Text keyboard>K</Text>. Use <Link href="#/foundations/color">links</Link> for
            navigation only — never for actions.
          </Paragraph>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Secondary text carries supporting detail. <Text type="success">Success</Text>,{' '}
            <Text type="warning">warning</Text>, and <Text type="danger">danger</Text> text
            colours map to the same semantic tokens the components use.
          </Paragraph>
          <Divider />
          <Paragraph
            copyable
            ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
            style={{ marginBottom: 0 }}
          >
            Long-form content should be truncated rather than wrapped past two or three lines
            in dense surfaces. Ant Design handles this natively through the ellipsis prop,
            which keeps the truncation accessible and lets the reader expand in place instead
            of navigating away. Pair it with copyable when the value is something a developer
            will want to paste elsewhere, such as an identifier or a token name.
          </Paragraph>
        </Card>
      </Section>
    </>
  );
}
