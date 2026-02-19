"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceBridge } from "./ExperienceBridge";
import { IconBell, IconSearch, IconScale, IconLightning, IconMegaphone, IconClipboard } from "@/components/shared/Icons";

interface PlaybookNode {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  detail: string;
}

const nodes: PlaybookNode[] = [
  {
    id: "detect",
    title: "Alerte Détectée",
    icon: <IconBell size={20} />,
    color: "#ef4444",
    description:
      "Le SIEM détecte un événement de sécurité correspondant à une règle de corrélation ou un seuil d'anomalie.",
    detail:
      "Sources : InsightIDR, Suricata IDS, PRTG, Tanium. Les alertes sont normalisées au format CEF et enrichies avec les données du CMDB avant injection dans le pipeline SOAR.",
  },
  {
    id: "enrich",
    title: "Enrichissement CTI",
    icon: <IconSearch size={20} />,
    color: "#3b82f6",
    description:
      "Enrichissement automatique de l'alerte avec les données de Threat Intelligence : réputation IP, hash, domaines, IoC.",
    detail:
      "APIs interrogées : VirusTotal, AbuseIPDB, MISP interne, base ANSSI. Corrélation avec les IoC des 90 derniers jours. Ajout automatique des tags MITRE ATT&CK.",
  },
  {
    id: "assess",
    title: "Évaluation Sévérité",
    icon: <IconScale size={20} />,
    color: "#f59e0b",
    description:
      "Calcul automatique du score de sévérité basé sur la criticité de l'asset, le contexte CTI et l'impact potentiel.",
    detail:
      "Matrice de scoring : Asset criticality (1-5) × Threat level (1-5) × Exposure factor. Seuils : ≥6 = LOW, ≥12 = MEDIUM, ≥18 = HIGH, ≥22 = CRITICAL. Escalade automatique CRITICAL vers l'astreinte.",
  },
  {
    id: "action",
    title: "Action Automatique",
    icon: <IconLightning size={20} />,
    color: "#22c55e",
    description:
      "Exécution des actions de remédiation automatisées selon le playbook associé au type d'alerte.",
    detail:
      "Actions disponibles : isolation EDR, blocage IP firewall, désactivation compte AD, quarantaine email, snapshot VM. Chaque action est logée avec horodatage et réversibilité garantie.",
  },
  {
    id: "notify",
    title: "Notification Équipe",
    icon: <IconMegaphone size={20} />,
    color: "#a855f7",
    description:
      "Notification multi-canal de l'équipe SOC et des parties prenantes concernées selon la matrice d'escalade.",
    detail:
      "Canaux : Slack #soc-alerts, email équipe sécurité, SMS astreinte (CRITICAL uniquement). Ticket ITSM créé automatiquement avec toutes les données enrichies. SLA notification : < 5 min.",
  },
  {
    id: "document",
    title: "Documentation",
    icon: <IconClipboard size={20} />,
    color: "#06b6d4",
    description:
      "Documentation automatique de l'incident : timeline, actions prises, IoC collectés, recommandations.",
    detail:
      "Génération automatique du rapport d'incident au format ISO 27035. Archivage des preuves numériques (PCAP, logs, screenshots). Intégration dans la base de connaissances pour amélioration continue des playbooks.",
  },
];

export function SOARPlaybook() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-lg font-semibold">SOAR Playbook</h2>
      <p className="text-sm text-muted">
        Processus automatis&eacute; de r&eacute;ponse aux incidents &mdash;
        cliquez sur un n&oelig;ud pour voir les d&eacute;tails.
      </p>

      {/* Flowchart */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col items-center py-4">
        {nodes.map((node, idx) => (
          <div key={node.id} className="flex flex-col items-center w-full max-w-lg">
            {/* Connecting line from previous node */}
            {idx > 0 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: idx * 0.15 - 0.1, duration: 0.3 }}
                className="w-px h-8 origin-top"
                style={{ backgroundColor: nodes[idx - 1].color, opacity: 0.4 }}
              />
            )}

            {/* Node */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.4 }}
              onClick={() =>
                setExpandedNode(expandedNode === node.id ? null : node.id)
              }
              className="w-full rounded-xl border border-card-border bg-card-bg p-4 text-left transition-all hover:border-opacity-60 group"
              style={{
                borderColor:
                  expandedNode === node.id ? node.color : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                {/* Step number circle */}
                <div
                  className="flex items-center justify-center h-10 w-10 rounded-full shrink-0 text-lg"
                  style={{
                    backgroundColor: `${node.color}20`,
                  }}
                >
                  {node.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: node.color }}
                    >
                      &Eacute;tape {idx + 1}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mt-0.5">{node.title}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* Expand indicator */}
                <motion.span
                  animate={{ rotate: expandedNode === node.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted text-sm shrink-0"
                >
                  &#9660;
                </motion.span>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {expandedNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-card-border/50">
                      <p className="text-xs text-foreground/70 leading-relaxed font-mono">
                        {node.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        ))}
      </div>

      {/* Experience bridge */}
      <ExperienceBridge
        title="Automatisation SOAR"
        description="Automatisation à grande échelle : packages Tanium/PowerShell pour BitLocker, playbooks Ansible pour PRTG, scripts AD sur 3 domaines."
      />
    </div>
  );
}
