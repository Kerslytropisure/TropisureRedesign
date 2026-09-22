import { useMemo, useState } from 'react';
import { theme, Typography } from 'antd';
import { niceAxis, useChartSize } from './useChartSize';

const HEIGHT = 260;
const PAD = { top: 16, right: 72, bottom: 28, left: 56 };
const GRID_LINES = 4;

/**
 * Multi-series line chart on a single y-axis, with a crosshair + tooltip on
 * hover and a direct label at the end of each line so identity is never carried
 * by colour alone.
 */
export default function LineChart({ series, categories, formatValue = (v) => v, area = false }) {
  const { token } = theme.useToken();
  const [ref, width] = useChartSize();
  const [hover, setHover] = useState(null);

  const plotW = Math.max(40, width - PAD.left - PAD.right);
  const plotH = HEIGHT - PAD.top - PAD.bottom;

  const { max } = useMemo(
    () => niceAxis(Math.max(...series.flatMap((s) => s.data), 0), GRID_LINES),
    [series],
  );

  const x = (i) =>
    PAD.left + (categories.length === 1 ? plotW / 2 : (i * plotW) / (categories.length - 1));
  const y = (v) => PAD.top + plotH - (v / max) * plotH;

  const ticks = Array.from({ length: GRID_LINES + 1 }, (_, i) => (max / GRID_LINES) * i);

  // Show every label when they fit; otherwise thin them out evenly.
  const labelStep = Math.max(1, Math.ceil(categories.length / Math.floor(plotW / 56)));

  const handleMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    const pos = event.clientX - box.left - PAD.left;
    const index = Math.round((pos / plotW) * (categories.length - 1));
    setHover(Math.min(categories.length - 1, Math.max(0, index)));
  };

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <svg
        width="100%"
        height={HEIGHT}
        viewBox={`0 0 ${width} ${HEIGHT}`}
        role="img"
        aria-label={`Line chart: ${series.map((s) => s.name).join(', ')}`}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={PAD.left + plotW}
              y1={y(t)}
              y2={y(t)}
              stroke={token.colorSplit}
              strokeWidth={1}
            />
            <text
              x={PAD.left - 10}
              y={y(t) + 4}
              textAnchor="end"
              fill={token.colorTextTertiary}
              fontSize={11}
              fontFamily={token.fontFamily}
            >
              {formatValue(t)}
            </text>
          </g>
        ))}

        {categories.map((label, i) =>
          i % labelStep === 0 ? (
            <text
              key={label}
              x={x(i)}
              y={HEIGHT - 8}
              textAnchor="middle"
              fill={token.colorTextTertiary}
              fontSize={11}
              fontFamily={token.fontFamily}
            >
              {label}
            </text>
          ) : null,
        )}

        {hover !== null && (
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1={PAD.top}
            y2={PAD.top + plotH}
            stroke={token.colorTextQuaternary}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        )}

        {series.map((s) => {
          const line = s.data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ');
          return (
            <g key={s.key}>
              {area && (
                <path
                  d={`${line} L${x(s.data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`}
                  fill={s.color}
                  opacity={0.1}
                />
              )}
              <path
                d={line}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {series.length <= 4 && (
                <text
                  x={x(s.data.length - 1) + 10}
                  y={y(s.data.at(-1)) + 4}
                  fill={token.colorTextSecondary}
                  fontSize={11}
                  fontFamily={token.fontFamily}
                >
                  {s.name}
                </text>
              )}
              {hover !== null && (
                <circle
                  cx={x(hover)}
                  cy={y(s.data[hover])}
                  r={4.5}
                  fill={s.color}
                  stroke={token.colorBgContainer}
                  strokeWidth={2}
                />
              )}
            </g>
          );
        })}
      </svg>

      {hover !== null && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(Math.max(x(hover) + 12, 0), width - 170),
            top: PAD.top,
            pointerEvents: 'none',
            background: token.colorBgElevated,
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
            boxShadow: token.boxShadowSecondary,
            padding: `${token.paddingXS}px ${token.paddingSM}px`,
            minWidth: 150,
            zIndex: 2,
          }}
        >
          <Typography.Text strong style={{ fontSize: token.fontSizeSM }}>
            {categories[hover]}
          </Typography.Text>
          {series.map((s) => (
            <div
              key={s.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                marginTop: 4,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: s.color,
                    display: 'inline-block',
                  }}
                />
                <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                  {s.name}
                </Typography.Text>
              </span>
              <Typography.Text style={{ fontSize: token.fontSizeSM }}>
                {formatValue(s.data[hover])}
              </Typography.Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
