/**
 * Custom SVG icons — Disney Cyber aesthetic
 * No generic emojis. Each icon is hand-crafted for the theme.
 */

interface IconProps {
  className?: string;
  size?: number;
}

function Svg({
  children,
  className = "",
  size = 20,
  viewBox = "0 0 24 24",
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

// ─── MICKEY EARS — The signature motif ──────────────────────────────────────

export function MickeyEars({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Left ear */}
      <circle cx="7.5" cy="7" r="5" />
      {/* Right ear */}
      <circle cx="16.5" cy="7" r="5" />
      {/* Head */}
      <circle cx="12" cy="14.5" r="7.5" />
    </svg>
  );
}

// Small decorative Mickey ears (3 dots)
export function MickeyDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-[1px] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="w-2.5 h-2.5 rounded-full bg-current" />
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
    </span>
  );
}

// ─── NAVIGATION / HUB ──────────────────────────────────────────────────────

export function IconHub({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Castle turrets */}
      <path d="M3 21V11l4-4v-4h2v3l3-3 3 3v-3h2v4l4 4v10H3z" />
      <path d="M9 21v-5h6v5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconShieldRadar({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Shield outline */}
      <path d="M12 2l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      {/* Radar sweep */}
      <circle cx="12" cy="11" r="3" />
      <path d="M12 8v3l2.1 2.1" />
    </Svg>
  );
}

export function IconParcMap({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Map with pin */}
      <path d="M3 7l6-3 6 3 6-3v14l-6 3-6-3-6 3V7z" />
      <path d="M9 4v14" />
      <path d="M15 7v14" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconTerminal({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M6 9l4 3-4 3" />
      <path d="M12 15h6" />
    </Svg>
  );
}

// ─── SOC SIDEBAR ────────────────────────────────────────────────────────────

export function IconLogStream({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M4 6h16" />
      <path d="M4 10h12" />
      <path d="M4 14h14" />
      <path d="M4 18h10" />
      {/* Pulse dot */}
      <circle cx="20" cy="14" r="2" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconInvestigate({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Magnifying glass */}
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5L20 20" />
      {/* Binary inside */}
      <path d="M8 9v2M10 8v3M12 9v2" strokeWidth="1.5" />
    </Svg>
  );
}

export function IconShieldVuln({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M12 2l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      {/* Bug/vuln indicator */}
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconChartPulse({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Heartbeat line */}
      <polyline points="2,13 6,13 8,8 10,18 12,6 14,16 16,11 18,13 22,13" />
      {/* Bottom axis */}
      <path d="M2 20h20" strokeWidth="1" opacity="0.3" />
    </Svg>
  );
}

export function IconLightning({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

// ─── SOAR PLAYBOOK PHASES ───────────────────────────────────────────────────

export function IconBell({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Svg>
  );
}

export function IconSearch({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </Svg>
  );
}

export function IconScale({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M12 3v18" />
      <path d="M4 7l8-4 8 4" />
      <path d="M4 7l-1 7a4 4 0 0 0 8 0l-1-7" />
      <path d="M16 7l-1 7a4 4 0 0 0 8 0l-1-7" />
    </Svg>
  );
}

export function IconMegaphone({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M18 3v18" />
      <path d="M18 8a6 6 0 0 1-6 6H4l14 7" />
      <path d="M4 14V8a6 6 0 0 1 6-6" strokeWidth="0" />
    </Svg>
  );
}

export function IconClipboard({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </Svg>
  );
}

// ─── INVESTIGATION PHASES ───────────────────────────────────────────────────

export function IconTarget({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconMicroscope({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M6 18h12" />
      <path d="M12 18V8" />
      <circle cx="12" cy="5.5" r="2.5" />
      <path d="M15 11l3 3" />
    </Svg>
  );
}

export function IconContain({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M12 2l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

export function IconWrench({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Svg>
  );
}

// ─── ATTRACTION ICONS ───────────────────────────────────────────────────────

export function IconRocket({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size} viewBox="0 0 24 24">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </Svg>
  );
}

export function IconPirate({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Skull */}
      <circle cx="12" cy="10" r="7" />
      {/* Eyes */}
      <path d="M9 9l1.5 1.5L9 12" fill="none" />
      <path d="M15 9l-1.5 1.5L15 12" fill="none" />
      {/* Jaw */}
      <path d="M8.5 14.5h7" />
      <path d="M10 14.5v2M12 14.5v2M14 14.5v2" />
      {/* Bones */}
      <path d="M5 19l4-3M19 19l-4-3" />
    </Svg>
  );
}

export function IconCastle({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M3 21V11l2-2V5h2v2l2-2V3h2v2l2-2V3h2v2l2-2v4l2 2v10H3z" />
      <path d="M10 21v-6h4v6" />
      {/* Window */}
      <circle cx="12" cy="11" r="1.5" />
    </Svg>
  );
}

export function IconMountain({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <path d="M8 21L1 12l5-7 4 5 2-3 2 3 4-5 5 7-7 9H8z" />
      <path d="M12 7l-2 3 2 2 2-2-2-3z" fill="currentColor" stroke="none" opacity="0.3" />
    </Svg>
  );
}

export function IconGalaxy({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Central star */}
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      {/* Orbital rings */}
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </Svg>
  );
}

export function IconLaser({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* Target reticle */}
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

// ─── UTILITY ICONS ─────────────────────────────────────────────────────────

export function IconMonitor({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      {/* Screen line */}
      <path d="M7 8h4M7 11h6" strokeWidth="1.5" />
    </Svg>
  );
}

export function IconLock({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      {/* Keyhole */}
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 17.5v2" />
    </Svg>
  );
}

export function IconClock({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Svg>
  );
}

export function IconSparkle({ className, size }: IconProps) {
  return (
    <Svg className={className} size={size}>
      {/* 4-point star */}
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" fill="currentColor" stroke="none" />
      {/* Small sparkle */}
      <circle cx="19" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="19" r="0.7" fill="currentColor" stroke="none" />
    </Svg>
  );
}
