"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PortalProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: "green" | "violet" | "blue";
  delay?: number;
}

const colorMap = {
  green: {
    border: "border-cyber-green/30",
    hoverBorder: "hover:border-cyber-green/60",
    glow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
    iconBg: "bg-cyber-green/10",
    iconText: "text-cyber-green",
    accent: "from-cyber-green/20",
  },
  violet: {
    border: "border-disney-violet/30",
    hoverBorder: "hover:border-disney-violet/60",
    glow: "hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]",
    iconBg: "bg-disney-violet/10",
    iconText: "text-disney-violet",
    accent: "from-disney-violet/20",
  },
  blue: {
    border: "border-disney-blue/30",
    hoverBorder: "hover:border-disney-blue/60",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    iconBg: "bg-disney-blue/10",
    iconText: "text-disney-blue",
    accent: "from-disney-blue/20",
  },
};

export function Portal({ href, icon, title, subtitle, color, delay = 0 }: PortalProps) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2 + delay }}
    >
      <Link href={href}>
        <motion.div
          className={`
            relative group cursor-pointer rounded-2xl border ${c.border} ${c.hoverBorder}
            bg-card-bg/80 backdrop-blur-sm p-6 md:p-8
            transition-all duration-300 ${c.glow}
            flex flex-col items-center gap-4 text-center
            min-w-[200px] max-w-[280px]
          `}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${c.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

          {/* Icon */}
          <div className={`relative z-10 w-16 h-16 rounded-xl ${c.iconBg} flex items-center justify-center ${c.iconText}`}>
            {icon}
          </div>

          {/* Text */}
          <div className="relative z-10">
            <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted leading-relaxed">{subtitle}</p>
          </div>

          {/* Shimmer overlay */}
          <div className="absolute inset-0 rounded-2xl magic-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Arrow indicator */}
          <div className={`relative z-10 font-mono text-xs ${c.iconText} opacity-0 group-hover:opacity-100 transition-opacity`}>
            {">"} Entrer
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
