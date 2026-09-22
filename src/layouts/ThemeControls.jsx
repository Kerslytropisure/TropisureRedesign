import {
  Button,
  ColorPicker,
  Divider,
  Flex,
  Popover,
  Segmented,
  Slider,
  Space,
  Switch,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import {
  BgColorsOutlined,
  MoonOutlined,
  ReloadOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { useThemeSettings } from '../theme/themeContext';
import { namedRamps } from '../theme/palettes';

// Derived from the ramp registry so the picker cannot drift out of sync with
// ./palettes. Choosing one of these pins its exact ten steps (see theme/index.js);
// the generic presets below are derived by antd from the seed.
const BRAND = namedRamps.map((r) => r.ramp.light[5]);
const PRESETS = ['#4f46e5', '#0958d9', '#0ea5e9', '#16a34a', '#d97706', '#dc2626', '#db2777'];

function Panel() {
  const { token } = theme.useToken();
  const settings = useThemeSettings();

  return (
    <div style={{ width: 268 }}>
      <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
        Appearance
      </Typography.Text>
      <Segmented
        block
        style={{ marginTop: token.marginXXS }}
        value={settings.mode}
        onChange={(mode) => settings.set({ mode })}
        options={[
          { value: 'light', label: 'Light', icon: <SunOutlined /> },
          { value: 'dark', label: 'Dark', icon: <MoonOutlined /> },
        ]}
      />

      <Divider style={{ margin: `${token.margin}px 0` }} />

      <Flex justify="space-between" align="center">
        <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
          Primary
        </Typography.Text>
        <ColorPicker
          value={settings.primary}
          presets={[
            { label: 'Brand', colors: BRAND, defaultOpen: true },
            { label: 'Presets', colors: PRESETS },
          ]}
          onChange={(c) => settings.set({ primary: c.toHexString() })}
          size="small"
          showText
        />
      </Flex>

      <Flex justify="space-between" align="center" style={{ marginTop: token.marginSM }}>
        <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
          Corner radius
        </Typography.Text>
        <Typography.Text style={{ fontFamily: token.fontFamilyCode, fontSize: token.fontSizeSM }}>
          {settings.radius}px
        </Typography.Text>
      </Flex>
      <Slider
        min={0}
        max={20}
        value={settings.radius}
        onChange={(radius) => settings.set({ radius })}
        style={{ marginTop: 0 }}
      />

      <Flex justify="space-between" align="center">
        <div>
          <Typography.Text style={{ fontSize: token.fontSizeSM }}>Compact</Typography.Text>
          <br />
          <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
            Denser control sizing
          </Typography.Text>
        </div>
        <Switch
          size="small"
          checked={settings.compact}
          onChange={(compact) => settings.set({ compact })}
        />
      </Flex>

      <Divider style={{ margin: `${token.margin}px 0` }} />

      <Space direction="vertical" size={token.marginXS} style={{ width: '100%' }}>
        <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
          Overrides here are preview-only. Commit them in{' '}
          <code style={{ fontSize: token.fontSizeSM }}>src/theme/tokens.js</code>.
        </Typography.Text>
        <Button
          block
          size="small"
          icon={<ReloadOutlined />}
          disabled={!settings.isDirty}
          onClick={settings.reset}
        >
          Reset to seed tokens
        </Button>
      </Space>
    </div>
  );
}

export default function ThemeControls() {
  const settings = useThemeSettings();
  const isDark = settings.mode === 'dark';

  return (
    <Space size={4}>
      <Tooltip title={isDark ? 'Switch to light' : 'Switch to dark'}>
        <Button
          type="text"
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
          onClick={() => settings.set({ mode: isDark ? 'light' : 'dark' })}
        />
      </Tooltip>
      <Popover content={<Panel />} trigger="click" placement="bottomRight" title="Theme">
        <Button icon={<BgColorsOutlined />}>Theme</Button>
      </Popover>
    </Space>
  );
}
