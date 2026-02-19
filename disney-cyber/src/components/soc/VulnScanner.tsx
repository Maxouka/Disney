"use client";

import { motion } from "framer-motion";
import {
  vulnerabilities,
  riskScore,
  type Vulnerability,
} from "@/lib/data/vulnerabilities";
import { ExperienceBridge } from "./ExperienceBridge";

const severityColor: Record<Vulnerability["severity"], string> = {
  LOW: "bg-cyber-green/20 text-cyber-green",
  MEDIUM: "bg-cyber-yellow/20 text-cyber-yellow",
  HIGH: "bg-cyber-orange/20 text-cyber-orange",
  CRITICAL: "bg-cyber-red/20 text-cyber-red",
};

const statusColor: Record<Vulnerability["status"], string> = {
  open: "bg-cyber-red/20 text-cyber-red",
  in_progress: "bg-cyber-yellow/20 text-cyber-yellow",
  remediated: "bg-cyber-green/20 text-cyber-green",
};

const statusLabel: Record<Vulnerability["status"], string> = {
  open: "Ouvert",
  in_progress: "En cours",
  remediated: "Remédié",
};

function RiskScoreCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75
      ? "text-cyber-red"
      : score >= 50
        ? "text-cyber-orange"
        : score >= 25
          ? "text-cyber-yellow"
          : "text-cyber-green";
  const strokeColor =
    score >= 75
      ? "#ef4444"
      : score >= 50
        ? "#f97316"
        : score >= 25
          ? "#f59e0b"
          : "#22c55e";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-card-border"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`text-2xl font-bold font-mono ${color}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-muted uppercase tracking-wider">
          Risque
        </span>
      </div>
    </div>
  );
}

export function VulnScanner() {
  const totalVulns = vulnerabilities.length;
  const criticalCount = vulnerabilities.filter(
    (v) => v.severity === "CRITICAL"
  ).length;
  const remediatedCount = vulnerabilities.filter(
    (v) => v.status === "remediated"
  ).length;
  const openCount = vulnerabilities.filter((v) => v.status === "open").length;

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-lg font-semibold">
        Scanner de vuln&eacute;rabilit&eacute;s
      </h2>

      {/* Top stats */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Risk score circle */}
        <RiskScoreCircle score={riskScore} />

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          <StatCard label="Total" value={totalVulns} color="text-foreground" />
          <StatCard
            label="Critiques"
            value={criticalCount}
            color="text-cyber-red"
          />
          <StatCard
            label="Ouvertes"
            value={openCount}
            color="text-cyber-orange"
          />
          <StatCard
            label="Remédiées"
            value={remediatedCount}
            color="text-cyber-green"
          />
        </div>
      </div>

      {/* Vulnerability table */}
      <div className="flex-1 overflow-auto min-h-0 rounded-lg border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-card-bg sticky top-0 z-10">
            <tr className="text-left text-xs text-muted uppercase tracking-wider">
              <th className="px-3 py-2.5">CVE</th>
              <th className="px-3 py-2.5">Titre</th>
              <th className="px-3 py-2.5 hidden lg:table-cell">Asset</th>
              <th className="px-3 py-2.5">S&eacute;v&eacute;rit&eacute;</th>
              <th className="px-3 py-2.5">CVSS</th>
              <th className="px-3 py-2.5">Statut</th>
            </tr>
          </thead>
          <tbody>
            {vulnerabilities.map((vuln, idx) => (
              <motion.tr
                key={vuln.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="border-t border-card-border/50 hover:bg-card-border/20 transition-colors"
              >
                <td className="px-3 py-2.5 font-mono text-xs text-disney-blue">
                  {vuln.cve}
                </td>
                <td className="px-3 py-2.5 text-xs font-medium max-w-[200px] truncate">
                  {vuln.title}
                </td>
                <td className="px-3 py-2.5 text-xs text-muted hidden lg:table-cell max-w-[200px] truncate">
                  {vuln.asset}
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${severityColor[vuln.severity]}`}
                  >
                    {vuln.severity}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs">
                  <span
                    className={
                      vuln.cvss >= 9
                        ? "text-cyber-red"
                        : vuln.cvss >= 7
                          ? "text-cyber-orange"
                          : vuln.cvss >= 4
                            ? "text-cyber-yellow"
                            : "text-cyber-green"
                    }
                  >
                    {vuln.cvss.toFixed(1)}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${statusColor[vuln.status]}`}
                  >
                    {statusLabel[vuln.status]}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Experience bridge */}
      <ExperienceBridge
        title="Gestion des vulnérabilités"
        description="Gestion des vulnérabilités sur 1000+ VMs via Tanium : suivi CVE/ANSSI, patch management WSUS, désactivation SMBv1. Le processus scan → priorisation → remédiation est universel."
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-lg border border-card-border bg-card-bg p-3"
    >
      <span className="text-xs text-muted">{label}</span>
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
    </motion.div>
  );
}
