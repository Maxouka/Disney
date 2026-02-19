"use client";

import { useEffect, useRef } from "react";

/**
 * Matrix rain background with falling Mickey head silhouettes.
 * Mickey heads are made of the same green characters — they drift
 * down like big glyphs among the regular rain columns.
 */

// Pre-compute a Mickey head pixel map (which cells are "filled")
// at a given grid size. The Mickey is ~20 cols wide, ~18 rows tall.
function buildMickeyGrid(): boolean[][] {
  const W = 22;
  const H = 20;
  const grid: boolean[][] = Array.from({ length: H }, () =>
    Array(W).fill(false)
  );

  // Circle fill helper (on a grid)
  const fillCircle = (cx: number, cy: number, r: number) => {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy <= r * r) {
          grid[y][x] = true;
        }
      }
    }
  };

  // Head — large circle at bottom center
  fillCircle(11, 13, 7);
  // Left ear
  fillCircle(5, 5, 4.5);
  // Right ear
  fillCircle(17, 5, 4.5);

  return grid;
}

const MICKEY_GRID = buildMickeyGrid();
const MICKEY_W = MICKEY_GRID[0].length;
const MICKEY_H = MICKEY_GRID.length;

interface FallingMickey {
  x: number; // grid column offset
  y: number; // current y position in pixels
  speed: number;
  alpha: number;
  purple: boolean; // occasionally a purple Mickey
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      const newCols = Math.floor(W / fontSize);
      if (newCols !== columns) {
        const old = drops;
        drops = Array(newCols).fill(1);
        for (let i = 0; i < Math.min(old.length, newCols); i++) {
          drops[i] = old[i];
        }
        columns = newCols;
      }
    };

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;

    resize();
    window.addEventListener("resize", resize);

    // Falling Mickeys
    const mickeys: FallingMickey[] = [];
    const maxMickeys = 6;

    const spawnMickey = () => {
      if (mickeys.length >= maxMickeys) return;
      const maxCol = columns - MICKEY_W - 2;
      if (maxCol < 0) return;
      mickeys.push({
        x: 2 + Math.floor(Math.random() * maxCol),
        y: -MICKEY_H * fontSize - Math.random() * 200,
        speed: 0.5 + Math.random() * 0.4,
        alpha: 0.35 + Math.random() * 0.25,
        purple: Math.random() > 0.6,
      });
    };

    // Seed initial Mickeys at random positions
    for (let i = 0; i < 2; i++) {
      const maxCol = Math.floor(W / fontSize) - MICKEY_W - 2;
      if (maxCol > 0) {
        mickeys.push({
          x: 2 + Math.floor(Math.random() * maxCol),
          y: Math.random() * H * 0.6,
          speed: 0.5 + Math.random() * 0.4,
          alpha: 0.35 + Math.random() * 0.25,
          purple: Math.random() > 0.6,
        });
      }
    }

    let frame = 0;

    const draw = () => {
      frame++;

      // Fade
      ctx.fillStyle = "rgba(10, 10, 26, 0.05)";
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${fontSize}px monospace`;

      // --- Regular rain columns ---
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const alpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.fillText(char, x, y);

        // Occasional purple character
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.fillText(char, x, y);
        }

        if (y > H && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // --- Falling Mickey heads ---
      for (let m = mickeys.length - 1; m >= 0; m--) {
        const mick = mickeys[m];
        mick.y += mick.speed;

        // Draw Mickey grid
        for (let gy = 0; gy < MICKEY_H; gy++) {
          for (let gx = 0; gx < MICKEY_W; gx++) {
            if (!MICKEY_GRID[gy][gx]) continue;

            const px = (mick.x + gx) * fontSize;
            const py = mick.y + gy * fontSize;

            if (py < -fontSize || py > H + fontSize) continue;

            const char = chars[Math.floor(Math.random() * chars.length)];
            const flicker = 0.7 + Math.random() * 0.3;

            if (mick.purple) {
              ctx.fillStyle = `rgba(168, 85, 247, ${mick.alpha * flicker})`;
            } else {
              ctx.fillStyle = `rgba(34, 197, 94, ${mick.alpha * flicker})`;
            }
            ctx.fillText(char, px, py);
          }
        }

        // Remove when fully off screen
        if (mick.y > H + MICKEY_H * fontSize) {
          mickeys.splice(m, 1);
        }
      }

      // Spawn new Mickey periodically
      if (frame % 80 === 0) {
        spawnMickey();
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
      className="fixed inset-0 pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
}
