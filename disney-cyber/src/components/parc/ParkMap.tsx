"use client";

import { motion } from "framer-motion";
import type { Attraction } from "@/lib/data/attractions";
import { IconRocket, IconPirate, IconCastle, IconMountain, IconGalaxy, IconLaser, MickeyDots } from "@/components/shared/Icons";

const attractionIconMap: Record<string, React.ReactNode> = {
  rocket: <IconRocket size={40} />,
  pirate: <IconPirate size={40} />,
  castle: <IconCastle size={40} />,
  mountain: <IconMountain size={40} />,
  galaxy: <IconGalaxy size={40} />,
  laser: <IconLaser size={40} />,
};

interface ParkMapProps {
  attractions: Attraction[];
  visitedIds: Set<string>;
  onSelect: (id: string) => void;
}

export function ParkMap({ attractions, visitedIds, onSelect }: ParkMapProps) {
  const exploredCount = visitedIds.size;
  const total = attractions.length;
  const progressPercent = (exploredCount / total) * 100;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          <MickeyDots className="mr-3 text-disney-violet" />
          Parc Cyber — Explorez mes competences
        </h1>
        <p className="text-muted text-sm max-w-xl mx-auto">
          Chaque attraction represente un domaine de competence en cybersecurite.
          Cliquez pour explorer en detail.
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto max-w-md mb-10 space-y-2"
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">
            {exploredCount}/{total} attractions explorees
          </span>
          <span className="font-mono text-disney-purple">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-card-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-disney-violet to-disney-purple"
          />
        </div>
      </motion.div>

      {/* Grid of attraction cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {attractions.map((attraction, i) => {
          const isVisited = visitedIds.has(attraction.id);

          return (
            <motion.button
              key={attraction.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(attraction.id)}
              className="group relative rounded-xl border-2 bg-card-bg p-6 text-left transition-shadow cursor-pointer"
              style={{
                borderColor: `${attraction.color}44`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${attraction.color}33, 0 0 48px ${attraction.color}11`;
                (e.currentTarget as HTMLElement).style.borderColor = `${attraction.color}88`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = `${attraction.color}44`;
              }}
            >
              {/* Visited badge */}
              {isVisited && (
                <span className="absolute right-3 top-3 rounded-full bg-cyber-green/20 px-2 py-0.5 text-[10px] font-bold text-cyber-green">
                  Explore ✓
                </span>
              )}

              {/* Icon */}
              <span className="block mb-3" style={{ color: attraction.color }}>
                {attractionIconMap[attraction.icon] || attraction.icon}
              </span>

              {/* Name */}
              <h3 className="text-lg font-bold text-foreground mb-1">
                {attraction.name}
              </h3>

              {/* Cyber title */}
              <p className="text-xs font-semibold mb-2" style={{ color: attraction.color }}>
                {attraction.cyberTitle}
              </p>

              {/* Brief hint */}
              <p className="text-xs text-muted line-clamp-2">{attraction.mission}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
