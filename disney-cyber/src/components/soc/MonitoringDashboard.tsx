"use client";

import { motion } from "framer-motion";
import { metricSeries, kpis, type MetricSeries } from "@/lib/data/metrics";
import { ExperienceBridge } from "./ExperienceBridge";

const trendArrow: Record<string, { icon: string; color: string }> = {
  up: { icon: "\u2191", color: "" },
  down: { icon: "\u2193", color: "" },
  stable: { icon: "\u2192", color: "text-muted" },
};

function Sparkline({ series }: { series: MetricSeries }) {
  const { data, color, threshold } = series;
  const max = Math.max(...data, threshold ?? 0);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 240;
  const h = 60;
  const pad = 4;

  const points = data
    .map((val, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((val - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  // Threshold line position
  const thresholdY = threshold
    ? h - pad - ((threshold - min) / range) * (h - pad * 2)
    : null;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-16"
      preserveAspectRatio="none"
    >
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1={pad}
          y1={pad + ratio * (h - pad * 2)}
          x2={w - pad}
          y2={pad + ratio * (h - pad * 2)}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-card-border/50"
        />
      ))}

      {/* Threshold line */}
      {thresholdY !== null && (
        <line
          x1={pad}
          y1={thresholdY}
          x2={w - pad}
          y2={thresholdY}
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.5"
        />
      )}

      {/* Area fill */}
      <polygon
        points={`${pad},${h - pad} ${points} ${w - pad},${h - pad}`}
        fill={color}
        opacity="0.08"
      />

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Last point dot */}
      {data.length > 0 && (
        <circle
          cx={pad + ((data.length - 1) / (data.length - 1)) * (w - pad * 2)}
          cy={
            h -
            pad -
            ((data[data.length - 1] - min) / range) * (h - pad * 2)
          }
          r="2.5"
          fill={color}
        />
      )}
    </svg>
  );
}

export function MonitoringDashboard() {
  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-lg font-semibold">Monitoring & KPIs</h2>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi, idx) => {
          const trend = trendArrow[kpi.trend];
          // Good + up = green, Good + down = green, Bad + up = red, Bad + down = red
          const trendColor = kpi.good ? "text-cyber-green" : "text-cyber-red";

          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-lg border border-card-border bg-card-bg p-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted uppercase tracking-wider leading-tight">
                  {kpi.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold font-mono">{kpi.value}</span>
                <span
                  className={`text-sm font-bold ${
                    kpi.trend === "stable" ? trend.color : trendColor
                  }`}
                >
                  {trend.icon}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sparklines */}
      <div className="flex-1 overflow-y-auto min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {metricSeries.map((series, idx) => {
          const lastValue = series.data[series.data.length - 1];
          const isOverThreshold =
            series.threshold !== undefined && lastValue >= series.threshold;

          return (
            <motion.div
              key={series.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.06 }}
              className="rounded-lg border border-card-border bg-card-bg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground/80">
                  {series.label}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-bold font-mono"
                    style={{ color: series.color }}
                  >
                    {lastValue}
                    <span className="text-[10px] text-muted ml-0.5">
                      {series.unit}
                    </span>
                  </span>
                  {isOverThreshold && (
                    <span className="text-[10px] bg-cyber-red/20 text-cyber-red px-1.5 py-0.5 rounded font-bold">
                      SEUIL
                    </span>
                  )}
                </div>
              </div>

              <Sparkline series={series} />

              {series.threshold !== undefined && (
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-px w-3 bg-cyber-red/50 border-dashed" />
                  <span className="text-[9px] text-muted">
                    Seuil: {series.threshold}
                    {series.unit}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Experience bridge */}
      <ExperienceBridge
        title="Reporting KPI sécurité"
        description="Reporting KPI sécurité hebdomadaire présenté au COMEX. J'ai utilisé Grafana et PRTG pour le monitoring infrastructure."
      />
    </div>
  );
}
