"use client";

import { motion } from "framer-motion";

interface ChecklistItem {
  label: string;
  description: string;
  checked: boolean;
}

interface ChateauProps {
  demoData: {
    title: string;
    items: ChecklistItem[];
  };
  color: string;
}

export function Chateau({ demoData, color }: ChateauProps) {
  const checkedCount = demoData.items.filter((item) => item.checked).length;
  const total = demoData.items.length;
  const progressPercent = (checkedCount / total) * 100;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted">{demoData.title}</h4>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">
            {checkedCount}/{total} controles conformes
          </span>
          <span className="font-mono" style={{ color }}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-card-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {demoData.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="flex items-start gap-3 rounded-lg border border-card-border bg-card-bg/50 p-3"
          >
            {/* Check / Cross */}
            <span
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-bold"
              style={{
                backgroundColor: item.checked ? "#22c55e22" : "#ef444422",
                color: item.checked ? "#22c55e" : "#ef4444",
              }}
            >
              {item.checked ? "\u2713" : "\u2717"}
            </span>

            <div className="min-w-0">
              <p
                className="text-sm font-medium"
                style={{ color: item.checked ? "#f8fafc" : "#94a3b8" }}
              >
                {item.label}
              </p>
              <p className="mt-0.5 text-xs text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
