import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Input,
  Row,
  Segmented,
  Select,
  Space,
  Statistic,
  Tag,
  theme,
  Typography,
} from 'antd';
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  BgColorsOutlined,
  BlockOutlined,
  FontSizeOutlined,
  LayoutOutlined,
  SearchOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { allTags, prototypes, STATUS } from '../registry/prototypes';
import PrototypeCard from '../components/PrototypeCard';
import { Section } from '../components/primitives';
import { seedToken } from '../theme';

const SYSTEM_ENTRIES = [
  {
    to: '/foundations/color',
    icon: <BgColorsOutlined />,
    title: 'Color',
    body: 'Brand palette, semantic roles, neutral ramp, and every generated shade.',
  },
  {
    to: '/foundations/typography',
    icon: <FontSizeOutlined />,
    title: 'Typography',
    body: 'Type scale, headings, body copy, links, and the code font stack.',
  },
  {
    to: '/foundations/layout',
    icon: <LayoutOutlined />,
    title: 'Spacing & shape',
    body: 'The 4px rhythm, corner radii, control heights, borders, and elevation.',
  },
  {
    to: '/system/components',
    icon: <AppstoreOutlined />,
    title: 'Components',
    body: 'Live gallery of every antd component as it looks under this theme.',
  },
  {
    to: '/system/patterns',
    icon: <BlockOutlined />,
    title: 'Patterns',
    body: 'Composed recipes: page headers, empty states, forms, filter bars.',
  },
  {
    to: '/foundations/tokens',
    icon: <TableOutlined />,
    title: 'Token reference',
    body: 'Searchable table of all resolved design tokens with copyable values.',
  },
];

function Hero() {
  const { token } = theme.useToken();

  const ramp = [
    token.colorPrimaryBg,
    token.colorPrimaryBorder,
    token.colorPrimaryHover,
    token.colorPrimary,
    token.colorPrimaryActive,
    token.colorPrimaryTextActive,
  ];

  return (
    <Card
      variant="outlined"
      styles={{ body: { padding: 0 } }}
      style={{ overflow: 'hidden', marginBottom: token.marginXL }}
    >
      <div
        style={{
          padding: token.paddingLG * 1.5,
          background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorBgContainer} 55%)`,
        }}
      >
        <Row gutter={[token.marginXL, token.marginLG]} align="middle">
          <Col xs={24} lg={15}>
            <Tag color="processing" style={{ marginBottom: token.marginSM }}>
              Front-end design reference
            </Tag>
            <Typography.Title level={1} style={{ margin: 0, fontWeight: 700 }}>
              Tropisure
            </Typography.Title>
            <Typography.Paragraph
              type="secondary"
              style={{
                fontSize: token.fontSizeLG,
                maxWidth: 620,
                marginTop: token.marginXS,
                marginBottom: token.marginLG,
              }}
            >
              One place to review our prototypes and the design system behind them.
              Every screen here is static and renders straight from the tokens in{' '}
              <Typography.Text code>src/theme/tokens.js</Typography.Text> — change a
              token and the whole library follows.
            </Typography.Paragraph>

            <Space wrap size={token.marginSM}>
              <Link to="/system/components">
                <Button type="primary" size="large" icon={<AppstoreOutlined />}>
                  Browse components
                </Button>
              </Link>
              <Link to="/foundations/tokens">
                <Button size="large" icon={<TableOutlined />}>
                  Token reference
                </Button>
              </Link>
            </Space>
          </Col>

          <Col xs={24} lg={9}>
            <Card variant="borderless" style={{ boxShadow: token.boxShadowSecondary }}>
              <Row gutter={[token.margin, token.margin]}>
                <Col span={12}>
                  <Statistic title="Prototypes" value={prototypes.length} />
                </Col>
                <Col span={12}>
                  <Statistic title="Ant Design" value="6.3.2" />
                </Col>
              </Row>
              <div style={{ marginTop: token.marginLG }}>
                <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  Primary ramp
                </Typography.Text>
                <Flex style={{ marginTop: token.marginXXS }}>
                  {ramp.map((c, i) => (
                    <div
                      key={c + i}
                      title={c}
                      style={{
                        flex: 1,
                        height: 28,
                        background: c,
                        borderStartStartRadius: i === 0 ? token.borderRadius : 0,
                        borderEndStartRadius: i === 0 ? token.borderRadius : 0,
                        borderStartEndRadius: i === ramp.length - 1 ? token.borderRadius : 0,
                        borderEndEndRadius: i === ramp.length - 1 ? token.borderRadius : 0,
                      }}
                    />
                  ))}
                </Flex>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

function SystemCard({ entry }) {
  const { token } = theme.useToken();
  return (
    <Link to={entry.to} style={{ display: 'block', height: '100%' }}>
      <Card hoverable variant="outlined" style={{ height: '100%' }}>
        <Flex gap={token.margin} align="flex-start">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: token.borderRadius,
              background: token.colorPrimaryBg,
              color: token.colorPrimary,
              display: 'grid',
              placeItems: 'center',
              fontSize: 17,
              flexShrink: 0,
            }}
          >
            {entry.icon}
          </div>
          <div>
            <Typography.Text strong>{entry.title}</Typography.Text>
            <Typography.Paragraph
              type="secondary"
              style={{ margin: `2px 0 0`, fontSize: token.fontSizeSM }}
            >
              {entry.body}
            </Typography.Paragraph>
          </div>
        </Flex>
      </Card>
    </Link>
  );
}

export default function Home() {
  const { token } = theme.useToken();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [tags, setTags] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prototypes.filter((p) => {
      if (status !== 'all' && p.status !== status) return false;
      if (tags.length && !tags.every((t) => p.tags.includes(t))) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, status, tags]);

  const statusOptions = [
    { value: 'all', label: `All (${prototypes.length})` },
    ...Object.entries(STATUS).map(([value, meta]) => ({
      value,
      label: `${meta.label} (${prototypes.filter((p) => p.status === value).length})`,
    })),
  ];

  return (
    <>
      <Hero />

      <Section
        title="Design system"
        description="The foundations developers should build against."
      >
        <Row gutter={[token.margin, token.margin]}>
          {SYSTEM_ENTRIES.map((entry) => (
            <Col key={entry.to} xs={24} sm={12} lg={8}>
              <SystemCard entry={entry} />
            </Col>
          ))}
        </Row>
      </Section>

      <Section
        title="Prototypes"
        description="Redesigns and concepts. Each one is a full static screen."
        extra={
          <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
            {filtered.length} of {prototypes.length} shown
          </Typography.Text>
        }
      >
        <Flex gap={token.marginSM} wrap style={{ marginBottom: token.margin }}>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: token.colorTextQuaternary }} />}
            placeholder="Search prototypes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: 260 }}
          />
          <Segmented value={status} onChange={setStatus} options={statusOptions} />
          <Select
            mode="multiple"
            allowClear
            placeholder="Filter by tag"
            value={tags}
            onChange={setTags}
            options={allTags.map((t) => ({ value: t, label: t }))}
            style={{ minWidth: 220, flex: '1 1 220px', maxWidth: 380 }}
          />
        </Flex>

        {filtered.length === 0 ? (
          <Card variant="outlined">
            <Empty description="No prototypes match those filters">
              <Button
                onClick={() => {
                  setQuery('');
                  setStatus('all');
                  setTags([]);
                }}
              >
                Clear filters
              </Button>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[token.margin, token.margin]}>
            {filtered.map((p) => (
              <Col key={p.id} xs={24} sm={12} xl={8}>
                <PrototypeCard prototype={p} />
              </Col>
            ))}
          </Row>
        )}
      </Section>

      <Alert
        type="info"
        showIcon
        message="Adding a prototype"
        description={
          <span>
            Drop a component in <Typography.Text code>src/pages/prototypes/</Typography.Text>{' '}
            and add one entry to{' '}
            <Typography.Text code>src/registry/prototypes.js</Typography.Text>. The index
            card, the sidebar link, and the route are all generated from that entry.
          </span>
        }
        action={
          <Link to="/system/patterns">
            <Button size="small" type="text">
              See patterns <ArrowRightOutlined />
            </Button>
          </Link>
        }
        style={{ marginTop: token.marginXL, borderRadius: seedToken.borderRadiusLG }}
      />
    </>
  );
}
