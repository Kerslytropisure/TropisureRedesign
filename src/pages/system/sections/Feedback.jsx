import { useState } from 'react';
import {
  Alert,
  App,
  Button,
  Col,
  Drawer,
  Modal,
  Popconfirm,
  Result,
  Row,
  Skeleton,
  Space,
  Spin,
  Typography,
  Watermark,
  theme,
} from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { Demo, Section } from '../../../components/primitives';

export default function Feedback() {
  const { token } = theme.useToken();
  const { message, notification, modal } = App.useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Section
        title="Alert"
        description="Inline, persistent messages tied to the surface they appear on."
      >
        <Row gutter={[token.margin, token.margin]}>
          {[
            ['info', 'Scheduled maintenance', 'The ingest API is read-only from 02:00–03:00 UTC.'],
            ['success', 'Invoice paid', 'Receipt sent to finance@acme.co.'],
            ['warning', 'Seats nearly full', '240 of 300 seats assigned.'],
            ['error', 'Sync failed', 'The last three syncs returned a 502 from the source.'],
          ].map(([type, msg, desc]) => (
            <Col key={type} xs={24} lg={12}>
              <Alert type={type} message={msg} description={desc} showIcon closable />
            </Col>
          ))}
          <Col span={24}>
            <Alert
              type="warning"
              showIcon
              banner
              message="Your trial ends in 3 days."
              action={
                <Button size="small" type="primary">
                  Upgrade
                </Button>
              }
            />
          </Col>
        </Row>
      </Section>

      <Section
        title="Transient feedback"
        description="Message for confirmations, Notification for anything the user may need to act on."
      >
        <Demo label="Triggers">
          <Space wrap>
            <Button onClick={() => message.success('Changes saved')}>Success message</Button>
            <Button onClick={() => message.error('Could not reach the server')}>
              Error message
            </Button>
            <Button
              onClick={() =>
                message.loading({ content: 'Exporting…', duration: 1.5, key: 'exp' })
              }
            >
              Loading message
            </Button>
            <Button
              onClick={() =>
                notification.info({
                  message: 'Export ready',
                  description: 'accounts-2026-09.csv is ready to download.',
                  placement: 'bottomRight',
                  btn: (
                    <Button size="small" type="primary">
                      Download
                    </Button>
                  ),
                })
              }
            >
              Notification
            </Button>
          </Space>
        </Demo>
      </Section>

      <Section title="Confirmation" description="Destructive actions always confirm, and name the thing.">
        <Demo label="Popconfirm, Modal, Drawer">
          <Space wrap>
            <Popconfirm
              title="Delete this report?"
              description="Q3 Revenue will be removed for everyone."
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
              onConfirm={() => message.success('Report deleted')}
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete report
              </Button>
            </Popconfirm>

            <Button onClick={() => setModalOpen(true)}>Open modal</Button>

            <Button
              onClick={() =>
                modal.confirm({
                  title: 'Revoke access for Kai Tan?',
                  content: 'They will lose access to all 4 workspaces immediately.',
                  okText: 'Revoke',
                  okButtonProps: { danger: true },
                })
              }
            >
              Confirm dialog
            </Button>

            <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          </Space>

          <Modal
            title="Invite teammates"
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={() => {
              setModalOpen(false);
              message.success('3 invitations sent');
            }}
            okText="Send invites"
          >
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Invitations expire after 7 days. Recipients join with the Viewer role and can be
              promoted later.
            </Typography.Paragraph>
          </Modal>

          <Drawer
            title="Account detail"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            width={420}
            extra={<Button type="primary">Save</Button>}
          >
            <Typography.Paragraph type="secondary">
              Drawers hold detail that supports the list behind them. Keep the list visible so
              the user does not lose their place.
            </Typography.Paragraph>
          </Drawer>
        </Demo>
      </Section>

      <Section title="Loading states" description="Skeletons for layout you know, Spin for work you do not.">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={12}>
            <Demo label="Skeleton">
              <Skeleton avatar active paragraph={{ rows: 3 }} />
            </Demo>
          </Col>
          <Col xs={24} lg={12}>
            <Demo label="Spin">
              <Space direction="vertical" size={token.margin} style={{ width: '100%' }}>
                <Space size={token.marginLG}>
                  <Spin size="small" />
                  <Spin />
                  <Spin size="large" />
                  <Spin indicator={<LoadingOutlined spin />} />
                </Space>
                <Spin spinning={loading} tip="Recalculating…">
                  <div
                    style={{
                      padding: token.paddingLG,
                      background: token.colorFillQuaternary,
                      borderRadius: token.borderRadius,
                    }}
                  >
                    <Typography.Text type="secondary">Wrapped content</Typography.Text>
                  </div>
                </Spin>
                <Button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1600);
                  }}
                >
                  Toggle loading
                </Button>
              </Space>
            </Demo>
          </Col>
        </Row>
      </Section>

      <Section title="Result & Watermark">
        <Row gutter={[token.margin, token.margin]}>
          <Col xs={24} lg={14}>
            <Demo label="Result" padding={0}>
              <Result
                status="success"
                title="Workspace created"
                subTitle="acme-analytics.app is live. Invite your team to get started."
                extra={[
                  <Button type="primary" key="invite">
                    Invite team
                  </Button>,
                  <Button key="later">Do it later</Button>,
                ]}
              />
            </Demo>
          </Col>
          <Col xs={24} lg={10}>
            <Demo label="Watermark" hint="for confidential prototypes">
              <Watermark content="Internal draft">
                <div
                  style={{
                    height: 190,
                    padding: token.padding,
                    background: token.colorFillQuaternary,
                    borderRadius: token.borderRadius,
                  }}
                >
                  <Typography.Text type="secondary">
                    Wrap unreleased screens so screenshots stay identifiable.
                  </Typography.Text>
                </div>
              </Watermark>
            </Demo>
          </Col>
        </Row>
      </Section>
    </>
  );
}
