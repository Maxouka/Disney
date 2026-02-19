"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconHub, IconShieldRadar, IconParcMap, IconTerminal } from "@/components/shared/Icons";

const navLinks: { href: string; label: string; icon: React.ReactNode }[] = [
  { href: "/", label: "Hub", icon: <IconHub size={16} /> },
  { href: "/soc", label: "SOC Dashboard", icon: <IconShieldRadar size={16} /> },
  { href: "/parc", label: "Parc Cyber", icon: <IconParcMap size={16} /> },
  { href: "/terminal", label: "Terminal", icon: <IconTerminal size={16} /> },
];

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTerminal = pathname === "/terminal";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Home: show on scroll. Terminal: hidden (has its own home button). Other subpages: always visible.
  const visible = isTerminal ? false : isHome ? scrolled : true;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-3 left-1/2 z-50 -translate-x-1/2 rounded-full border border-card-border bg-background/70 px-2 py-1.5 shadow-lg shadow-disney-violet/10 backdrop-blur-xl"
        >
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, label, icon }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-disney-violet/20 text-disney-violet"
                        : "text-muted hover:bg-card-border/50 hover:text-foreground"
                    }`}
                  >
                    <span className="leading-none">{icon}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
