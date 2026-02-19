"use client";

import { motion } from "framer-motion";

interface ExperienceBridgeProps {
  title: string;
  description: string;
  className?: string;
}

export function ExperienceBridge({
  title,
  description,
  className = "",
}: ExperienceBridgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`border-l-4 border-disney-violet bg-card-bg rounded-r-lg p-4 ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-disney-violet">
        Mon exp&eacute;rience
      </span>
      <p className="mt-1 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}
