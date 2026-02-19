"use client";

import { useMemo } from "react";

interface SparkleEffectProps {
  count?: number;
  color?: string;
  className?: string;
}

interface Sparkle {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

export function SparkleEffect({
  count = 20,
  color = "#a855f7",
  className = "",
}: SparkleEffectProps) {
  const sparkles: Sparkle[] = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${(i * 37.7 + 13) % 100}%`,
        left: `${(i * 53.1 + 7) % 100}%`,
        size: 1 + (i % 3) + 0.5,
        delay: `${(i * 0.6) % 3}s`,
        duration: `${1.5 + (i % 4) * 0.5}s`,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {sparkles.map(({ id, top, left, size, delay, duration }) => (
        <span
          key={id}
          className="sparkle-anim absolute rounded-full"
          style={{
            top,
            left,
            width: size,
            height: size,
            backgroundColor: color,
            animationDelay: delay,
            animationDuration: duration,
          }}
        />
      ))}
    </div>
  );
}
