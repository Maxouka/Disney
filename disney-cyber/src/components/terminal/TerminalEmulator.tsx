"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTerminal } from "@/lib/hooks/useTerminal";
import type { TerminalLine } from "@/lib/hooks/useTerminal";

function getLineColor(line: TerminalLine): string {
  // Explicit color property takes priority
  if (line.color) {
    const colorMap: Record<string, string> = {
      "cyber-green": "text-cyber-green",
      "cyber-red": "text-cyber-red",
      "cyber-yellow": "text-cyber-yellow",
      "disney-purple": "text-disney-purple",
      "disney-violet": "text-disney-violet",
      "disney-blue": "text-disney-blue",
      muted: "text-muted",
    };
    return colorMap[line.color] || "text-foreground";
  }

  // Fallback to type-based colors
  switch (line.type) {
    case "input":
      return "text-cyber-green";
    case "error":
      return "text-cyber-red";
    case "system":
      return "text-disney-purple";
    default:
      return "text-foreground";
  }
}

/**
 * Animated terminal background — subtle scan lines + hex grid pulse
 */
function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    const draw = () => {
      frame++;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Subtle grid lines
      ctx.strokeStyle = "rgba(34, 197, 94, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Moving scan line
      const scanY = (frame * 1.2) % (H + 60) - 30;
      const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      gradient.addColorStop(0, "rgba(34, 197, 94, 0)");
      gradient.addColorStop(0.5, "rgba(34, 197, 94, 0.04)");
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, W, 60);

      // Floating hex values (very subtle)
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(34, 197, 94, 0.025)";
      const hexChars = "0123456789ABCDEF";
      for (let i = 0; i < 6; i++) {
        const hx = ((frame * 0.3 + i * 170) % (W + 200)) - 100;
        const hy = ((i * 137 + 50) % H);
        let hex = "";
        for (let j = 0; j < 8; j++) {
          hex += hexChars[Math.floor(((frame * 0.1 + i + j) * 7) % 16)];
        }
        ctx.fillText(`0x${hex}`, hx, hy);
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function TerminalEmulator() {
  const {
    lines,
    currentInput,
    setCurrentInput,
    submitCommand,
    clearTerminal,
    navigateHistory,
  } = useTerminal();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when lines change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitCommand(currentInput);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateHistory("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateHistory("down");
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        clearTerminal();
      }
    },
    [submitCommand, currentInput, navigateHistory, clearTerminal]
  );

  // Clicking anywhere in the terminal focuses the input
  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="flex flex-col h-full font-mono text-sm bg-background rounded-lg border border-card-border overflow-hidden shadow-2xl shadow-disney-violet/5"
      onClick={handleContainerClick}
    >
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-card-bg border-b border-card-border shrink-0">
        {/* Traffic light dots — red closes (back to hub) */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            className="w-3 h-3 rounded-full bg-cyber-red/80 hover:bg-cyber-red hover:shadow-[0_0_6px_rgba(239,68,68,0.6)] transition-all cursor-pointer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Fermer le terminal"
          />
          <div className="w-3 h-3 rounded-full bg-cyber-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-cyber-green/80" />
        </div>
        <span className="text-cyber-green text-xs tracking-wide">
          disney-cyber-terminal v1.0
        </span>
      </div>

      {/* Scrollable output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 scroll-smooth relative"
      >
        {/* Animated background — scan lines + grid + hex values */}
        <TerminalBackground />

        <div className="relative z-10">
          <AnimatePresence initial={false}>
            {lines.map((line, index) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.15,
                  delay: Math.min(index * 0.03, 0.5),
                }}
                className={`${getLineColor(line)} whitespace-pre-wrap break-words leading-relaxed`}
              >
                {line.type === "input" ? (
                  <span>
                    <span className="text-cyber-green">$ </span>
                    {line.content}
                  </span>
                ) : (
                  <span>{line.content || "\u00A0"}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input area */}
      <div className="flex items-center px-4 py-3 bg-card-bg/50 border-t border-card-border shrink-0">
        <span className="text-cyber-green whitespace-nowrap mr-2">
          maxime@disney-cyber:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-foreground outline-none caret-cyber-green font-mono text-sm"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
        <span className="w-2 h-4 bg-cyber-green cursor-blink ml-0.5" />
      </div>
    </div>
  );
}
