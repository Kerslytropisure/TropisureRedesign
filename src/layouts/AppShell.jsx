import { Suspense, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Flex, Grid, Layout, Menu, Skeleton, Tag, theme, Typography } from 'antd';
import {
  AppstoreOutlined,
  BgColorsOutlined,
  BlockOutlined,
  ExperimentOutlined,
  FontSizeOutlined,
  HomeOutlined,
  LayoutOutlined,
  MenuOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { prototypes } from '../registry/prototypes';
import { appTokens } from '../theme';
import { onCalamansi } from '../theme/palettes';
import ThemeControls from './ThemeControls';
import pkg from '../../package.json';

const { Header, Sider, Content } = Layout;

function useNavItems() {
  return useMemo(
    () => [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: <Link to="/">Overview</Link>,
      },
      { type: 'divider' },
      {
        key: 'foundations',
        label: 'Foundations',
        type: 'group',
        children: [
          {
            key: '/foundations/color',
            icon: <BgColorsOutlined />,
            label: <Link to="/foundations/color">Color</Link>,
          },
          {
            key: '/foundations/typography',
            icon: <FontSizeOutlined />,
            label: <Link to="/foundations/typography">Typography</Link>,
          },
          {
            key: '/foundations/layout',
            icon: <LayoutOutlined />,
            label: <Link to="/foundations/layout">Spacing & shape</Link>,
          },
          {
            key: '/foundations/tokens',
            icon: <TableOutlined />,
            label: <Link to="/foundations/tokens">Token reference</Link>,
          },
        ],
      },
      {
        key: 'system',
        label: 'System',
        type: 'group',
        children: [
          {
            key: '/system/components',
            icon: <AppstoreOutlined />,
            label: <Link to="/system/components">Components</Link>,
          },
          {
            key: '/system/patterns',
            icon: <BlockOutlined />,
            label: <Link to="/system/patterns">Patterns</Link>,
          },
        ],
      },
      {
        key: 'prototypes',
        label: 'Prototypes',
        type: 'group',
        children: prototypes.map((p) => ({
          key: `/prototypes/${p.id}`,
          icon: <ExperimentOutlined />,
          label: <Link to={`/prototypes/${p.id}`}>{p.title}</Link>,
        })),
      },
    ],
    [],
  );
}

function Brand({ token }) {
  return (
    <Link to="/" style={{ display: 'block' }}>
      <Flex align="center" gap={10}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: token.borderRadius,
            background: `linear-gradient(135deg, ${token.colorPrimary}, ${token.colorPrimaryBorderHover})`,
            display: 'grid',
            placeItems: 'center',
            // White on a Calamansi fill is 1.83:1 — use the brand ink.
            color: onCalamansi,
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          T
        </div>
        <div style={{ lineHeight: 1.2, minWidth: 0 }}>
          <Typography.Text strong style={{ display: 'block' }}>
            Tropisure
          </Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 11 }}>
            antd {pkg.dependencies.antd.replace(/^\D*/, '')}
          </Typography.Text>
        </div>
      </Flex>
    </Link>
  );
}

export default function AppShell() {
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const [collapsed, setCollapsed] = useState(false);
  const items = useNavItems();

  const navContent = (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      items={items}
      style={{ background: 'transparent', borderInlineEnd: 'none', paddingBottom: 24 }}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      {!isMobile && (
        <Sider
          width={appTokens.sidebarWidth}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          theme="light"
          style={{
            background: token.colorBgContainer,
            borderInlineEnd: `1px solid ${token.colorBorderSecondary}`,
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: appTokens.headerHeight,
              display: 'flex',
              alignItems: 'center',
              padding: `0 ${token.padding}px`,
              position: 'sticky',
              top: 0,
              zIndex: 2,
              background: token.colorBgContainer,
            }}
          >
            {collapsed ? null : <Brand token={token} />}
          </div>
          {navContent}
        </Sider>
      )}

      <Layout style={{ background: 'transparent' }}>
        <Header
          style={{
            height: appTokens.headerHeight,
            lineHeight: `${appTokens.headerHeight}px`,
            padding: `0 ${token.paddingLG}px`,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <Flex align="center" justify="space-between" style={{ height: '100%' }}>
            <Flex align="center" gap={token.marginSM}>
              {isMobile ? (
                <Brand token={token} />
              ) : (
                <MenuOutlined
                  onClick={() => setCollapsed((c) => !c)}
                  style={{ cursor: 'pointer', color: token.colorTextSecondary }}
                />
              )}
              <Tag
                color="processing"
                style={{ marginInlineStart: token.marginXXS, marginInlineEnd: 0 }}
              >
                Static prototype
              </Tag>
            </Flex>
            <ThemeControls />
          </Flex>
        </Header>

        {isMobile && (
          <div
            style={{
              background: token.colorBgContainer,
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            <Menu
              mode="horizontal"
              selectedKeys={[pathname]}
              items={items.filter((i) => i.type !== 'divider')}
              style={{ background: 'transparent', borderBottom: 'none' }}
            />
          </div>
        )}

        <Content
          style={{
            padding: `${token.paddingLG}px`,
            maxWidth: appTokens.maxContentWidth,
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Suspense fallback={<Skeleton active paragraph={{ rows: 8 }} />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
