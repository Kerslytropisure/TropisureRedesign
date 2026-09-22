import { useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  theme,
} from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Demo, Section } from '../../../components/primitives';

const REGION_OPTIONS = [
  {
    value: 'apac',
    label: 'Asia Pacific',
    children: [
      { value: 'sg', label: 'Singapore' },
      { value: 'ph', label: 'Philippines' },
    ],
  },
  {
    value: 'emea',
    label: 'EMEA',
    children: [
      { value: 'de', label: 'Germany' },
      { value: 'uk', label: 'United Kingdom' },
    ],
  },
];

const TRANSFER_DATA = Array.from({ length: 10 }, (_, i) => ({
  key: String(i),
  title: `Permission ${i + 1}`,
}));

export default function DataEntry() {
  const { token } = theme.useToken();
  const [targetKeys, setTargetKeys] = useState(['2', '5']);
  const [options, setOptions] = useState([]);

  return (
    <>
      <Section
        title="Text input"
        description="Label above, helper text below, validation replaces the helper."
      >
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Input">
              <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
                <Input placeholder="Workspace name" />
                <Input addonBefore="https://" addonAfter=".app" defaultValue="acme" />
                <Input.Password placeholder="Password" />
                <Input.Search placeholder="Search accounts" enterButton allowClear />
                <Input.TextArea rows={3} placeholder="Internal note" showCount maxLength={200} />
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="States">
              <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
                <Input placeholder="Default" />
                <Input placeholder="Disabled" disabled />
                <Input placeholder="Read only" readOnly defaultValue="acme-prod-01" />
                <Input status="warning" defaultValue="Name is close to the limit" />
                <Input status="error" defaultValue="Name already taken" />
                <Input.OTP length={6} />
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Selection">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Select & AutoComplete">
              <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
                <Select
                  placeholder="Plan"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'free', label: 'Free' },
                    { value: 'team', label: 'Team' },
                    { value: 'ent', label: 'Enterprise' },
                  ]}
                />
                <Select
                  mode="multiple"
                  placeholder="Tags"
                  style={{ width: '100%' }}
                  defaultValue={['billing']}
                  options={['billing', 'churn-risk', 'enterprise', 'trial'].map((v) => ({
                    value: v,
                    label: v,
                  }))}
                />
                <AutoComplete
                  style={{ width: '100%' }}
                  options={options}
                  placeholder="Search by email"
                  onSearch={(text) =>
                    setOptions(
                      text
                        ? ['gmail.com', 'outlook.com', 'acme.co'].map((d) => ({
                            value: `${text}@${d}`,
                          }))
                        : [],
                    )
                  }
                />
                <TreeSelect
                  style={{ width: '100%' }}
                  placeholder="Team"
                  treeDefaultExpandAll
                  treeData={[
                    {
                      title: 'Engineering',
                      value: 'eng',
                      children: [
                        { title: 'Platform', value: 'platform' },
                        { title: 'Frontend', value: 'frontend' },
                      ],
                    },
                    { title: 'Design', value: 'design' },
                  ]}
                />
                <Cascader
                  style={{ width: '100%' }}
                  options={REGION_OPTIONS}
                  placeholder="Region"
                />
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Toggles">
              <Space direction="vertical" size={token.margin} style={{ width: '100%' }}>
                <Radio.Group defaultValue="monthly">
                  <Radio value="monthly">Monthly</Radio>
                  <Radio value="annual">Annual</Radio>
                  <Radio value="custom" disabled>
                    Custom
                  </Radio>
                </Radio.Group>
                <Radio.Group
                  defaultValue="all"
                  optionType="button"
                  buttonStyle="solid"
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'open', label: 'Open' },
                    { value: 'closed', label: 'Closed' },
                  ]}
                />
                <Checkbox.Group
                  defaultValue={['email']}
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'push', label: 'Push', disabled: true },
                  ]}
                />
                <Space size={token.margin} wrap>
                  <Switch defaultChecked />
                  <Switch size="small" />
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                  <Switch disabled />
                </Space>
                <Rate defaultValue={4} />
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Numbers, dates & files">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Numeric & temporal">
              <Space direction="vertical" size={token.marginSM} style={{ width: '100%' }}>
                <InputNumber style={{ width: '100%' }} min={1} max={999} defaultValue={25} addonAfter="seats" />
                <DatePicker style={{ width: '100%' }} />
                <DatePicker.RangePicker style={{ width: '100%' }} />
                <TimePicker style={{ width: '100%' }} />
                <Slider defaultValue={42} />
                <Slider range defaultValue={[20, 70]} marks={{ 0: '0', 50: '50', 100: '100' }} />
                <ColorPicker defaultValue={token.colorPrimary} showText />
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Upload & Mentions">
              <Space direction="vertical" size={token.margin} style={{ width: '100%' }}>
                <Upload>
                  <Button icon={<UploadOutlined />}>Attach file</Button>
                </Upload>
                <Upload.Dragger multiple style={{ padding: token.paddingSM }}>
                  <p className="ant-upload-drag-icon" style={{ marginBottom: token.marginXS }}>
                    <InboxOutlined style={{ fontSize: 30, color: token.colorPrimary }} />
                  </p>
                  <p className="ant-upload-text">Drop files here or click to browse</p>
                  <p className="ant-upload-hint">CSV or XLSX, up to 10 MB each.</p>
                </Upload.Dragger>
                <Mentions
                  rows={2}
                  placeholder="Mention someone with @"
                  options={[
                    { value: 'ana', label: 'ana' },
                    { value: 'kai', label: 'kai' },
                    { value: 'ren', label: 'ren' },
                  ]}
                />
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Form" description="The canonical vertical layout used across every prototype.">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={14}>
            <Demo label="Vertical form with validation">
              <Form layout="vertical" requiredMark="optional" style={{ maxWidth: 520 }}>
                <Form.Item
                  label="Workspace name"
                  name="name"
                  rules={[{ required: true }]}
                  extra="Shown to everyone on the account."
                >
                  <Input placeholder="Acme Analytics" />
                </Form.Item>
                <Form.Item
                  label="Billing email"
                  name="email"
                  validateStatus="error"
                  help="Enter a valid email address."
                >
                  <Input defaultValue="finance@acme" />
                </Form.Item>
                <Form.Item label="Region" name="region">
                  <Select
                    placeholder="Select a region"
                    options={[
                      { value: 'apac', label: 'Asia Pacific' },
                      { value: 'emea', label: 'EMEA' },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="terms" valuePropName="checked">
                  <Checkbox>I agree to the data processing terms</Checkbox>
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Space>
                    <Button type="primary">Save changes</Button>
                    <Button type="text">Cancel</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Demo>
          </Col>
          <Col xs={24} lg={10}>
            <Demo label="Transfer">
              <Transfer
                dataSource={TRANSFER_DATA}
                targetKeys={targetKeys}
                onChange={setTargetKeys}
                render={(item) => item.title}
                titles={['Available', 'Granted']}
                listStyle={{ width: '100%', height: 240 }}
              />
            </Demo>
          </Col>
        </Row>
      </Section>
    </>
  );
}
