import { createContext, useContext } from 'react';

/**
 * Live theme settings (mode, primary, radius, compact) plus setters.
 * Kept out of ThemeProvider.jsx so that file only exports a component — which
 * is what lets Vite fast-refresh it cleanly.
 */
export const ThemeSettingsContext = createContext(null);

export function useThemeSettings() {
  const ctx = useContext(ThemeSettingsContext);
  if (!ctx) throw new Error('useThemeSettings must be used inside <ThemeProvider>');
  return ctx;
}
