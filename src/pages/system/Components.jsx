import { useSearchParams } from 'react-router-dom';
import { Tabs, Tag, theme } from 'antd';
import { PageHeader } from '../../components/primitives';
import General from './sections/General';
import Navigation from './sections/Navigation';
import DataEntry from './sections/DataEntry';
import DataDisplay from './sections/DataDisplay';
import Feedback from './sections/Feedback';

const TABS = [
  { key: 'general', label: 'General', children: <General /> },
  { key: 'navigation', label: 'Navigation', children: <Navigation /> },
  { key: 'data-entry', label: 'Data entry', children: <DataEntry /> },
  { key: 'data-display', label: 'Data display', children: <DataDisplay /> },
  { key: 'feedback', label: 'Feedback', children: <Feedback /> },
];

export default function Components() {
  const { token } = theme.useToken();
  const [params, setParams] = useSearchParams();
  const active = params.get('tab') ?? 'general';

  return (
    <>
      <PageHeader
        title="Components"
        description="Every component rendered under the current theme. If something looks wrong here, it is wrong everywhere — fix the token, not the screen."
        tag={<Tag color="processing">Ant Design 6.3.2</Tag>}
      />

      <Tabs
        activeKey={active}
        onChange={(key) => setParams({ tab: key }, { replace: true })}
        items={TABS}
        destroyOnHidden
        tabBarStyle={{
          position: 'sticky',
          top: 60,
          zIndex: 5,
          background: token.colorBgLayout,
          marginBottom: token.marginLG,
        }}
      />
    </>
  );
}
