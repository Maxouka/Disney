import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/shared/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel_Decorative({
  variable: "--font-disney",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Maxime LAUNOY — Candidature Cybersécurité Disneyland Paris",
  description:
    "Site de motivation interactif pour le poste d'Ingénieur Cybersécurité chez Disneyland Paris. Démonstration de compétences SOC, incident response, conformité ISO 27001 et automatisation.",
  keywords: [
    "cybersécurité",
    "Disney",
    "SOC",
    "SIEM",
    "incident response",
    "ISO 27001",
    "OT security",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
