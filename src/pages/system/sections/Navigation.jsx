import { useState } from 'react';
import {
  Anchor,
  Breadcrumb,
  Col,
  Dropdown,
  Menu,
  Pagination,
  Row,
  Segmented,
  Space,
  Steps,
  Tabs,
  theme,
  Typography,
} from 'antd';
import {
  AppstoreOutlined,
  BarsOutlined,
  DownOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Demo, Section } from '../../../components/primitives';

export default function Navigation() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(1);
  const [view, setView] = useState('board');

  return (
    <>
      <Section title="Wayfinding" description="Where am I, and how do I get back?">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Breadcrumb">
              <Breadcrumb
                items={[
                  { href: '#/', title: <HomeOutlined /> },
                  { href: '#/system/components', title: 'Components' },
                  { title: 'Navigation' },
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Dropdown">
              <Space wrap>
                <Dropdown
                  menu={{
                    items: [
                      { key: 'csv', label: 'Export as CSV' },
                      { key: 'xlsx', label: 'Export as XLSX' },
                      { type: 'divider' },
                      { key: 'del', label: 'Delete report', danger: true },
                    ],
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Actions
                      <DownOutlined style={{ fontSize: 11 }} />
                    </Space>
                  </a>
                </Dropdown>
                <Dropdown.Button
                  menu={{ items: [{ key: 'dup', label: 'Duplicate' }] }}
                  type="primary"
                >
                  Publish
                </Dropdown.Button>
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Menu">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Horizontal" padding={0}>
              <Menu
                mode="horizontal"
                selectedKeys={['overview']}
                items={[
                  { key: 'overview', icon: <AppstoreOutlined />, label: 'Overview' },
                  { key: 'reports', icon: <BarsOutlined />, label: 'Reports' },
                  {
                    key: 'admin',
                    icon: <SettingOutlined />,
                    label: 'Admin',
                    children: [
                      { key: 'members', label: 'Members' },
                      { key: 'billing', label: 'Billing' },
                    ],
                  },
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Inline" padding={0}>
              <Menu
                mode="inline"
                selectedKeys={['inbox']}
                defaultOpenKeys={['mail']}
                style={{ borderInlineEnd: 'none' }}
                items={[
                  {
                    key: 'mail',
                    icon: <MailOutlined />,
                    label: 'Mail',
                    children: [
                      { key: 'inbox', label: 'Inbox' },
                      { key: 'sent', label: 'Sent' },
                    ],
                  },
                  { key: 'people', icon: <UserOutlined />, label: 'People' },
                ]}
              />
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Progress & switching">
        <Row gutter={[token.margin, token.margin]}>
          <Col span={24}>
            <Demo label="Steps">
              <Steps
                current={1}
                items={[
                  { title: 'Workspace', description: 'Name and region' },
                  { title: 'Team', description: 'Invite members' },
                  { title: 'Billing', description: 'Choose a plan' },
                  { title: 'Done' },
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={14}>
            <Demo label="Tabs">
              <Tabs
                defaultActiveKey="activity"
                items={[
                  {
                    key: 'activity',
                    label: 'Activity',
                    children: (
                      <Typography.Text type="secondary">
                        Recent events for this account.
                      </Typography.Text>
                    ),
                  },
                  {
                    key: 'invoices',
                    label: 'Invoices',
                    children: (
                      <Typography.Text type="secondary">
                        Twelve invoices, two overdue.
                      </Typography.Text>
                    ),
                  },
                  { key: 'notes', label: 'Notes', children: <Typography.Text type="secondary">No notes yet.</Typography.Text> },
                  { key: 'archive', label: 'Archive', disabled: true },
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={10}>
            <Demo label="Segmented & Pagination">
              <Space direction="vertical" size={token.margin} style={{ width: '100%' }}>
                <Segmented
                  value={view}
                  onChange={setView}
                  options={[
                    { value: 'board', label: 'Board', icon: <AppstoreOutlined /> },
                    { value: 'list', label: 'List', icon: <BarsOutlined /> },
                  ]}
                />
                <Pagination
                  size="small"
                  current={current}
                  onChange={setCurrent}
                  total={185}
                  showSizeChanger={false}
                />
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Anchor" hint="in-page jump list">
              <Anchor
                affix={false}
                items={[
                  { key: 'a', href: '#nav-wayfinding', title: 'Wayfinding' },
                  { key: 'b', href: '#nav-menu', title: 'Menu' },
                  { key: 'c', href: '#nav-progress', title: 'Progress & switching' },
                ]}
              />
            </Demo>
          </Col>
        </Row>
      </Section>
    </>
  );
}
