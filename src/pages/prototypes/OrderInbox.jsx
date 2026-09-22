import { useMemo, useState } from 'react';
import {
  Alert,
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Flex,
  Input,
  Popconfirm,
  Select,
  Space,
  Steps,
  Table,
  Tag,
  Timeline,
  Tooltip,
  theme,
  Typography,
} from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  FilterOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import PrototypeFrame from '../../components/PrototypeFrame';

const STATUS = {
  new: { label: 'New', color: 'blue', badge: 'processing' },
  packing: { label: 'Packing', color: 'gold', badge: 'warning' },
  shipped: { label: 'Shipped', color: 'green', badge: 'success' },
  held: { label: 'On hold', color: 'red', badge: 'error' },
};

const PRIORITY = {
  high: { label: 'High', color: 'red' },
  normal: { label: 'Normal', color: 'default' },
  low: { label: 'Low', color: 'default' },
};

const ORDERS = [
  { key: 'SO-4821', customer: 'Northwind Traders', items: 12, total: 4820, status: 'new', priority: 'high', placed: '22 Sep, 09:14', channel: 'Web' },
  { key: 'SO-4820', customer: 'Contoso Ltd', items: 3, total: 918, status: 'packing', priority: 'normal', placed: '22 Sep, 08:02', channel: 'Web' },
  { key: 'SO-4819', customer: 'Fabrikam', items: 27, total: 11240, status: 'held', priority: 'high', placed: '21 Sep, 17:48', channel: 'EDI' },
  { key: 'SO-4818', customer: 'Adventure Works', items: 6, total: 2140, status: 'shipped', priority: 'low', placed: '21 Sep, 14:20', channel: 'Phone' },
  { key: 'SO-4817', customer: 'Tailspin Toys', items: 1, total: 189, status: 'shipped', priority: 'normal', placed: '21 Sep, 11:05', channel: 'Web' },
  { key: 'SO-4816', customer: 'Wide World Importers', items: 9, total: 3675, status: 'packing', priority: 'normal', placed: '20 Sep, 16:31', channel: 'EDI' },
  { key: 'SO-4815', customer: 'Lucerne Publishing', items: 2, total: 640, status: 'new', priority: 'low', placed: '20 Sep, 10:12', channel: 'Web' },
];

const VIEWS = [
  { key: 'all', label: 'All open' },
  { key: 'new', label: 'Needs picking' },
  { key: 'held', label: 'On hold' },
  { key: 'shipped', label: 'Shipped today' },
];

const money = (n) => `$${n.toLocaleString('en-US')}`;

export default function OrderInbox() {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const [view, setView] = useState('all');
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState();
  const [selected, setSelected] = useState([]);
  const [detail, setDetail] = useState(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ORDERS.filter((o) => {
      if (view === 'new' && o.status !== 'new') return false;
      if (view === 'held' && o.status !== 'held') return false;
      if (view === 'shipped' && o.status !== 'shipped') return false;
      if (channel && o.channel !== channel) return false;
      if (!q) return true;
      return o.key.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    });
  }, [view, query, channel]);

  const columns = [
    {
      title: 'Order',
      dataIndex: 'key',
      width: 120,
      render: (id, row) => (
        <Space size={6}>
          <Badge status={STATUS[row.status].badge} />
          <Typography.Text style={{ fontFamily: token.fontFamilyCode }}>{id}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: (name, row) => (
        <Space>
          <Avatar size="small" style={{ background: token.colorPrimaryBg, color: token.colorPrimary }}>
            {name[0]}
          </Avatar>
          <div>
            <Typography.Text>{name}</Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              {row.channel} · {row.placed}
            </Typography.Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      align: 'right',
      width: 80,
      responsive: ['md'],
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'right',
      width: 120,
      sorter: (a, b) => a.total - b.total,
      render: money,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      width: 100,
      responsive: ['lg'],
      render: (p) => <Tag color={PRIORITY[p].color}>{PRIORITY[p].label}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 110,
      render: (s) => <Tag color={STATUS[s].color}>{STATUS[s].label}</Tag>,
    },
    {
      title: '',
      key: 'actions',
      width: 56,
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: 'pick', label: 'Start picking' },
              { key: 'hold', label: 'Put on hold' },
              { type: 'divider' },
              { key: 'cancel', label: 'Cancel order', danger: true },
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<EllipsisOutlined />} onClick={(e) => e.stopPropagation()} />
        </Dropdown>
      ),
    },
  ];

  return (
    <PrototypeFrame id="order-inbox">
      <Flex align="flex-start" justify="space-between" gap={token.margin} wrap style={{ marginBottom: token.marginLG }}>
        <div>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Orders
          </Typography.Title>
          <Typography.Text type="secondary">
            {ORDERS.filter((o) => o.status !== 'shipped').length} open · 2 need attention
          </Typography.Text>
        </div>
        <Space wrap>
          <Tooltip title="Refresh">
            <Button icon={<ReloadOutlined />} />
          </Tooltip>
          <Button type="primary">New order</Button>
        </Space>
      </Flex>

      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: token.margin }}
        message="SO-4819 is on hold"
        description="The billing address failed verification. Release the hold or contact the customer."
        action={<Button size="small">Review</Button>}
        closable
      />

      <Card variant="outlined" styles={{ body: { padding: 0 } }}>
        <div style={{ padding: token.padding }}>
          <Flex align="center" justify="space-between" gap={token.marginSM} wrap>
            <Space size={token.marginSM} wrap>
              <Select
                value={view}
                onChange={setView}
                style={{ width: 170 }}
                options={VIEWS.map((v) => ({ value: v.key, label: v.label }))}
              />
              <Input
                allowClear
                prefix={<SearchOutlined style={{ color: token.colorTextQuaternary }} />}
                placeholder="Order or customer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: 220 }}
              />
              <Select
                allowClear
                placeholder="Channel"
                value={channel}
                onChange={setChannel}
                style={{ width: 130 }}
                options={['Web', 'EDI', 'Phone'].map((c) => ({ value: c, label: c }))}
              />
              <Button icon={<FilterOutlined />}>More filters</Button>
            </Space>
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
              {rows.length} of {ORDERS.length}
            </Typography.Text>
          </Flex>
        </div>

        {selected.length > 0 && (
          <Flex
            align="center"
            justify="space-between"
            wrap
            gap={token.marginSM}
            style={{
              padding: `${token.paddingSM}px ${token.padding}px`,
              background: token.colorPrimaryBg,
              borderBlock: `1px solid ${token.colorPrimaryBorder}`,
            }}
          >
            <Typography.Text strong>{selected.length} selected</Typography.Text>
            <Space wrap>
              <Button
                size="small"
                icon={<CheckOutlined />}
                onClick={() => {
                  message.success(`${selected.length} orders marked as picking`);
                  setSelected([]);
                }}
              >
                Mark as picking
              </Button>
              <Button size="small">Print labels</Button>
              <Popconfirm
                title={`Cancel ${selected.length} orders?`}
                description="Customers will be notified by email."
                okText="Cancel orders"
                okButtonProps={{ danger: true }}
                cancelText="Keep"
                onConfirm={() => {
                  message.success('Orders cancelled');
                  setSelected([]);
                }}
              >
                <Button size="small" danger icon={<DeleteOutlined />}>
                  Cancel
                </Button>
              </Popconfirm>
              <Button size="small" type="text" onClick={() => setSelected([])}>
                Clear
              </Button>
            </Space>
          </Flex>
        )}

        <Table
          columns={columns}
          dataSource={rows}
          size="middle"
          rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
          onRow={(record) => ({ onClick: () => setDetail(record), style: { cursor: 'pointer' } })}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No orders match those filters">
                <Button
                  onClick={() => {
                    setView('all');
                    setQuery('');
                    setChannel(undefined);
                  }}
                >
                  Clear filters
                </Button>
              </Empty>
            ),
          }}
        />
      </Card>

      <Drawer
        width={480}
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail?.key}
        extra={
          <Space>
            <Button>Put on hold</Button>
            <Button type="primary">Start picking</Button>
          </Space>
        }
      >
        {detail && (
          <>
            <Flex align="center" gap={token.margin}>
              <Avatar size={44} style={{ background: token.colorPrimary }}>
                {detail.customer[0]}
              </Avatar>
              <div>
                <Typography.Text strong style={{ fontSize: token.fontSizeLG }}>
                  {detail.customer}
                </Typography.Text>
                <br />
                <Space size={token.marginXS}>
                  <Tag color={STATUS[detail.status].color}>{STATUS[detail.status].label}</Tag>
                  <Tag color={PRIORITY[detail.priority].color}>
                    {PRIORITY[detail.priority].label} priority
                  </Tag>
                </Space>
              </div>
            </Flex>

            <Divider />

            <Descriptions
              column={1}
              size="small"
              items={[
                { key: '1', label: 'Placed', children: detail.placed },
                { key: '2', label: 'Channel', children: detail.channel },
                { key: '3', label: 'Line items', children: detail.items },
                { key: '4', label: 'Order total', children: money(detail.total) },
                { key: '5', label: 'Ship to', children: '14 Harbour Rd, Singapore 099253' },
              ]}
            />

            <Divider />

            <Typography.Title level={5}>Fulfilment</Typography.Title>
            <Steps
              size="small"
              direction="vertical"
              current={detail.status === 'shipped' ? 3 : detail.status === 'packing' ? 2 : 1}
              items={[
                { title: 'Received', description: detail.placed },
                { title: 'Payment cleared' },
                { title: 'Picking' },
                { title: 'Shipped' },
              ]}
            />

            <Divider />

            <Typography.Title level={5}>Activity</Typography.Title>
            <Timeline
              items={[
                { color: 'blue', children: `Order created via ${detail.channel}` },
                { children: 'Payment authorised — $' + detail.total.toLocaleString('en-US') },
                { color: 'gray', children: 'Awaiting warehouse assignment' },
              ]}
            />
          </>
        )}
      </Drawer>
    </PrototypeFrame>
  );
}
