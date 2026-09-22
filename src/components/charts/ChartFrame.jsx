import { useState } from 'react';
import { Flex, Segmented, Space, Table, Typography, theme } from 'antd';
import { BarChartOutlined, TableOutlined } from '@ant-design/icons';

/**
 * Wraps a plot with the things every chart owes its reader: a title that names
 * the measure, a legend when there is more than one series, and a table view so
 * the numbers are reachable without hovering (and without relying on colour).
 */
export default function ChartFrame({
  title,
  subtitle,
  series,
  categories,
  formatValue = (v) => v,
  extra,
  children,
}) {
  const { token } = theme.useToken();
  const [view, setView] = useState('chart');
  const showLegend = series.length > 1;

  const tableColumns = [
    { title: '', dataIndex: 'label', fixed: 'left', width: 120 },
    ...series.map((s, i) => ({
      title: (
        <Space size={6}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: s.color,
              display: 'inline-block',
            }}
          />
          {s.name}
        </Space>
      ),
      dataIndex: `s${i}`,
      align: 'right',
      render: formatValue,
    })),
  ];

  const tableRows = categories.map((label, idx) => ({
    key: label,
    label,
    ...Object.fromEntries(series.map((s, i) => [`s${i}`, s.data[idx]])),
  }));

  return (
    <div>
      <Flex align="flex-start" justify="space-between" gap={token.margin} wrap>
        <div>
          <Typography.Text strong style={{ fontSize: token.fontSizeLG }}>
            {title}
          </Typography.Text>
          {subtitle && (
            <Typography.Paragraph
              type="secondary"
              style={{ margin: 0, fontSize: token.fontSizeSM }}
            >
              {subtitle}
            </Typography.Paragraph>
          )}
        </div>
        <Space size={token.marginSM}>
          {extra}
          <Segmented
            size="small"
            value={view}
            onChange={setView}
            options={[
              { value: 'chart', icon: <BarChartOutlined />, title: 'Chart' },
              { value: 'table', icon: <TableOutlined />, title: 'Table' },
            ]}
          />
        </Space>
      </Flex>

      {showLegend && view === 'chart' && (
        <Flex gap={token.margin} wrap style={{ marginTop: token.marginSM }}>
          {series.map((s) => (
            <Space key={s.key} size={6}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: s.color,
                  display: 'inline-block',
                }}
              />
              <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                {s.name}
              </Typography.Text>
            </Space>
          ))}
        </Flex>
      )}

      <div style={{ marginTop: token.margin }}>
        {view === 'chart' ? (
          children
        ) : (
          <Table
            size="small"
            columns={tableColumns}
            dataSource={tableRows}
            pagination={false}
            scroll={{ x: 'max-content', y: 240 }}
          />
        )}
      </div>
    </div>
  );
}
