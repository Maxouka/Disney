"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconShieldVuln, IconMonitor, IconLock, IconClock } from "@/components/shared/Icons";

const counterIconMap: Record<string, React.ReactNode> = {
  monitor: <IconMonitor size={22} />,
  shield: <IconShieldVuln size={22} />,
  lock: <IconLock size={22} />,
  clock: <IconClock size={22} />,
};

interface Counter {
  label: string;
  target: number;
  unit: string;
  icon: string;
}

interface HyperspaceProps {
  demoData: {
    title: string;
    counters: Counter[];
  };
  color: string;
}

function AnimatedCounter({ counter, delay }: { counter: Counter; delay: number }) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const duration = 2000; // ms

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * counter.target));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [counter.target, delay]);

  const progressPercent = (value / counter.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4 }}
      className="rounded-lg border border-card-border bg-card-bg/50 p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl text-cyan-400">{counterIconMap[counter.icon] || counter.icon}</span>
        <span className="text-xs text-muted leading-tight">{counter.label}</span>
      </div>
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-2xl font-bold font-mono text-foreground">
          {value.toLocaleString("fr-FR")}
        </span>
        <span className="text-sm text-muted">{counter.unit}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-card-border">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: "#06B6D4",
          }}
        />
      </div>
    </motion.div>
  );
}

export function Hyperspace({ demoData }: HyperspaceProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted">{demoData.title}</h4>
      <div className="grid grid-cols-2 gap-3">
        {demoData.counters.map((counter, i) => (
          <AnimatedCounter key={i} counter={counter} delay={i * 200} />
        ))}
      </div>
    </div>
  );
}
