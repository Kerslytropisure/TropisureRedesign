import { useMemo, useState } from 'react';
import { Alert, Card, Flex, Input, Segmented, Table, Tag, theme, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PageHeader, CopyValue } from '../../components/primitives';

const CATEGORIES = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'color', label: 'Color', test: (n) => /^color|Color$|^(blue|green|red|gold|purple|cyan|magenta|lime|orange|volcano|geekblue|yellow|pink)/.test(n) },
  { key: 'font', label: 'Type', test: (n) => /^font|^lineHeight/.test(n) },
  { key: 'size', label: 'Spacing', test: (n) => /^(size|padding|margin)/.test(n) },
  { key: 'radius', label: 'Radius', test: (n) => /^borderRadius/.test(n) },
  { key: 'shadow', label: 'Shadow', test: (n) => /^boxShadow/.test(n) },
  { key: 'motion', label: 'Motion', test: (n) => /^motion/.test(n) },
  { key: 'control', label: 'Control', test: (n) => /^control|^line(Width|Type)|^opacity|^zIndex|^screen/.test(n) },
];

const isColor = (v) =>
  typeof v === 'string' && /^(#|rgb|hsl|var\(--)/.test(v.trim());

function ValuePreview({ value }) {
  const { token } = theme.useToken();
  if (!isColor(value)) return null;
  return (
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        background: value,
        border: `1px solid ${token.colorBorder}`,
        flexShrink: 0,
      }}
    />
  );
}

export default function Tokens() {
  const { token } = theme.useToken();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const rows = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.key === category);
    const q = query.trim().toLowerCase();
    return Object.entries(token)
      // `_tokenKey` and friends are antd's internal bookkeeping, not design decisions.
      .filter(([name]) => !name.startsWith('_'))
      .filter(([, value]) => typeof value !== 'object' && value !== undefined)
      .filter(([name]) => cat.test(name))
      .filter(([name, value]) =>
        q ? name.toLowerCase().includes(q) || String(value).toLowerCase().includes(q) : true,
      )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, value]) => ({ key: name, name, value }));
  }, [token, query, category]);

  const columns = [
    {
      title: 'Token',
      dataIndex: 'name',
      width: '38%',
      render: (name) => (
        <Typography.Text style={{ fontFamily: token.fontFamilyCode, fontSize: token.fontSizeSM }}>
          {name}
        </Typography.Text>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      render: (value) => (
        <Flex align="center" gap={token.marginXS}>
          <ValuePreview value={value} />
          <CopyValue value={value}>
            <span
              style={{
                display: 'inline-block',
                maxWidth: 420,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                verticalAlign: 'bottom',
              }}
            >
              {String(value)}
            </span>
          </CopyValue>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Token reference"
        description="Every token resolved from the current theme, live. Switch to dark mode or change the primary colour and this table updates with it."
        tag={<Tag color="processing">{rows.length} shown</Tag>}
      />

      <Alert
        type="info"
        showIcon
        style={{ marginBottom: token.margin }}
        message="How to use these in code"
        description={
          <span>
            Read them with{' '}
            <Typography.Text code>const {'{ token }'} = theme.useToken()</Typography.Text>, or
            as CSS variables — this app sets{' '}
            <Typography.Text code>cssVar: true</Typography.Text>, so{' '}
            <Typography.Text code>var(--ant-color-primary)</Typography.Text> works in plain CSS
            too.
          </span>
        }
      />

      <Card variant="outlined" styles={{ body: { padding: token.padding } }}>
        <Flex gap={token.marginSM} wrap style={{ marginBottom: token.margin }}>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: token.colorTextQuaternary }} />}
            placeholder="Search token name or value"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: 300 }}
          />
          <Segmented
            value={category}
            onChange={setCategory}
            options={CATEGORIES.map((c) => ({ value: c.key, label: c.label }))}
          />
        </Flex>

        <Table
          size="small"
          columns={columns}
          dataSource={rows}
          pagination={{ pageSize: 25, showSizeChanger: true, size: 'default' }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </>
  );
}
