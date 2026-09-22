import {
  Avatar,
  Badge,
  Card,
  Carousel,
  Col,
  Collapse,
  Descriptions,
  Empty,
  Flex,
  List,
  Popover,
  Progress,
  QRCode,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Timeline,
  Tooltip,
  Tree,
  Typography,
  theme,
} from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Demo, Section } from '../../../components/primitives';

const ACCOUNTS = [
  { key: 1, name: 'Northwind Traders', plan: 'Enterprise', mrr: 18400, status: 'active' },
  { key: 2, name: 'Contoso Ltd', plan: 'Team', mrr: 6200, status: 'trial' },
  { key: 3, name: 'Fabrikam', plan: 'Team', mrr: 4100, status: 'past_due' },
  { key: 4, name: 'Adventure Works', plan: 'Free', mrr: 0, status: 'active' },
];

const STATUS_TAG = {
  active: { color: 'green', label: 'Active' },
  trial: { color: 'blue', label: 'Trial' },
  past_due: { color: 'red', label: 'Past due' },
};

const money = (n) => `$${n.toLocaleString('en-US')}`;

export default function DataDisplay() {
  const { token } = theme.useToken();

  const columns = [
    {
      title: 'Account',
      dataIndex: 'name',
      render: (name) => (
        <Space>
          <Avatar
            size="small"
            style={{ background: token.colorPrimaryBg, color: token.colorPrimary }}
          >
            {name[0]}
          </Avatar>
          <Typography.Text>{name}</Typography.Text>
        </Space>
      ),
    },
    { title: 'Plan', dataIndex: 'plan', responsive: ['md'] },
    {
      title: 'MRR',
      dataIndex: 'mrr',
      align: 'right',
      sorter: (a, b) => a.mrr - b.mrr,
      render: money,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 110,
      filters: Object.entries(STATUS_TAG).map(([value, m]) => ({ text: m.label, value })),
      onFilter: (value, record) => record.status === value,
      render: (s) => <Tag color={STATUS_TAG[s].color}>{STATUS_TAG[s].label}</Tag>,
    },
  ];

  return (
    <>
      <Section title="Metrics" description="Statistic and Progress carry every number in the product.">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={14}>
            <Demo label="Statistic">
              <Row gutter={[token.margin, token.margin]}>
                <Col xs={12} md={8}>
                  <Statistic
                    title="Monthly revenue"
                    value={128740}
                    prefix="$"
                    valueStyle={{ fontWeight: 600 }}
                  />
                </Col>
                <Col xs={12} md={8}>
                  <Statistic
                    title="Growth"
                    value={11.28}
                    precision={2}
                    suffix="%"
                    prefix={<ArrowUpOutlined />}
                    valueStyle={{ color: token.colorSuccess, fontWeight: 600 }}
                  />
                </Col>
                <Col xs={12} md={8}>
                  <Statistic
                    title="Churn"
                    value={2.4}
                    precision={1}
                    suffix="%"
                    prefix={<ArrowDownOutlined />}
                    valueStyle={{ color: token.colorError, fontWeight: 600 }}
                  />
                </Col>
              </Row>
            </Demo>
          </Col>
          <Col xs={24} lg={10}>
            <Demo label="Progress">
              <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
                <Progress percent={72} />
                <Progress percent={100} status="success" />
                <Progress percent={48} status="exception" />
                <Space size={token.margin}>
                  <Progress type="circle" percent={72} size={64} />
                  <Progress type="dashboard" percent={88} size={64} />
                </Space>
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Table" description="Sortable, filterable, selectable — the default for any list of records.">
        <Demo label="Account table" padding={0}>
          <Table
            columns={columns}
            dataSource={ACCOUNTS}
            rowSelection={{}}
            pagination={false}
            size="middle"
            summary={(rows) => {
              const total = rows.reduce((sum, r) => sum + r.mrr, 0);
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}>
                    <Typography.Text strong>Total</Typography.Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right">
                    <Typography.Text strong>{money(total)}</Typography.Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} />
                </Table.Summary.Row>
              );
            }}
          />
        </Demo>
      </Section>

      <Section title="Records & lists">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Descriptions">
              <Descriptions
                column={{ xs: 1, md: 2 }}
                size="small"
                items={[
                  { key: '1', label: 'Account', children: 'Northwind Traders' },
                  { key: '2', label: 'Plan', children: <Tag color="purple">Enterprise</Tag> },
                  { key: '3', label: 'Owner', children: 'ana@northwind.co' },
                  { key: '4', label: 'Renewal', children: '1 Jan 2027' },
                  { key: '5', label: 'Seats', children: '240 of 300' },
                  { key: '6', label: 'Status', children: <Badge status="success" text="Active" /> },
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="List">
              <List
                itemLayout="horizontal"
                dataSource={[
                  { name: 'Ana Reyes', role: 'Admin', at: '2 hours ago' },
                  { name: 'Kai Tan', role: 'Editor', at: 'Yesterday' },
                  { name: 'Ren Okada', role: 'Viewer', at: '3 days ago' },
                ]}
                renderItem={(item) => (
                  <List.Item actions={[<a key="edit">Edit</a>]}>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={item.name}
                      description={`${item.role} · active ${item.at}`}
                    />
                  </List.Item>
                )}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Timeline">
              <Timeline
                items={[
                  {
                    color: 'green',
                    dot: <CheckCircleOutlined />,
                    children: 'Invoice #4821 paid — 22 Sep',
                  },
                  { children: 'Plan upgraded to Enterprise — 18 Sep' },
                  {
                    color: 'gray',
                    dot: <ClockCircleOutlined />,
                    children: 'Trial started — 1 Sep',
                  },
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Tree">
              <Tree
                defaultExpandAll
                defaultSelectedKeys={['frontend']}
                treeData={[
                  {
                    title: 'Organisation',
                    key: 'org',
                    children: [
                      {
                        title: 'Engineering',
                        key: 'eng',
                        children: [
                          { title: 'Frontend', key: 'frontend' },
                          { title: 'Platform', key: 'platform' },
                        ],
                      },
                      { title: 'Design', key: 'design' },
                    ],
                  },
                ]}
              />
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Identity & status">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={8}>
            <Demo label="Avatar">
              <Space direction="vertical" size={token.margin}>
                <Avatar.Group max={{ count: 3 }}>
                  <Avatar style={{ background: token.colorPrimary }}>AR</Avatar>
                  <Avatar style={{ background: token.colorSuccess }}>KT</Avatar>
                  <Avatar style={{ background: token.colorWarning }}>RO</Avatar>
                  <Avatar style={{ background: token.colorError }}>MJ</Avatar>
                  <Avatar icon={<UserOutlined />} />
                </Avatar.Group>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Avatar icon={<UserOutlined />} />
                  <Avatar size="large" icon={<UserOutlined />} />
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Space>
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={8}>
            <Demo label="Badge">
              <Space size={token.marginLG} wrap>
                <Badge count={5}>
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
                <Badge dot>
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
                <Badge count={128} overflowCount={99}>
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
                <Space direction="vertical">
                  <Badge status="success" text="Healthy" />
                  <Badge status="processing" text="Syncing" />
                  <Badge status="warning" text="Degraded" />
                  <Badge status="error" text="Down" />
                </Space>
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={8}>
            <Demo label="Tag" hint="v6 variants">
              <Space direction="vertical" size={token.marginSM}>
                <Space size={[4, 8]} wrap>
                  <Tag color="processing">processing</Tag>
                  <Tag color="success">success</Tag>
                  <Tag color="warning">warning</Tag>
                  <Tag color="error">error</Tag>
                  <Tag color="purple">purple</Tag>
                </Space>
                <Space size={[4, 8]} wrap>
                  <Tag variant="filled">filled</Tag>
                  <Tag variant="outlined">outlined</Tag>
                  <Tag variant="solid">solid</Tag>
                </Space>
                <Space size={[4, 8]} wrap>
                  <Tag variant="outlined">neutral</Tag>
                  <Tag closable variant="outlined">
                    closable
                  </Tag>
                  <Tag.CheckableTag checked>checkable</Tag.CheckableTag>
                </Space>
                <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  Neutral tags need variant=&quot;outlined&quot; — the v6 default is
                  filled, which is nearly invisible without a colour.
                </Typography.Text>
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Containers & overlays">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Card" background="layout">
              <Row gutter={[token.margin, token.margin]}>
                <Col span={24}>
                  <Card
                    variant="outlined"
                    title="Usage this month"
                    extra={<a>Details</a>}
                    actions={[<a key="export">Export</a>, <a key="reset">Reset</a>]}
                  >
                    <Typography.Text type="secondary">
                      1.2M events ingested across 4 sources.
                    </Typography.Text>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card variant="borderless" style={{ boxShadow: token.boxShadow }}>
                    <Card.Meta
                      avatar={<Avatar style={{ background: token.colorPrimary }}>N</Avatar>}
                      title="Northwind Traders"
                      description="Enterprise · renews 1 Jan 2027"
                    />
                  </Card>
                </Col>
              </Row>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Collapse, Popover, Tooltip">
              <Space direction="vertical" size={token.margin} style={{ width: '100%' }}>
                <Collapse
                  defaultActiveKey={['1']}
                  items={[
                    {
                      key: '1',
                      label: 'What counts as an event?',
                      children: (
                        <Typography.Text type="secondary">
                          Any tracked user action received by the ingest API.
                        </Typography.Text>
                      ),
                    },
                    {
                      key: '2',
                      label: 'When does usage reset?',
                      children: (
                        <Typography.Text type="secondary">
                          On the first day of each billing period.
                        </Typography.Text>
                      ),
                    },
                  ]}
                />
                <Space>
                  <Tooltip title="Shown on hover, max one short line">
                    <a>Tooltip</a>
                  </Tooltip>
                  <Popover
                    title="Seat usage"
                    content={
                      <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                        240 of 300 seats assigned.
                      </Typography.Text>
                    }
                  >
                    <a>Popover</a>
                  </Popover>
                </Space>
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Carousel" padding={0}>
              <Carousel autoplay>
                {[token.colorPrimary, token.colorSuccess, token.colorWarning].map((c) => (
                  <div key={c}>
                    <Flex
                      align="center"
                      justify="center"
                      style={{ height: 150, background: c, color: '#fff' }}
                    >
                      <Typography.Text style={{ color: '#fff' }}>Slide</Typography.Text>
                    </Flex>
                  </div>
                ))}
              </Carousel>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Empty & QRCode">
              <Flex align="center" justify="space-around" wrap gap={token.margin}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No accounts yet"
                  styles={{ image: { height: 48 } }}
                />
                <QRCode value="https://ant.design" size={120} />
              </Flex>
            </Demo>
          </Col>
        </Row>
      </Section>
    </>
  );
}
