"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { attractions } from "@/lib/data/attractions";
import { PageTransition } from "@/components/shared/PageTransition";
import { ParkMap } from "@/components/parc/ParkMap";
import { AttractionCard } from "@/components/parc/AttractionCard";

export default function ParcPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setVisitedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const selectedAttraction = selectedId
    ? attractions.find((a) => a.id === selectedId) ?? null
    : null;

  return (
    <PageTransition className="min-h-screen">
      <ParkMap
        attractions={attractions}
        visitedIds={visitedIds}
        onSelect={handleSelect}
      />

      <AnimatePresence>
        {selectedAttraction && (
          <AttractionCard
            key={selectedAttraction.id}
            attraction={selectedAttraction}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
