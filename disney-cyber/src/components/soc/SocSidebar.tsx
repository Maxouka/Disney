"use client";

import { motion } from "framer-motion";
import { IconLogStream, IconInvestigate, IconShieldVuln, IconChartPulse, IconLightning } from "@/components/shared/Icons";

const panels: { id: string; icon: React.ReactNode; label: string }[] = [
  { id: "logs", icon: <IconLogStream size={18} />, label: "Logs" },
  { id: "investigation", icon: <IconInvestigate size={18} />, label: "Investigation" },
  { id: "vulnerabilities", icon: <IconShieldVuln size={18} />, label: "Vuln\u00e9rabilit\u00e9s" },
  { id: "monitoring", icon: <IconChartPulse size={18} />, label: "Monitoring" },
  { id: "soar", icon: <IconLightning size={18} />, label: "SOAR" },
];

interface SocSidebarProps {
  activePanel: string;
  onSelect: (panel: string) => void;
}

export function SocSidebar({ activePanel, onSelect }: SocSidebarProps) {
  return (
    <aside className="flex flex-col w-16 md:w-52 shrink-0 bg-sidebar-bg border-r border-card-border">
      <div className="p-3 md:px-4 md:py-5">
        <span className="hidden md:block text-xs font-semibold uppercase tracking-wider text-muted">
          Panels
        </span>
      </div>

      <nav className="flex flex-col gap-1 px-2">
        {panels.map((panel) => {
          const isActive = activePanel === panel.id;
          return (
            <motion.button
              key={panel.id}
              onClick={() => onSelect(panel.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                isActive
                  ? "bg-cyber-green/10 text-foreground"
                  : "text-muted hover:bg-card-border/30 hover:text-foreground"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-cyber-green"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <span className="leading-none">{panel.icon}</span>
              <span className="hidden md:inline font-medium">{panel.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
