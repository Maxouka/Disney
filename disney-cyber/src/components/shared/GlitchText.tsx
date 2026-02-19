"use client";

import type { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  glitchOnHover?: boolean;
}

export function GlitchText({
  children,
  className = "",
  as: Tag = "span",
  glitchOnHover = false,
}: GlitchTextProps) {
  return (
    <Tag
      data-text={typeof children === "string" ? children : undefined}
      className={`relative inline-block ${
        glitchOnHover ? "hover:glitch-color" : "glitch-color"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
