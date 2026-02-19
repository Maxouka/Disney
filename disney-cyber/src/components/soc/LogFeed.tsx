"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogStream } from "@/lib/hooks/useLogStream";
import type { LogEntry } from "@/lib/data/logs";
import { ExperienceBridge } from "./ExperienceBridge";

const severities = ["ALL", "INFO", "WARNING", "ERROR", "CRITICAL"] as const;

const severityColor: Record<LogEntry["severity"], string> = {
  INFO: "bg-cyber-green/20 text-cyber-green",
  WARNING: "bg-cyber-yellow/20 text-cyber-yellow",
  ERROR: "bg-cyber-orange/20 text-cyber-orange",
  CRITICAL: "bg-cyber-red/20 text-cyber-red",
};

const severityDot: Record<LogEntry["severity"], string> = {
  INFO: "bg-cyber-green",
  WARNING: "bg-cyber-yellow",
  ERROR: "bg-cyber-orange",
  CRITICAL: "bg-cyber-red",
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function LogFeed() {
  const logs = useLogStream(2000, 50);
  const [filter, setFilter] = useState<string>("ALL");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "ALL" ? logs : logs.filter((l) => l.severity === filter);

  // Auto-scroll to top on new logs when already at top
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs.length]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-cyber-green animate-pulse" />
          <h2 className="text-lg font-semibold">Live Log Feed</h2>
          <span className="text-xs text-muted font-mono">
            {logs.length} entr&eacute;es
          </span>
        </div>
      </div>

      {/* Severity filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {severities.map((sev) => (
          <button
            key={sev}
            onClick={() => setFilter(sev)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === sev
                ? sev === "ALL"
                  ? "bg-disney-violet/20 text-disney-violet"
                  : severityColor[sev as LogEntry["severity"]]
                : "bg-card-border/30 text-muted hover:text-foreground"
            }`}
          >
            {sev}
            {sev !== "ALL" && (
              <span className="ml-1 opacity-60">
                ({logs.filter((l) => l.severity === sev).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Log list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-lg border border-card-border bg-background/50 min-h-0"
      >
        <AnimatePresence initial={false}>
          {filtered.map((log) => (
            <motion.div
              key={log.id + log.timestamp}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3 px-3 py-2 border-b border-card-border/50 hover:bg-card-border/20 transition-colors"
            >
              {/* Severity dot */}
              <div className="mt-1.5 shrink-0">
                <div
                  className={`h-2 w-2 rounded-full ${severityDot[log.severity]}`}
                />
              </div>

              {/* Timestamp */}
              <span className="shrink-0 text-xs font-mono text-muted w-20">
                {formatTime(log.timestamp)}
              </span>

              {/* Source badge */}
              <span className="shrink-0 text-xs font-medium bg-disney-violet/10 text-disney-purple px-2 py-0.5 rounded">
                {log.source}
              </span>

              {/* Severity badge */}
              <span
                className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${severityColor[log.severity]}`}
              >
                {log.severity}
              </span>

              {/* Message */}
              <span className="text-xs text-foreground/80 leading-relaxed">
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-muted">
            Aucun log pour ce filtre
          </div>
        )}
      </div>

      {/* Experience bridge */}
      <ExperienceBridge
        title="Analyse de logs SIEM"
        description="Chez Harvest, j'analysais quotidiennement les logs via Rapid7 InsightIDR sur un parc de 1000+ machines. Le processus de collecte, corrélation et investigation est identique quel que soit le SIEM."
      />
    </div>
  );
}
