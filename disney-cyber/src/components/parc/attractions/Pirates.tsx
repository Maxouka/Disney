"use client";

import { motion } from "framer-motion";

interface Step {
  label: string;
  detail: string;
  duration: string;
}

interface PiratesProps {
  demoData: {
    title: string;
    steps: Step[];
  };
  color: string;
}

export function Pirates({ demoData, color }: PiratesProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-muted mb-4">{demoData.title}</h4>
      <div className="relative ml-4">
        {/* Vertical line - red/orange for crisis */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-0.5"
          style={{ backgroundColor: `${color}44` }}
        />

        {demoData.steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {/* Dot - pulsing red for urgency */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 + 0.1, type: "spring", stiffness: 300 }}
              className="relative z-10 mt-1.5 h-4 w-4 flex-shrink-0 rounded-full border-2"
              style={{ borderColor: color, backgroundColor: `${color}33` }}
            >
              {i === 3 && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: `${color}22` }}
                />
              )}
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold" style={{ color }}>
                  {step.label}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-mono font-bold"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  {step.duration}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
