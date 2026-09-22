import { App, Flex, Space, theme, Tooltip, Typography } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { useToken } = theme;

/** Page title block used at the top of every route. */
export function PageHeader({ title, description, extra, tag }) {
  const { token } = useToken();
  return (
    <div style={{ marginBottom: token.marginXL }}>
      <Flex align="flex-start" justify="space-between" gap={token.margin} wrap>
        <div style={{ maxWidth: 720 }}>
          <Flex align="center" gap={token.marginSM} wrap>
            <Typography.Title level={2} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            {tag}
          </Flex>
          {description && (
            <Typography.Paragraph
              type="secondary"
              style={{ margin: `${token.marginXS}px 0 0`, fontSize: token.fontSizeLG }}
            >
              {description}
            </Typography.Paragraph>
          )}
        </div>
        {extra}
      </Flex>
    </div>
  );
}

/** A titled group of demos. Anchorable via `id`. */
export function Section({ id, title, description, extra, children }) {
  const { token } = useToken();
  return (
    <section id={id} style={{ scrollMarginTop: 88, marginBottom: token.marginXL * 1.5 }}>
      <Flex align="baseline" justify="space-between" gap={token.margin} wrap>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          {description && (
            <Typography.Text type="secondary">{description}</Typography.Text>
          )}
        </div>
        {extra}
      </Flex>
      <div style={{ marginTop: token.margin }}>{children}</div>
    </section>
  );
}

/** A single live example, framed so it reads as "this is the component". */
export function Demo({ label, hint, children, padding, background = 'container' }) {
  const { token } = useToken();
  return (
    <div
      style={{
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        background:
          background === 'layout' ? token.colorBgLayout : token.colorBgContainer,
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {(label || hint) && (
        <div
          style={{
            padding: `${token.paddingXS}px ${token.padding}px`,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorFillQuaternary,
          }}
        >
          <Typography.Text strong style={{ fontSize: token.fontSizeSM }}>
            {label}
          </Typography.Text>
          {hint && (
            <Typography.Text
              type="secondary"
              style={{ fontSize: token.fontSizeSM, marginInlineStart: token.marginXS }}
            >
              {hint}
            </Typography.Text>
          )}
        </div>
      )}
      <div style={{ padding: padding ?? token.paddingLG }}>{children}</div>
    </div>
  );
}

/** Monospace inline value with click-to-copy. */
export function CopyValue({ value, children, size = 'sm' }) {
  const { token } = useToken();
  const { message } = App.useApp();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      message.error('Clipboard unavailable');
    }
  };

  return (
    <Tooltip title={copied ? 'Copied' : 'Copy'}>
      <Space
        size={4}
        onClick={copy}
        style={{
          cursor: 'pointer',
          fontFamily: token.fontFamilyCode,
          fontSize: size === 'sm' ? token.fontSizeSM : token.fontSize,
          color: token.colorTextSecondary,
        }}
      >
        <span>{children ?? value}</span>
        {copied ? (
          <CheckOutlined style={{ color: token.colorSuccess, fontSize: 11 }} />
        ) : (
          <CopyOutlined style={{ fontSize: 11, opacity: 0.55 }} />
        )}
      </Space>
    </Tooltip>
  );
}

/** Key/value row used in the token tables. */
export function TokenRow({ name, value, preview }) {
  const { token } = useToken();
  return (
    <Flex
      align="center"
      justify="space-between"
      gap={token.margin}
      style={{
        padding: `${token.paddingSM}px 0`,
        borderBottom: `1px solid ${token.colorSplit}`,
      }}
    >
      <Space size={token.marginSM}>
        {preview}
        <Typography.Text style={{ fontFamily: token.fontFamilyCode, fontSize: token.fontSizeSM }}>
          {name}
        </Typography.Text>
      </Space>
      <CopyValue value={value} />
    </Flex>
  );
}
