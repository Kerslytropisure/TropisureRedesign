import { useEffect, useMemo, useState } from 'react';
import { App as AntApp, ConfigProvider } from 'antd';
import { buildTheme } from './index';
import { seedToken } from './tokens';
import { ThemeSettingsContext } from './themeContext';

const STORAGE_KEY = 'dsl:theme-settings';

const defaults = {
  mode: 'light',
  compact: false,
  primary: seedToken.colorPrimary,
  radius: seedToken.borderRadius,
};

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export default function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(readStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.mode;
    document.documentElement.style.colorScheme = settings.mode;
  }, [settings]);

  const value = useMemo(
    () => ({
      ...settings,
      set: (patch) => setSettings((s) => ({ ...s, ...patch })),
      reset: () => setSettings(defaults),
      isDirty:
        settings.primary !== defaults.primary ||
        settings.radius !== defaults.radius ||
        settings.compact !== defaults.compact,
    }),
    [settings],
  );

  const themeConfig = useMemo(() => buildTheme(settings), [settings]);

  return (
    <ThemeSettingsContext.Provider value={value}>
      <ConfigProvider theme={themeConfig}>
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </ThemeSettingsContext.Provider>
  );
}
