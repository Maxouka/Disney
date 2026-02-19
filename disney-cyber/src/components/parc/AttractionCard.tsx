"use client";

import { motion } from "framer-motion";
import type { Attraction } from "@/lib/data/attractions";
import { SpaceMountain } from "./attractions/SpaceMountain";
import { Pirates } from "./attractions/Pirates";
import { Chateau } from "./attractions/Chateau";
import { BigThunder } from "./attractions/BigThunder";
import { Hyperspace } from "./attractions/Hyperspace";
import { BuzzLightyear } from "./attractions/BuzzLightyear";
import { IconRocket, IconPirate, IconCastle, IconMountain, IconGalaxy, IconLaser } from "@/components/shared/Icons";

const attractionIconMap: Record<string, React.ReactNode> = {
  rocket: <IconRocket size={36} />,
  pirate: <IconPirate size={36} />,
  castle: <IconCastle size={36} />,
  mountain: <IconMountain size={36} />,
  galaxy: <IconGalaxy size={36} />,
  laser: <IconLaser size={36} />,
};

interface AttractionCardProps {
  attraction: Attraction;
  onClose: () => void;
}

function DemoRenderer({ attraction }: { attraction: Attraction }) {
  switch (attraction.demoType) {
    case "timeline":
      if (attraction.id === "pirates-des-caraibes") {
        return <Pirates demoData={attraction.demoData} color={attraction.color} />;
      }
      return <SpaceMountain demoData={attraction.demoData} color={attraction.color} />;
    case "checklist":
      return <Chateau demoData={attraction.demoData} color={attraction.color} />;
    case "architecture":
      return <BigThunder demoData={attraction.demoData} color={attraction.color} />;
    case "counter":
      return <Hyperspace demoData={attraction.demoData} color={attraction.color} />;
    case "playbook":
      return <BuzzLightyear demoData={attraction.demoData} color={attraction.color} />;
    default:
      return null;
  }
}

export function AttractionCard({ attraction, onClose }: AttractionCardProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel - slide from right */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-card-border bg-background shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-card-border bg-card-bg text-muted transition-colors hover:bg-card-border hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span style={{ color: attraction.color }}>
                {attractionIconMap[attraction.icon] || attraction.icon}
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground">{attraction.name}</h2>
                <p className="text-sm font-semibold" style={{ color: attraction.color }}>
                  {attraction.cyberTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-card-border" />

          {/* Mission */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Mission du poste
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {attraction.mission}
            </p>
          </section>

          {/* Description */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Ce que je maitrise
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {attraction.description}
            </p>
          </section>

          {/* Experience - styled with left purple border */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Mon experience
            </h3>
            <div className="rounded-r-lg border-l-2 border-disney-purple bg-disney-purple/5 p-4">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {attraction.experience}
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full bg-card-border" />

          {/* Demo */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Demonstration
            </h3>
            <DemoRenderer attraction={attraction} />
          </section>
        </div>
      </motion.div>
    </>
  );
}
