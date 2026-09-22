import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Flex, Space, Tag, theme, Tooltip, Typography } from 'antd';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { prototypeById, STATUS } from '../registry/prototypes';

/**
 * Wraps every prototype with a consistent bar: where you are, what state the
 * design is in, and a reminder that nothing here is wired up.
 */
export default function PrototypeFrame({ id, children }) {
  const { token } = theme.useToken();
  const meta = prototypeById[id];
  const status = STATUS[meta.status];

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        gap={token.margin}
        wrap
        style={{ marginBottom: token.marginLG }}
      >
        <Space size={token.marginSM} align="center">
          <Link to="/">
            <Button type="text" icon={<ArrowLeftOutlined />} size="small" />
          </Link>
          <Breadcrumb
            items={[{ title: <Link to="/">Prototypes</Link> }, { title: meta.title }]}
          />
        </Space>
        <Space size={token.marginXS} wrap>
          {meta.tags.map((t) => (
            <Tag key={t} variant="outlined" style={{ marginInlineEnd: 0 }}>
              {t}
            </Tag>
          ))}
          <Tag
            color={status.color}
            variant={status.color === 'default' ? 'outlined' : 'filled'}
            style={{ marginInlineEnd: 0 }}
          >
            {status.label}
          </Tag>
          <Tooltip title="Static design only — controls do not persist anything.">
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              <InfoCircleOutlined /> Updated {meta.updated}
            </Typography.Text>
          </Tooltip>
        </Space>
      </Flex>

      {children}
    </>
  );
}
