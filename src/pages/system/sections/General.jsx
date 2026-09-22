import {
  Button,
  Col,
  Divider,
  Flex,
  Row,
  Space,
  Splitter,
  Typography,
  theme,
} from 'antd';
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Demo, Section } from '../../../components/primitives';

export default function General() {
  const { token } = theme.useToken();

  return (
    <>
      <Section
        title="Button"
        description="Exactly one primary button per view. Everything else is default, text, or link."
      >
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Variants">
              <Space wrap>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="text">Text</Button>
                <Button type="link">Link</Button>
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Danger & disabled">
              <Space wrap>
                <Button type="primary" danger>
                  Delete
                </Button>
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
                <Button type="primary" disabled>
                  Disabled
                </Button>
                <Button disabled>Disabled</Button>
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="With icons">
              <Space wrap>
                <Button type="primary" icon={<PlusOutlined />}>
                  New report
                </Button>
                <Button icon={<DownloadOutlined />}>Export</Button>
                <Button icon={<SearchOutlined />} />
                <Button shape="circle" icon={<SettingOutlined />} />
                <Button shape="round" icon={<DownloadOutlined />}>
                  Round
                </Button>
              </Space>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Loading & block">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space wrap>
                  <Button type="primary" loading>
                    Saving
                  </Button>
                  <Button loading icon={<DownloadOutlined />}>
                    Exporting
                  </Button>
                  <Button type="primary" loading shape="circle" />
                </Space>
                <Button type="primary" block>
                  Block button
                </Button>
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Typography" description="Headings, body copy, and inline treatments.">
        <Demo label="Article">
          <Typography>
            <Typography.Title level={3} style={{ marginTop: 0 }}>
              Release notes
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              Published 22 September 2026 · 3 min read
            </Typography.Paragraph>
            <Typography.Paragraph>
              The settings console now shares the same two-column form layout as onboarding.
              Field labels sit above their control, helper text below, and validation replaces
              the helper text rather than appending to it.
            </Typography.Paragraph>
            <Typography.Title level={5}>Breaking</Typography.Title>
            <ul style={{ margin: 0, paddingInlineStart: 20, color: token.colorText }}>
              <li>
                <Typography.Text code>Card bordered</Typography.Text> is now{' '}
                <Typography.Text code>variant=&quot;outlined&quot;</Typography.Text>.
              </li>
              <li>Spacing must come from size tokens, not hard-coded pixels.</li>
            </ul>
            <Typography.Paragraph type="secondary" style={{ marginTop: token.margin, marginBottom: 0 }}>
              <Typography.Text keyboard>Cmd</Typography.Text> +{' '}
              <Typography.Text keyboard>K</Typography.Text> opens the command palette.
            </Typography.Paragraph>
          </Typography>
        </Demo>
      </Section>

      <Section title="Layout primitives" description="Flex, Space, Divider, and Splitter.">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Flex" hint="gap + justify + align">
              <Flex gap={token.marginSM} vertical>
                <Flex gap={token.marginSM} justify="space-between" align="center">
                  <Typography.Text strong>Row total</Typography.Text>
                  <Typography.Text>$12,480.00</Typography.Text>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <Flex gap={token.marginSM} wrap>
                  {['Draft', 'Queued', 'Sent'].map((s) => (
                    <div
                      key={s}
                      style={{
                        flex: 1,
                        minWidth: 90,
                        padding: token.paddingSM,
                        textAlign: 'center',
                        background: token.colorFillQuaternary,
                        borderRadius: token.borderRadius,
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </Flex>
              </Flex>
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Splitter" hint="resizable panes" padding={0}>
              <Splitter style={{ height: 160 }}>
                <Splitter.Panel defaultSize="40%" min="20%" max="70%">
                  <div style={{ padding: token.padding }}>
                    <Typography.Text strong>Navigator</Typography.Text>
                    <Typography.Paragraph
                      type="secondary"
                      style={{ fontSize: token.fontSizeSM, marginBottom: 0 }}
                    >
                      Drag the divider.
                    </Typography.Paragraph>
                  </div>
                </Splitter.Panel>
                <Splitter.Panel>
                  <div style={{ padding: token.padding }}>
                    <Typography.Text strong>Detail</Typography.Text>
                    <Typography.Paragraph
                      type="secondary"
                      style={{ fontSize: token.fontSizeSM, marginBottom: 0 }}
                    >
                      Content pane.
                    </Typography.Paragraph>
                  </div>
                </Splitter.Panel>
              </Splitter>
            </Demo>
          </Col>
        </Row>
      </Section>
    </>
  );
}
