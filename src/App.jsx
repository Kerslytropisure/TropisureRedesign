import { lazy } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';
import AppShell from './layouts/AppShell';
import Home from './pages/Home';
import { prototypes } from './registry/prototypes';

const Color = lazy(() => import('./pages/foundations/Color'));
const Typography = lazy(() => import('./pages/foundations/Typography'));
const LayoutFoundations = lazy(() => import('./pages/foundations/LayoutFoundations'));
const Tokens = lazy(() => import('./pages/foundations/Tokens'));
const Components = lazy(() => import('./pages/system/Components'));
const Patterns = lazy(() => import('./pages/system/Patterns'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />

            <Route path="foundations">
              <Route index element={<Navigate to="/foundations/color" replace />} />
              <Route path="color" element={<Color />} />
              <Route path="typography" element={<Typography />} />
              <Route path="layout" element={<LayoutFoundations />} />
              <Route path="tokens" element={<Tokens />} />
            </Route>

            <Route path="system">
              <Route index element={<Navigate to="/system/components" replace />} />
              <Route path="components" element={<Components />} />
              <Route path="patterns" element={<Patterns />} />
            </Route>

            <Route path="prototypes">
              <Route index element={<Navigate to="/" replace />} />
              {prototypes.map(({ id, component: Prototype }) => (
                <Route key={id} path={id} element={<Prototype />} />
              ))}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
