"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alerts, type Alert, type AlertStep } from "@/lib/data/alerts";
import { ExperienceBridge } from "./ExperienceBridge";
import { IconBell, IconTarget, IconMicroscope, IconContain, IconWrench, IconClipboard } from "@/components/shared/Icons";

const severityColor: Record<Alert["severity"], string> = {
  LOW: "bg-cyber-green/20 text-cyber-green",
  MEDIUM: "bg-cyber-yellow/20 text-cyber-yellow",
  HIGH: "bg-cyber-orange/20 text-cyber-orange",
  CRITICAL: "bg-cyber-red/20 text-cyber-red",
};

const severityDot: Record<Alert["severity"], string> = {
  LOW: "bg-cyber-green",
  MEDIUM: "bg-cyber-yellow",
  HIGH: "bg-cyber-orange",
  CRITICAL: "bg-cyber-red",
};

const phaseIcon: Record<AlertStep["phase"], React.ReactNode> = {
  Detection: <IconBell size={16} />,
  Triage: <IconTarget size={16} />,
  Analyse: <IconMicroscope size={16} />,
  Containment: <IconContain size={16} />,
  Remediation: <IconWrench size={16} />,
  "Post-mortem": <IconClipboard size={16} />,
};

export function AlertInvestigation() {
  const [selectedAlert, setSelectedAlert] = useState<Alert>(alerts[0]);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-lg font-semibold">Investigation d&apos;alertes</h2>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Alert list (left) */}
        <div className="lg:w-80 shrink-0 flex flex-col gap-2 overflow-y-auto">
          {alerts.map((alert) => (
            <motion.button
              key={alert.id}
              onClick={() => {
                setSelectedAlert(alert);
                setExpandedStep(null);
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                selectedAlert.id === alert.id
                  ? "border-disney-violet bg-disney-violet/10"
                  : "border-card-border bg-card-bg hover:border-card-border/80"
              }`}
            >
              <div className="mt-1 shrink-0">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${severityDot[alert.severity]}`}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${severityColor[alert.severity]}`}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    {alert.id}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground leading-snug truncate">
                  {alert.title}
                </p>
                <p className="text-xs text-muted mt-0.5">{alert.source}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Alert detail + timeline (right) */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAlert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Alert header */}
              <div className="rounded-lg border border-card-border bg-card-bg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${severityColor[selectedAlert.severity]}`}
                  >
                    {selectedAlert.severity}
                  </span>
                  <span className="text-xs text-muted font-mono">
                    {selectedAlert.id}
                  </span>
                  <span className="text-xs text-muted">&mdash;</span>
                  <span className="text-xs text-disney-purple">
                    {selectedAlert.source}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {selectedAlert.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {selectedAlert.description}
                </p>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-card-border" />

                {selectedAlert.timeline.map((step, idx) => (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="relative mb-3"
                  >
                    {/* Dot on the line */}
                    <div className="absolute -left-6 top-3 h-[9px] w-[9px] rounded-full border-2 border-disney-violet bg-background z-10" />

                    <button
                      onClick={() =>
                        setExpandedStep(expandedStep === idx ? null : idx)
                      }
                      className="w-full rounded-lg border border-card-border bg-card-bg p-3 text-left hover:border-disney-violet/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>
                            {phaseIcon[step.phase]}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-disney-purple">
                            {step.phase}
                          </span>
                          <span className="text-xs text-muted">&mdash;</span>
                          <span className="text-sm font-medium">
                            {step.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-muted bg-card-border/50 px-2 py-0.5 rounded">
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-xs text-muted mt-1.5 leading-relaxed">
                        {step.description}
                      </p>

                      <AnimatePresence>
                        {expandedStep === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pt-3 border-t border-card-border/50">
                              <p className="text-xs text-foreground/70 leading-relaxed font-mono">
                                {step.detail}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Experience bridge */}
      <ExperienceBridge
        title="Investigation d'alertes EDR/SIEM"
        description="Investigation d'alertes quotidiennes via InsightIDR corrélées avec l'EDR Cybereason. Le processus d'investigation est le même sur tout EDR/XDR."
      />
    </div>
  );
}
