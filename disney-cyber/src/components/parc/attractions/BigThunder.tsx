"use client";

import { motion } from "framer-motion";

interface PurdueLayer {
  level: number;
  name: string;
  description: string;
  components: string[];
  color: string;
}

interface BigThunderProps {
  demoData: {
    title: string;
    layers: PurdueLayer[];
  };
  color: string;
}

export function BigThunder({ demoData }: BigThunderProps) {
  const sortedLayers = [...demoData.layers].sort((a, b) => b.level - a.level);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted">{demoData.title}</h4>

      <div className="space-y-1.5">
        {sortedLayers.map((layer, i) => {
          const showBoundary = layer.level === 4;

          return (
            <div key={layer.level}>
              <motion.div
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
                className="relative overflow-hidden rounded-lg border p-3"
                style={{
                  borderColor: `${layer.color}44`,
                  backgroundColor: `${layer.color}11`,
                }}
              >
                {/* Level badge */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold"
                    style={{ backgroundColor: layer.color, color: "#0a0a1a" }}
                  >
                    L{layer.level}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: layer.color }}>
                    {layer.name}
                  </span>
                </div>

                <p className="text-xs text-muted mb-2">{layer.description}</p>

                {/* Components */}
                <div className="flex flex-wrap gap-1.5">
                  {layer.components.map((comp, j) => (
                    <span
                      key={j}
                      className="rounded-full px-2 py-0.5 text-[10px] font-mono"
                      style={{
                        backgroundColor: `${layer.color}22`,
                        color: layer.color,
                      }}
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Security boundary between IT and OT (between L4 DMZ and L3) */}
              {showBoundary && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.12 + 0.2 }}
                  className="relative my-2 flex items-center gap-2"
                >
                  <div className="h-px flex-1 bg-cyber-red/50" />
                  <span className="flex-shrink-0 rounded-full border border-cyber-red/50 bg-cyber-red/10 px-3 py-0.5 text-[10px] font-bold text-cyber-red">
                    FRONTIERE DE SECURITE IT / OT
                  </span>
                  <div className="h-px flex-1 bg-cyber-red/50" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
