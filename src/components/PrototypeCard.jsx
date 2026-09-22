import { Link } from 'react-router-dom';
import { Card, Flex, Space, Tag, theme, Typography } from 'antd';
import { ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { STATUS } from '../registry/prototypes';
import { rampByName, rampFor } from '../theme/palettes';
import { useThemeSettings } from '../theme/themeContext';

/**
 * Abstract "screen" thumbnail, drawn from a brand ramp rather than fixed hex.
 *
 * The ramp is resolved at render time and per mode, so a change in
 * src/theme/palettes.js shows up here without touching the registry.
 */
function Thumbnail({ accent }) {
  const { token } = theme.useToken();
  const { mode } = useThemeSettings();
  const steps = rampFor(rampByName(accent.ramp), mode);
  const from = steps[accent.from - 1];
  const to = steps[accent.to - 1];
  const bar = (w, opacity) => (
    <div
      style={{
        height: 6,
        width: w,
        borderRadius: 3,
        background: '#fff',
        opacity,
      }}
    />
  );

  return (
    <div
      style={{
        height: 128,
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        padding: token.padding,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 90% at 85% 0%, rgba(255,255,255,0.35), transparent 60%)',
        }}
      />
      <Flex gap={8} style={{ position: 'relative' }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: token.borderRadius,
            background: 'rgba(255,255,255,0.28)',
          }}
        />
        <Flex vertical justify="center" gap={6} style={{ flex: 1 }}>
          {bar('70%', 0.85)}
          {bar('45%', 0.5)}
        </Flex>
      </Flex>
      <Flex gap={6} style={{ position: 'relative' }}>
        {bar('28%', 0.35)}
        {bar('20%', 0.25)}
        {bar('34%', 0.3)}
      </Flex>
    </div>
  );
}

export default function PrototypeCard({ prototype }) {
  const { token } = theme.useToken();
  const status = STATUS[prototype.status];

  return (
    <Link to={`/prototypes/${prototype.id}`} style={{ display: 'block', height: '100%' }}>
      <Card
        hoverable
        variant="outlined"
        styles={{ body: { padding: token.padding } }}
        cover={<Thumbnail accent={prototype.accent} />}
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <Flex vertical gap={token.marginXS} style={{ height: '100%' }}>
          <Flex align="center" justify="space-between" gap={token.marginXS}>
            <Typography.Text strong style={{ fontSize: token.fontSizeLG }}>
              {prototype.title}
            </Typography.Text>
            <Tag
              color={status.color}
              variant={status.color === 'default' ? 'outlined' : 'filled'}
              style={{ marginInlineEnd: 0 }}
            >
              {status.label}
            </Tag>
          </Flex>

          <Typography.Paragraph
            type="secondary"
            style={{ margin: 0, minHeight: 44 }}
            ellipsis={{ rows: 2 }}
          >
            {prototype.summary}
          </Typography.Paragraph>

          <Space size={[4, 4]} wrap>
            {prototype.tags.map((t) => (
              <Tag key={t} variant="outlined" style={{ marginInlineEnd: 0 }}>
                {t}
              </Tag>
            ))}
          </Space>

          <Flex
            align="center"
            justify="space-between"
            style={{
              marginTop: token.marginXS,
              paddingTop: token.marginXS,
              borderTop: `1px solid ${token.colorSplit}`,
            }}
          >
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              <ClockCircleOutlined /> {prototype.updated}
            </Typography.Text>
            <Typography.Text style={{ fontSize: token.fontSizeSM, color: token.colorPrimary }}>
              Open <ArrowRightOutlined style={{ fontSize: 11 }} />
            </Typography.Text>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
}
