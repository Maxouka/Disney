"use client";

import { motion } from "framer-motion";
import { GlitchText } from "@/components/shared/GlitchText";

export function IntroAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Main title with Disney font + glitch */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <GlitchText as="h1" className="font-disney text-5xl md:text-7xl lg:text-8xl text-foreground tracking-wider">
          MAXIME LAUNOY
        </GlitchText>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-disney-violet to-transparent" />
        <p className="font-mono text-sm md:text-base text-cyber-green tracking-widest uppercase">
          Ingénieur Cybersécurité
        </p>
        <p className="text-muted text-sm md:text-base">
          Candidature Disneyland Paris
        </p>
      </motion.div>

      {/* Decorative binary line */}
      <motion.p
        className="font-mono text-xs text-cyber-green/30 mt-2 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        01001101 01000001 01011000 01001001 01001101 01000101
      </motion.p>
    </motion.div>
  );
}
