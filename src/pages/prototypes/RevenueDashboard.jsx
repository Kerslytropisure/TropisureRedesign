import { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Progress,
  Row,
  Segmented,
  Space,
  Table,
  Tag,
  theme,
  Typography,
} from 'antd';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import PrototypeFrame from '../../components/PrototypeFrame';
import ChartFrame from '../../components/charts/ChartFrame';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import { chartPalette } from '../../theme/charts';
import { useThemeSettings } from '../../theme/themeContext';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

const THIS_YEAR = [82, 88, 91, 97, 103, 109, 114, 121, 128];
const LAST_YEAR = [71, 73, 78, 80, 86, 88, 93, 95, 99];

const BY_PLAN = [
  { label: 'Enterprise', value: 74200 },
  { label: 'Team', value: 38600 },
  { label: 'Starter', value: 11940 },
  { label: 'Free trial', value: 4000 },
];

const ACCOUNTS = [
  { key: 1, name: 'Northwind Traders', plan: 'Enterprise', mrr: 18400, delta: 6.2, health: 94 },
  { key: 2, name: 'Contoso Ltd', plan: 'Enterprise', mrr: 14250, delta: 2.1, health: 81 },
  { key: 3, name: 'Fabrikam', plan: 'Team', mrr: 9120, delta: -3.4, health: 58 },
  { key: 4, name: 'Adventure Works', plan: 'Team', mrr: 7640, delta: 11.8, health: 88 },
  { key: 5, name: 'Tailspin Toys', plan: 'Starter', mrr: 3180, delta: -0.9, health: 46 },
];

const KPIS = [
  { label: 'Monthly recurring revenue', value: '$128,740', delta: 11.2, note: 'vs $115,760 in Aug' },
  { label: 'New accounts', value: '38', delta: 4.1, note: '12 from paid search' },
  { label: 'Net revenue retention', value: '112%', delta: 1.6, note: 'Expansion outpacing churn' },
  { label: 'Gross churn', value: '2.4%', delta: -0.6, note: '3 accounts lost' },
];

const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

function KpiTile({ kpi }) {
  const { token } = theme.useToken();
  const positive = kpi.delta >= 0;
  return (
    <Card variant="outlined" styles={{ body: { padding: token.padding } }} style={{ height: '100%' }}>
      <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
        {kpi.label}
      </Typography.Text>
      <Typography.Title level={2} style={{ margin: `6px 0 ${token.marginXXS}px`, fontWeight: 600 }}>
        {kpi.value}
      </Typography.Title>
      <Space size={token.marginXS} wrap>
        <Tag
          color={positive ? 'green' : 'red'}
          style={{ marginInlineEnd: 0, fontVariantNumeric: 'tabular-nums' }}
        >
          {positive ? '▲' : '▼'} {Math.abs(kpi.delta)}%
        </Tag>
        <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
          {kpi.note}
        </Typography.Text>
      </Space>
    </Card>
  );
}

export default function RevenueDashboard() {
  const { token } = theme.useToken();
  const { mode } = useThemeSettings();
  const [range, setRange] = useState('9M');
  const palette = chartPalette(mode);

  const series = [
    { key: 'current', name: '2026', color: palette[0], data: THIS_YEAR },
    { key: 'previous', name: '2025', color: palette[1], data: LAST_YEAR },
  ];

  const columns = [
    {
      title: 'Account',
      dataIndex: 'name',
      render: (name, row) => (
        <Space>
          <Avatar
            size="small"
            style={{ background: token.colorPrimaryBg, color: token.colorPrimary }}
          >
            {name[0]}
          </Avatar>
          <div>
            <Typography.Text>{name}</Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              {row.plan}
            </Typography.Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'MRR',
      dataIndex: 'mrr',
      align: 'right',
      width: 120,
      sorter: (a, b) => a.mrr - b.mrr,
      defaultSortOrder: 'descend',
      render: money,
    },
    {
      title: 'Change',
      dataIndex: 'delta',
      align: 'right',
      width: 110,
      responsive: ['md'],
      render: (d) => (
        <Typography.Text style={{ color: d >= 0 ? token.colorSuccess : token.colorError }}>
          {d >= 0 ? '+' : ''}
          {d}%
        </Typography.Text>
      ),
    },
    {
      title: 'Health',
      dataIndex: 'health',
      width: 160,
      responsive: ['lg'],
      render: (h) => (
        <Progress
          percent={h}
          size="small"
          status={h < 50 ? 'exception' : h < 75 ? 'active' : 'success'}
        />
      ),
    },
  ];

  return (
    <PrototypeFrame id="revenue-dashboard">
      <Flex align="flex-start" justify="space-between" gap={token.margin} wrap style={{ marginBottom: token.marginLG }}>
        <div>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Revenue
          </Typography.Title>
          <Typography.Text type="secondary">
            1 January – 22 September 2026 · all regions
          </Typography.Text>
        </div>
        <Space wrap>
          <Segmented value={range} onChange={setRange} options={['3M', '6M', '9M', 'YTD']} />
          <DatePicker.RangePicker />
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Button icon={<EllipsisOutlined />} />
        </Space>
      </Flex>

      <Row gutter={[token.margin, token.margin]} style={{ marginBottom: token.margin }}>
        {KPIS.map((kpi) => (
          <Col key={kpi.label} xs={12} xl={6}>
            <KpiTile kpi={kpi} />
          </Col>
        ))}
      </Row>

      <Row gutter={[token.margin, token.margin]}>
        <Col xs={24} xl={15}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <ChartFrame
              title="Monthly recurring revenue"
              subtitle="Thousands of USD, current year against the same months last year."
              series={series}
              categories={MONTHS}
              formatValue={(v) => `$${v}k`}
            >
              <LineChart
                series={series}
                categories={MONTHS}
                formatValue={(v) => `$${Math.round(v)}k`}
                area
              />
            </ChartFrame>
          </Card>
        </Col>

        <Col xs={24} xl={9}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <ChartFrame
              title="Revenue by plan"
              subtitle="September, all regions."
              series={[{ key: 'mrr', name: 'MRR', color: palette[0], data: BY_PLAN.map((d) => d.value) }]}
              categories={BY_PLAN.map((d) => d.label)}
              formatValue={money}
            >
              <BarChart data={BY_PLAN} formatValue={money} color={palette[0]} />
            </ChartFrame>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            variant="outlined"
            title="Top accounts"
            extra={<Button type="link" style={{ paddingInline: 0 }}>View all 214</Button>}
            styles={{ body: { padding: 0 } }}
          >
            <Table columns={columns} dataSource={ACCOUNTS} pagination={false} size="middle" />
          </Card>
        </Col>
      </Row>
    </PrototypeFrame>
  );
}
