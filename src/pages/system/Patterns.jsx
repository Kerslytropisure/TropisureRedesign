import {
  Alert,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Flex,
  Form,
  Input,
  Result,
  Row,
  Segmented,
  Select,
  Space,
  Statistic,
  Steps,
  Tag,
  theme,
  Typography,
} from 'antd';
import {
  ArrowUpOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Demo, PageHeader, Section } from '../../components/primitives';

export default function Patterns() {
  const { token } = theme.useToken();

  return (
    <>
      <PageHeader
        title="Patterns"
        description="Compositions we have already agreed on. Reach for one of these before inventing a new arrangement — consistency here is what makes the prototypes feel like one product."
      />

      <Section
        title="Page header"
        description="Breadcrumb, title, status, and actions. Primary action sits far right."
      >
        <Demo label="Detail page header">
          <Breadcrumb
            style={{ marginBottom: token.marginSM }}
            items={[{ title: 'Accounts' }, { title: 'Northwind Traders' }]}
          />
          <Flex align="flex-start" justify="space-between" gap={token.margin} wrap>
            <Flex gap={token.margin} align="center">
              <Avatar size={48} style={{ background: token.colorPrimary }}>
                N
              </Avatar>
              <div>
                <Space align="center">
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Northwind Traders
                  </Typography.Title>
                  <Tag color="green">Active</Tag>
                </Space>
                <Typography.Text type="secondary">
                  Enterprise · 240 seats · renews 1 Jan 2027
                </Typography.Text>
              </div>
            </Flex>
            <Space>
              <Button icon={<DownloadOutlined />}>Export</Button>
              <Button icon={<EllipsisOutlined />} />
              <Button type="primary" icon={<PlusOutlined />}>
                New invoice
              </Button>
            </Space>
          </Flex>
        </Demo>
      </Section>

      <Section title="Metric row" description="Four tiles maximum. Each shows a value, a label, and a delta.">
        <Demo label="KPI row" background="layout">
          <Row gutter={[token.margin, token.margin]}>
            {[
              ['Revenue', '$128,740', 11.2],
              ['New accounts', '38', 4.1],
              ['Active seats', '2,406', -1.8],
              ['Churn', '2.4%', -0.6],
            ].map(([label, value, delta]) => (
              <Col key={label} xs={12} lg={6}>
                <Card variant="outlined" styles={{ body: { padding: token.padding } }}>
                  <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                    {label}
                  </Typography.Text>
                  <Typography.Title level={3} style={{ margin: `4px 0 ${token.marginXXS}px` }}>
                    {value}
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      fontSize: token.fontSizeSM,
                      color: delta >= 0 ? token.colorSuccess : token.colorError,
                    }}
                  >
                    {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}% vs last month
                  </Typography.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Demo>
      </Section>

      <Section
        title="Filter bar"
        description="Search first, then narrowing filters, then view switch. Actions stay on the right."
      >
        <Demo label="Table toolbar">
          <Flex align="center" justify="space-between" gap={token.marginSM} wrap>
            <Space size={token.marginSM} wrap>
              <Input
                allowClear
                prefix={<SearchOutlined style={{ color: token.colorTextQuaternary }} />}
                placeholder="Search accounts"
                style={{ width: 240 }}
              />
              <Select
                placeholder="Plan"
                allowClear
                style={{ width: 140 }}
                options={[
                  { value: 'free', label: 'Free' },
                  { value: 'team', label: 'Team' },
                  { value: 'ent', label: 'Enterprise' },
                ]}
              />
              <Button icon={<FilterOutlined />}>More filters</Button>
            </Space>
            <Space size={token.marginSM}>
              <Segmented defaultValue="table" options={['Table', 'Board']} />
              <Button type="primary" icon={<PlusOutlined />}>
                New account
              </Button>
            </Space>
          </Flex>
          <Divider style={{ margin: `${token.margin}px 0 ${token.marginSM}px` }} />
          <Space size={[4, 4]} wrap>
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              Applied:
            </Typography.Text>
            <Tag closable>Plan: Enterprise</Tag>
            <Tag closable>Region: APAC</Tag>
            <Button type="link" size="small" style={{ paddingInline: 0 }}>
              Clear all
            </Button>
          </Space>
        </Demo>
      </Section>

      <Section
        title="Form layout"
        description="Two columns on wide screens, one below md. Section headings group related fields."
      >
        <Demo label="Settings form">
          <Form layout="vertical" style={{ maxWidth: 760 }}>
            <Typography.Title level={5} style={{ marginTop: 0 }}>
              Workspace
            </Typography.Title>
            <Row gutter={token.margin}>
              <Col xs={24} md={12}>
                <Form.Item label="Name" name="name" rules={[{ required: true }]} extra="Visible to all members.">
                  <Input defaultValue="Acme Analytics" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Slug" extra="Used in URLs. Lowercase only.">
                  <Input addonBefore="acme.app/" defaultValue="analytics" />
                </Form.Item>
              </Col>
            </Row>

            <Typography.Title level={5}>Contact</Typography.Title>
            <Row gutter={token.margin}>
              <Col xs={24} md={12}>
                <Form.Item label="Billing email">
                  <Input defaultValue="finance@acme.co" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Region">
                  <Select
                    defaultValue="apac"
                    options={[
                      { value: 'apac', label: 'Asia Pacific' },
                      { value: 'emea', label: 'EMEA' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider />
            <Flex justify="flex-end" gap={token.marginSM}>
              <Button type="text">Cancel</Button>
              <Button type="primary">Save changes</Button>
            </Flex>
          </Form>
        </Demo>
      </Section>

      <Section title="Empty states" description="Say what is missing and give exactly one way forward.">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={8}>
            <Demo label="First run">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>
                    <Typography.Text strong style={{ display: 'block' }}>
                      No accounts yet
                    </Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                      Import a CSV or add one by hand.
                    </Typography.Text>
                  </span>
                }
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  Add account
                </Button>
              </Empty>
            </Demo>
          </Col>
          <Col xs={24} lg={8}>
            <Demo label="No results">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No accounts match those filters"
              >
                <Button>Clear filters</Button>
              </Empty>
            </Demo>
          </Col>
          <Col xs={24} lg={8}>
            <Demo label="Error" padding={0}>
              <Result
                status="warning"
                title="Could not load accounts"
                subTitle="The request timed out."
                extra={<Button type="primary">Retry</Button>}
                style={{ padding: token.paddingLG }}
              />
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Summary panel" description="Descriptions plus a stat — used in every detail drawer.">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={14}>
            <Demo label="Record summary">
              <Descriptions
                bordered
                size="small"
                column={{ xs: 1, md: 2 }}
                items={[
                  { key: '1', label: 'Invoice', children: '#4821' },
                  { key: '2', label: 'Issued', children: '1 Sep 2026' },
                  { key: '3', label: 'Due', children: '30 Sep 2026' },
                  { key: '4', label: 'Status', children: <Tag color="green">Paid</Tag> },
                  { key: '5', label: 'Amount', span: 2, children: '$18,400.00' },
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={10}>
            <Demo label="Progress panel">
              <Steps
                direction="vertical"
                size="small"
                current={2}
                items={[
                  { title: 'Draft', description: 'Created 28 Aug' },
                  { title: 'Sent', description: 'Emailed 1 Sep' },
                  { title: 'Paid', description: 'Awaiting confirmation' },
                  { title: 'Reconciled' },
                ]}
              />
              <Divider style={{ margin: `${token.margin}px 0` }} />
              <Statistic
                title="Collected this month"
                value={92.4}
                precision={1}
                suffix="%"
                prefix={<ArrowUpOutlined />}
                valueStyle={{ color: token.colorSuccess }}
              />
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Inline guidance" description="Alerts sit inside the surface they describe, never floating.">
        <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            message="Changes apply to new invoices only. Existing drafts keep their current terms."
          />
          <Alert
            type="warning"
            showIcon
            message="Two payment methods have expired"
            description="Update them before the next billing run on 1 October."
            action={<Button size="small">Review</Button>}
          />
        </Space>
      </Section>
    </>
  );
}
