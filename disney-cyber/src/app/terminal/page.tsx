"use client";

import { PageTransition } from "@/components/shared/PageTransition";
import { TerminalEmulator } from "@/components/terminal/TerminalEmulator";

export default function TerminalPage() {
  return (
    <PageTransition className="h-screen w-full p-2 sm:p-4">
      <TerminalEmulator />
    </PageTransition>
  );
}
