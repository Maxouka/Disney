"use client";

import { motion } from "framer-motion";

export function WhyDisney() {
  return (
    <motion.section
      className="max-w-2xl mx-auto text-center mt-8 mb-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
    >
      <p className="text-muted text-base md:text-lg leading-relaxed">
        <span className="text-disney-purple font-medium">Protéger la magie</span> demande de vrais
        ingénieurs cyber. Sécuriser des attractions, c&apos;est allier la rigueur de la cybersécurité
        industrielle à l&apos;exigence d&apos;un environnement où la disponibilité est critique
        — et où chaque visiteur compte.
      </p>
      <p className="text-muted/70 text-sm mt-4 font-mono">
        Ce site interactif remplace ma lettre de motivation.
        <br />
        Explorez, cliquez, tapez des commandes — découvrez mes compétences en action.
      </p>
    </motion.section>
  );
}
