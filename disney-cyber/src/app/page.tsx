"use client";

import { MatrixRain } from "@/components/hub/MatrixRain";
import { IntroAnimation } from "@/components/hub/IntroAnimation";
import { WhyDisney } from "@/components/hub/WhyDisney";
import { Portal } from "@/components/hub/Portal";
import { IconShieldRadar, IconCastle, IconTerminal, MickeyDots } from "@/components/shared/Icons";
import { SparkleEffect } from "@/components/shared/SparkleEffect";
import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Matrix rain background with falling Mickey heads */}
      <MatrixRain />

      {/* Ambient magical sparkles */}
      <SparkleEffect count={30} color="#a855f7" />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 py-20">
        {/* Intro */}
        <IntroAnimation />

        {/* Why Disney */}
        <WhyDisney />

        {/* Mickey ears separator */}
        <motion.div
          className="flex items-center gap-3 mt-12 mb-2 w-full max-w-md text-disney-violet/40"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-disney-violet/30" />
          <MickeyDots />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-disney-violet/30" />
        </motion.div>

        {/* 3 Portals */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-4">
          <Portal
            href="/soc"
            icon={<IconShieldRadar size={28} />}
            title="SOC Operations"
            subtitle="Découvrez comment je supervise la sécurité"
            color="green"
            delay={0}
          />
          <Portal
            href="/parc"
            icon={<IconCastle size={28} />}
            title="Parc Cyber"
            subtitle="Explorez mes compétences par attraction"
            color="violet"
            delay={0.15}
          />
          <Portal
            href="/terminal"
            icon={<IconTerminal size={28} />}
            title="Terminal"
            subtitle="Interagissez avec mon parcours"
            color="blue"
            delay={0.3}
          />
        </div>

        {/* Footer contact */}
        <motion.footer
          className="mt-16 text-center text-sm text-muted/60 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <a href={`mailto:${profile.email}`} className="hover:text-cyber-green transition-colors">
              {profile.email}
            </a>
            <span className="text-card-border">|</span>
            <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-disney-purple transition-colors">
              {profile.github}
            </a>
            <span className="text-card-border">|</span>
            <span>{profile.phone}</span>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
