"use client";

import { useState } from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { GlitchText } from "@/components/shared/GlitchText";
import { IconShieldRadar } from "@/components/shared/Icons";
import { SocSidebar } from "@/components/soc/SocSidebar";
import { LogFeed } from "@/components/soc/LogFeed";
import { AlertInvestigation } from "@/components/soc/AlertInvestigation";
import { VulnScanner } from "@/components/soc/VulnScanner";
import { MonitoringDashboard } from "@/components/soc/MonitoringDashboard";
import { SOARPlaybook } from "@/components/soc/SOARPlaybook";

const panelComponents: Record<string, React.ComponentType> = {
  logs: LogFeed,
  investigation: AlertInvestigation,
  vulnerabilities: VulnScanner,
  monitoring: MonitoringDashboard,
  soar: SOARPlaybook,
};

export default function SOCPage() {
  const [activePanel, setActivePanel] = useState("logs");

  const ActiveComponent = panelComponents[activePanel] ?? LogFeed;

  return (
    <PageTransition className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="shrink-0 border-b border-card-border bg-background/80 backdrop-blur-sm px-6 py-4">
        <GlitchText as="h1" className="text-xl md:text-2xl font-bold font-disney">
          <span className="inline-flex items-center gap-2">
            <IconShieldRadar size={24} className="text-cyber-green" />
            SOC Disney — Security Operations Center
          </span>
        </GlitchText>
        <p className="text-sm text-muted mt-1 font-mono">
          Supervision en temps r&eacute;el &middot; D&eacute;tection &middot;
          R&eacute;ponse &middot; Rem&eacute;diation
        </p>
      </header>

      {/* Main area: sidebar + content */}
      <div className="flex flex-1 min-h-0">
        <SocSidebar activePanel={activePanel} onSelect={setActivePanel} />

        <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
          <ActiveComponent />
        </main>
      </div>
    </PageTransition>
  );
}
