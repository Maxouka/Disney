"use client";

import { motion } from "framer-motion";

interface PlaybookStep {
  task: string;
  status: "ok" | "running" | "pending";
}

interface Playbook {
  name: string;
  description: string;
  steps: PlaybookStep[];
}

interface BuzzLightyearProps {
  demoData: {
    title: string;
    playbooks: Playbook[];
  };
  color: string;
}

const statusConfig = {
  ok: {
    bg: "#22c55e22",
    color: "#22c55e",
    label: "OK",
  },
  running: {
    bg: "#f59e0b22",
    color: "#f59e0b",
    label: "EN COURS",
  },
  pending: {
    bg: "#94a3b822",
    color: "#94a3b8",
    label: "EN ATTENTE",
  },
};

export function BuzzLightyear({ demoData, color }: BuzzLightyearProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted">{demoData.title}</h4>

      <div className="space-y-4">
        {demoData.playbooks.map((playbook, pi) => (
          <motion.div
            key={pi}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.15, duration: 0.4 }}
            className="rounded-lg border border-card-border bg-card-bg/50 overflow-hidden"
          >
            {/* Playbook header */}
            <div className="border-b border-card-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color }}>
                  $
                </span>
                <span className="text-sm font-mono font-semibold text-foreground">
                  {playbook.name}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted">{playbook.description}</p>
            </div>

            {/* Steps pipeline */}
            <div className="p-3 space-y-1.5">
              {playbook.steps.map((step, si) => {
                const cfg = statusConfig[step.status];
                return (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: pi * 0.15 + si * 0.06, duration: 0.3 }}
                    className="flex items-center justify-between gap-2 rounded px-2.5 py-1.5"
                    style={{ backgroundColor: `${cfg.bg}` }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Connector dot */}
                      <span
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span className="text-xs text-foreground/80 truncate">
                        {step.task}
                      </span>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        step.status === "running" ? "animate-pulse" : ""
                      }`}
                      style={{
                        backgroundColor: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.color}44`,
                      }}
                    >
                      {cfg.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
