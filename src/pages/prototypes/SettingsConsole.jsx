import { useState } from 'react';
import {
  Alert,
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  theme,
  Typography,
  Upload,
} from 'antd';
import {
  DeleteOutlined,
  KeyOutlined,
  LaptopOutlined,
  MobileOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import PrototypeFrame from '../../components/PrototypeFrame';

function SectionCard({ title, description, children, footer }) {
  const { token } = theme.useToken();
  return (
    <Card variant="outlined" style={{ marginBottom: token.margin }}>
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 2 }}>
        {title}
      </Typography.Title>
      {description && (
        <Typography.Paragraph type="secondary" style={{ fontSize: token.fontSizeSM }}>
          {description}
        </Typography.Paragraph>
      )}
      {children}
      {footer && (
        <>
          <Divider style={{ margin: `${token.margin}px 0` }} />
          {footer}
        </>
      )}
    </Card>
  );
}

function ProfileTab() {
  const { token } = theme.useToken();
  return (
    <>
      <SectionCard
        title="Profile"
        description="How you appear to everyone else in the workspace."
        footer={
          <Flex justify="flex-end" gap={token.marginSM}>
            <Button type="text">Discard</Button>
            <Button type="primary">Save changes</Button>
          </Flex>
        }
      >
        <Flex gap={token.marginLG} align="flex-start" wrap>
          <Space direction="vertical" align="center">
            <Avatar size={72} style={{ background: token.colorPrimary, fontSize: 26 }}>
              AR
            </Avatar>
            <Upload showUploadList={false}>
              <Button size="small" icon={<UploadOutlined />}>
                Change
              </Button>
            </Upload>
          </Space>

          <Form layout="vertical" style={{ flex: '1 1 380px', minWidth: 280 }}>
            <Row gutter={token.margin}>
              <Col xs={24} sm={12}>
                <Form.Item label="First name">
                  <Input defaultValue="Ana" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Last name">
                  <Input defaultValue="Reyes" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Email" extra="Used for sign-in and all notifications.">
              <Input defaultValue="ana.reyes@acme.co" />
            </Form.Item>
            <Form.Item label="Job title">
              <Input placeholder="Product Designer" />
            </Form.Item>
            <Form.Item label="Time zone" style={{ marginBottom: 0 }}>
              <Select
                defaultValue="asia-manila"
                options={[
                  { value: 'asia-manila', label: '(GMT+8) Manila' },
                  { value: 'asia-singapore', label: '(GMT+8) Singapore' },
                  { value: 'europe-berlin', label: '(GMT+2) Berlin' },
                ]}
              />
            </Form.Item>
          </Form>
        </Flex>
      </SectionCard>

      <SectionCard title="Preferences" description="Defaults applied to every screen you open.">
        <Form layout="vertical">
          <Row gutter={token.margin}>
            <Col xs={24} md={8}>
              <Form.Item label="Language" style={{ marginBottom: 0 }}>
                <Select defaultValue="en" options={[{ value: 'en', label: 'English' }, { value: 'fil', label: 'Filipino' }]} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Date format" style={{ marginBottom: 0 }}>
                <Select defaultValue="dmy" options={[{ value: 'dmy', label: '22 Sep 2026' }, { value: 'mdy', label: 'Sep 22, 2026' }]} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Start of week" style={{ marginBottom: 0 }}>
                <Radio.Group
                  optionType="button"
                  defaultValue="mon"
                  options={[
                    { value: 'sun', label: 'Sun' },
                    { value: 'mon', label: 'Mon' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </SectionCard>
    </>
  );
}

function SecurityTab() {
  const { token } = theme.useToken();
  const { message } = App.useApp();

  return (
    <>
      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: token.margin }}
        message="Two-factor authentication is off"
        description="Your workspace policy requires 2FA from 1 October 2026."
        action={<Button size="small" type="primary">Turn on</Button>}
      />

      <SectionCard
        title="Password"
        description="Last changed 118 days ago."
        footer={
          <Flex justify="flex-end">
            <Button type="primary">Update password</Button>
          </Flex>
        }
      >
        <Form layout="vertical" style={{ maxWidth: 420 }}>
          <Form.Item label="Current password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="New password" extra="At least 12 characters, with a number and a symbol.">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirm new password" style={{ marginBottom: 0 }}>
            <Input.Password />
          </Form.Item>
        </Form>
      </SectionCard>

      <SectionCard title="Active sessions" description="Sign out anything you do not recognise.">
        <List
          dataSource={[
            { device: 'MacBook Pro · Chrome', where: 'Cebu, PH', when: 'Active now', current: true, icon: <LaptopOutlined /> },
            { device: 'iPhone 15 · Safari', where: 'Cebu, PH', when: '2 hours ago', icon: <MobileOutlined /> },
            { device: 'Windows · Edge', where: 'Singapore, SG', when: '4 days ago', icon: <LaptopOutlined /> },
          ]}
          renderItem={(item) => (
            <List.Item
              actions={[
                item.current ? (
                  <Tag color="green" key="c">
                    This device
                  </Tag>
                ) : (
                  <Popconfirm
                    key="r"
                    title="Sign out this session?"
                    onConfirm={() => message.success('Session signed out')}
                  >
                    <Button size="small" danger type="text">
                      Sign out
                    </Button>
                  </Popconfirm>
                ),
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={item.icon} />}
                title={item.device}
                description={`${item.where} · ${item.when}`}
              />
            </List.Item>
          )}
        />
      </SectionCard>

      <SectionCard title="API keys" description="Keys inherit your permissions. Rotate them every 90 days.">
        <Table
          size="small"
          pagination={false}
          rowKey="name"
          dataSource={[
            { name: 'ci-deploy', created: '12 Jun 2026', used: '3 hours ago', scope: 'read' },
            { name: 'reporting-sync', created: '2 Feb 2026', used: 'Yesterday', scope: 'read/write' },
          ]}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              render: (v) => (
                <Space>
                  <KeyOutlined style={{ color: token.colorTextTertiary }} />
                  <Typography.Text style={{ fontFamily: token.fontFamilyCode }}>{v}</Typography.Text>
                </Space>
              ),
            },
            { title: 'Scope', dataIndex: 'scope', render: (v) => <Tag>{v}</Tag> },
            { title: 'Created', dataIndex: 'created', responsive: ['md'] },
            { title: 'Last used', dataIndex: 'used', responsive: ['md'] },
            {
              title: '',
              key: 'x',
              width: 48,
              render: () => (
                <Popconfirm title="Revoke this key?" okButtonProps={{ danger: true }} okText="Revoke">
                  <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                </Popconfirm>
              ),
            },
          ]}
        />
        <Divider style={{ margin: `${token.margin}px 0` }} />
        <Button>Create new key</Button>
      </SectionCard>
    </>
  );
}

function NotificationsTab() {
  const { token } = theme.useToken();
  const rows = [
    ['Order placed', 'A new order enters your queue.', true, true, false],
    ['Order held', 'Payment or address verification fails.', true, true, true],
    ['Weekly digest', 'Summary of last week, every Monday.', true, false, false],
    ['Seat limit', 'Workspace reaches 90% of its seats.', true, false, true],
    ['Product updates', 'New features and changelog entries.', false, false, false],
  ];

  return (
    <SectionCard
      title="Notifications"
      description="Choose how each event reaches you. Critical security alerts are always sent by email."
      footer={
        <Flex justify="space-between" align="center" wrap gap={token.marginSM}>
          <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
            Changes apply to your account only.
          </Typography.Text>
          <Button type="primary">Save preferences</Button>
        </Flex>
      }
    >
      <Table
        size="middle"
        pagination={false}
        rowKey={(r) => r[0]}
        dataSource={rows}
        columns={[
          {
            title: 'Event',
            render: (_, r) => (
              <div>
                <Typography.Text>{r[0]}</Typography.Text>
                <br />
                <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  {r[1]}
                </Typography.Text>
              </div>
            ),
          },
          { title: 'Email', width: 90, align: 'center', render: (_, r) => <Switch size="small" defaultChecked={r[2]} /> },
          { title: 'In-app', width: 90, align: 'center', render: (_, r) => <Switch size="small" defaultChecked={r[3]} /> },
          { title: 'SMS', width: 90, align: 'center', render: (_, r) => <Switch size="small" defaultChecked={r[4]} /> },
        ]}
      />
    </SectionCard>
  );
}

function BillingTab() {
  const { token } = theme.useToken();
  return (
    <>
      <Row gutter={[token.margin, token.margin]} style={{ marginBottom: token.margin }}>
        <Col xs={24} lg={14}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <Flex justify="space-between" align="flex-start" wrap gap={token.marginSM}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  Current plan
                </Typography.Text>
                <Typography.Title level={3} style={{ margin: '4px 0 0' }}>
                  Business <Tag color="processing">Annual</Tag>
                </Typography.Title>
                <Typography.Text type="secondary">
                  240 of 300 seats · renews 1 January 2027
                </Typography.Text>
              </div>
              <Space>
                <Button>Change plan</Button>
                <Button type="primary">Add seats</Button>
              </Space>
            </Flex>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <Descriptions
              column={1}
              size="small"
              items={[
                { key: '1', label: 'Payment method', children: 'Visa ending 4242' },
                { key: '2', label: 'Billing email', children: 'finance@acme.co' },
                { key: '3', label: 'Next charge', children: '$69,120 on 1 Jan 2027' },
                { key: '4', label: 'Status', children: <Badge status="success" text="Current" /> },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <SectionCard title="Invoices">
        <Table
          size="small"
          pagination={false}
          rowKey="id"
          dataSource={[
            { id: 'INV-2026-01', date: '1 Jan 2026', amount: 69120, status: 'Paid' },
            { id: 'INV-2025-01', date: '1 Jan 2025', amount: 58400, status: 'Paid' },
            { id: 'INV-2024-01', date: '1 Jan 2024', amount: 41200, status: 'Paid' },
          ]}
          columns={[
            { title: 'Invoice', dataIndex: 'id', render: (v) => <Typography.Text style={{ fontFamily: token.fontFamilyCode }}>{v}</Typography.Text> },
            { title: 'Date', dataIndex: 'date' },
            { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v) => `$${v.toLocaleString('en-US')}` },
            { title: 'Status', dataIndex: 'status', render: (v) => <Tag color="green">{v}</Tag> },
            { title: '', key: 'd', align: 'right', render: () => <Button type="link" size="small" style={{ paddingInline: 0 }}>Download</Button> },
          ]}
        />
      </SectionCard>
    </>
  );
}

export default function SettingsConsole() {
  const { token } = theme.useToken();
  const [tab, setTab] = useState('profile');

  return (
    <PrototypeFrame id="settings-console">
      <Typography.Title level={2} style={{ marginTop: 0, marginBottom: token.marginXXS }}>
        Settings
      </Typography.Title>
      <Typography.Text type="secondary">
        Account, security, and workspace preferences.
      </Typography.Text>

      <Tabs
        activeKey={tab}
        onChange={setTab}
        style={{ marginTop: token.margin }}
        items={[
          { key: 'profile', label: 'Profile', children: <ProfileTab /> },
          { key: 'security', label: 'Security', children: <SecurityTab /> },
          { key: 'notifications', label: 'Notifications', children: <NotificationsTab /> },
          { key: 'billing', label: 'Billing', children: <BillingTab /> },
        ]}
      />
    </PrototypeFrame>
  );
}
