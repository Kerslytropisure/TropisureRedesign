import { useState } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Steps,
  Tag,
  theme,
  Typography,
} from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  MailOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import PrototypeFrame from '../../components/PrototypeFrame';

const STEPS = [
  { title: 'Workspace', description: 'Name and region' },
  { title: 'Team', description: 'Invite members' },
  { title: 'Plan', description: 'Choose billing' },
  { title: 'Done', description: 'Start working' },
];

const INVITES = [
  { email: 'ana@acme.co', role: 'Admin' },
  { email: 'kai@acme.co', role: 'Editor' },
  { email: 'ren@acme.co', role: 'Viewer' },
];

const PLANS = [
  {
    value: 'team',
    name: 'Team',
    price: '$24',
    per: 'per seat / month',
    points: ['Up to 50 seats', 'Shared dashboards', 'Email support'],
  },
  {
    value: 'business',
    name: 'Business',
    price: '$48',
    per: 'per seat / month',
    points: ['Unlimited seats', 'SSO and SCIM', 'Priority support'],
    recommended: true,
  },
  {
    value: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    per: 'annual contract',
    points: ['Dedicated region', 'Audit log export', 'Named CSM'],
  },
];

function WorkspaceStep() {
  const { token } = theme.useToken();
  return (
    <Form layout="vertical" style={{ maxWidth: 560 }}>
      <Form.Item
        label="Workspace name"
        name="name"
        rules={[{ required: true }]}
        extra="Visible to everyone you invite."
      >
        <Input size="large" placeholder="Acme Analytics" defaultValue="Acme Analytics" />
      </Form.Item>
      <Form.Item label="Workspace URL" name="slug">
        <Input size="large" addonBefore="https://" addonAfter=".acme.app" defaultValue="analytics" />
      </Form.Item>
      <Row gutter={token.margin}>
        <Col xs={24} sm={12}>
          <Form.Item label="Data region" name="region" extra="Cannot be changed later.">
            <Select
              size="large"
              defaultValue="apac"
              options={[
                { value: 'apac', label: 'Asia Pacific (Singapore)' },
                { value: 'emea', label: 'EMEA (Frankfurt)' },
                { value: 'us', label: 'US East (Virginia)' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Industry" name="industry">
            <Select
              size="large"
              placeholder="Select one"
              options={['SaaS', 'Retail', 'Logistics', 'Finance'].map((v) => ({
                value: v.toLowerCase(),
                label: v,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Alert
        type="info"
        showIcon
        message="Your data stays in the region you pick. Moving it later requires a migration request."
      />
    </Form>
  );
}

function TeamStep() {
  const { token } = theme.useToken();
  return (
    <div style={{ maxWidth: 620 }}>
      <Form layout="vertical">
        <Form.Item label="Invite by email" name="invite" extra="Separate multiple addresses with a comma.">
          <Space.Compact style={{ width: '100%' }}>
            <Input size="large" prefix={<MailOutlined />} placeholder="name@acme.co" />
            <Select
              size="large"
              defaultValue="editor"
              style={{ width: 130 }}
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'editor', label: 'Editor' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
            <Button size="large" type="primary" icon={<PlusOutlined />}>
              Add
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>

      <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
        {INVITES.length} pending invitations
      </Typography.Text>
      <List
        style={{ marginTop: token.marginXS }}
        dataSource={INVITES}
        renderItem={(item) => (
          <List.Item actions={[<a key="remove">Remove</a>]}>
            <List.Item.Meta
              avatar={<Avatar>{item.email[0].toUpperCase()}</Avatar>}
              title={item.email}
              description={<Tag>{item.role}</Tag>}
            />
          </List.Item>
        )}
      />
      <Divider />
      <Checkbox defaultChecked>Send a welcome email with a getting-started guide</Checkbox>
    </div>
  );
}

function PlanStep({ plan, onPlan }) {
  const { token } = theme.useToken();
  return (
    <div>
      <Radio.Group value={plan} onChange={(e) => onPlan(e.target.value)} style={{ width: '100%' }}>
        <Row gutter={[token.margin, token.margin]}>
          {PLANS.map((p) => {
            const selected = plan === p.value;
            return (
              <Col key={p.value} xs={24} md={8}>
                <Card
                  variant="outlined"
                  hoverable
                  onClick={() => onPlan(p.value)}
                  style={{
                    height: '100%',
                    borderColor: selected ? token.colorPrimary : undefined,
                    boxShadow: selected ? `0 0 0 1px ${token.colorPrimary}` : undefined,
                  }}
                >
                  <Flex justify="space-between" align="flex-start">
                    <Radio value={p.value}>
                      <Typography.Text strong>{p.name}</Typography.Text>
                    </Radio>
                    {p.recommended && <Tag color="processing">Recommended</Tag>}
                  </Flex>
                  <Typography.Title level={3} style={{ margin: `${token.marginSM}px 0 0` }}>
                    {p.price}
                  </Typography.Title>
                  <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                    {p.per}
                  </Typography.Text>
                  <Divider style={{ margin: `${token.margin}px 0` }} />
                  <Space direction="vertical" size={token.marginXS}>
                    {p.points.map((pt) => (
                      <Space key={pt} size={token.marginXS} align="start">
                        <CheckCircleFilled style={{ color: token.colorSuccess, fontSize: 13 }} />
                        <Typography.Text style={{ fontSize: token.fontSizeSM }}>{pt}</Typography.Text>
                      </Space>
                    ))}
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Radio.Group>
      <Alert
        style={{ marginTop: token.margin }}
        type="success"
        showIcon
        message="14-day trial included. We will not charge the card until the trial ends."
      />
    </div>
  );
}

export default function OnboardingFlow() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [plan, setPlan] = useState('business');

  const body = [
    <WorkspaceStep key="w" />,
    <TeamStep key="t" />,
    <PlanStep key="p" plan={plan} onPlan={setPlan} />,
    <Result
      key="d"
      status="success"
      title="Acme Analytics is ready"
      subTitle="3 invitations sent · Business plan · Asia Pacific region"
      extra={[
        <Button type="primary" key="go">
          Go to dashboard
        </Button>,
        <Button key="docs">Read the quickstart</Button>,
      ]}
    />,
  ][current];

  const isLast = current === STEPS.length - 1;

  return (
    <PrototypeFrame id="onboarding-flow">
      <Row gutter={[token.marginXL, token.margin]}>
        <Col xs={24} lg={7}>
          <Typography.Title level={2} style={{ marginTop: 0 }}>
            Set up your workspace
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Four short steps. You can change everything except the data region later.
          </Typography.Paragraph>
          <Steps
            direction="vertical"
            current={current}
            items={STEPS}
            onChange={setCurrent}
            style={{ marginTop: token.marginLG }}
          />
        </Col>

        <Col xs={24} lg={17}>
          <Card
            variant="outlined"
            title={STEPS[current].title}
            extra={
              <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                Step {current + 1} of {STEPS.length}
              </Typography.Text>
            }
          >
            {body}

            {!isLast && (
              <>
                <Divider />
                <Flex justify="space-between" align="center" wrap gap={token.marginSM}>
                  <Button
                    icon={<ArrowLeftOutlined />}
                    disabled={current === 0}
                    onClick={() => setCurrent((c) => c - 1)}
                  >
                    Back
                  </Button>
                  <Space>
                    <Button type="text" onClick={() => setCurrent(STEPS.length - 1)}>
                      Skip for now
                    </Button>
                    <Button type="primary" onClick={() => setCurrent((c) => c + 1)}>
                      Continue <ArrowRightOutlined />
                    </Button>
                  </Space>
                </Flex>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </PrototypeFrame>
  );
}
