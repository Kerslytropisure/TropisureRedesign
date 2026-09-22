import { useState } from 'react';
import { theme, Typography } from 'antd';
import { niceMax } from './useChartSize';

/**
 * Horizontal ranked bars. Horizontal because the labels are words, not dates —
 * vertical bars would force the reader to tilt their head.
 *
 * Values are labelled directly, so the bar carries magnitude and the text
 * carries the number. Bars are anchored to a shared baseline with a 4px rounded
 * data-end.
 */
export default function BarChart({ data, formatValue = (v) => v, color, height = 26, gap = 10 }) {
  const { token } = theme.useToken();
  const [hover, setHover] = useState(null);
  const max = niceMax(Math.max(...data.map((d) => d.value), 0));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const fill = d.color ?? color ?? token.colorPrimary;
        return (
          <div
            key={d.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'default' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 4,
                gap: token.marginSM,
              }}
            >
              <Typography.Text
                style={{ fontSize: token.fontSizeSM }}
                type={hover === i ? undefined : 'secondary'}
              >
                {d.label}
              </Typography.Text>
              <Typography.Text style={{ fontSize: token.fontSizeSM, fontVariantNumeric: 'tabular-nums' }}>
                {formatValue(d.value)}
              </Typography.Text>
            </div>
            <div
              style={{
                height,
                background: token.colorFillQuaternary,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: fill,
                  borderRadius: 4,
                  opacity: hover === null || hover === i ? 1 : 0.55,
                  transition: `width ${token.motionDurationSlow} ${token.motionEaseOut}, opacity ${token.motionDurationFast}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
