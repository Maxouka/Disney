# Portfolio Terminal Interactif — Spec Complète pour Claude

## PROMPT À DONNER À CLAUDE

> Crée-moi un site portfolio interactif basé sur un terminal en plein écran. Le visiteur découvre mon parcours en tapant des commandes dans un faux terminal stylisé. Le design fusionne l'esthétique hacker/cybersécurité (Matrix rain, scan lines, hex values) avec un look moderne et soigné.
>
> **Stack** : Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion
> **Déploiement** : GitHub Pages (static export)
> **Inspiration** : Le spec complet est dans le fichier PORTFOLIO_TERMINAL_SPEC.md ci-dessous.
>
> Lis le fichier PORTFOLIO_TERMINAL_SPEC.md en entier avant de commencer. Il contient l'architecture, le design system, chaque composant, chaque commande, les animations, et le code de référence. Suis-le fidèlement.

---

## 1. Vue d'ensemble

Un site portfolio en une seule page : un émulateur de terminal plein écran. Le visiteur tape des commandes pour découvrir le profil, les compétences, l'expérience, les projets, et les informations de contact du développeur.

Le terminal est entouré d'un fond animé "Matrix rain" avec des caractères qui tombent. Le terminal lui-même a un fond animé subtil (grille, scan line, hex values flottants).

### Pourquoi ce concept fonctionne :
- **Mémorable** : aucun recruteur n'oublie un portfolio terminal
- **Interactif** : le visiteur est acteur, pas spectateur
- **Démonstration de compétences** : le site lui-même prouve les compétences frontend
- **Original** : se démarque de 99% des portfolios classiques

---

## 2. Architecture du projet

```
portfolio-terminal/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout global, fonts, metadata
│   │   ├── page.tsx             # Page unique — terminal plein écran
│   │   └── globals.css          # Variables CSS, animations, scrollbar
│   ├── components/
│   │   ├── terminal/
│   │   │   ├── TerminalEmulator.tsx   # Composant terminal principal
│   │   │   └── commands/
│   │   │       └── index.ts          # Toutes les commandes
│   │   └── background/
│   │       └── MatrixRain.tsx        # Fond animé Matrix rain
│   ├── lib/
│   │   ├── hooks/
│   │   │   └── useTerminal.ts        # Hook de gestion du terminal
│   │   └── data/
│   │       └── profile.ts            # Données personnelles centralisées
├── next.config.ts                    # Config pour static export
├── package.json
└── tailwind.config.ts (optionnel avec Tailwind v4)
```

---

## 3. Configuration Next.js pour GitHub Pages

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           // Static HTML export
  basePath: "/nom-du-repo",   // Remplacer par le nom du repo GitHub
  images: {
    unoptimized: true,        // Pas de serveur d'images en statique
  },
};

export default nextConfig;
```

### GitHub Actions pour le déploiement automatique

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 4. Design System

### 4.1 Palette de couleurs (variables CSS)

```css
:root {
  --background: #0a0a1a;       /* Fond principal — navy très foncé */
  --foreground: #f8fafc;        /* Texte principal — blanc cassé */
  --muted: #94a3b8;             /* Texte secondaire — gris bleuté */
  --accent-primary: #a855f7;    /* Accent principal — violet */
  --accent-secondary: #7c3aed;  /* Accent secondaire — violet foncé */
  --accent-blue: #3b82f6;       /* Accent bleu */
  --terminal-green: #22c55e;    /* Vert terminal classique */
  --error-red: #ef4444;         /* Rouge erreur/alerte */
  --warning-yellow: #f59e0b;    /* Jaune warning */
  --card-bg: #111827;           /* Fond des cartes/header terminal */
  --card-border: #1e293b;       /* Bordures */
}
```

### 4.2 Typographies (Google Fonts)

```typescript
// layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
```

- **Inter** : texte général (si besoin hors terminal)
- **JetBrains Mono** : tout le terminal (obligatoire pour l'ambiance)

### 4.3 Animations CSS

```css
/* Clignotement du curseur */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor-blink {
  animation: blink 1s step-end infinite;
}

/* Scan line du terminal */
@keyframes scan-line {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Glitch text (optionnel, pour le titre) */
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes glitch-color {
  0% { text-shadow: 2px 0 #a855f7, -2px 0 #22c55e; }
  25% { text-shadow: -2px 0 #a855f7, 2px 0 #22c55e; }
  50% { text-shadow: 2px 2px #a855f7, -2px -2px #22c55e; }
  75% { text-shadow: -2px 2px #a855f7, 2px -2px #22c55e; }
  100% { text-shadow: 2px 0 #a855f7, -2px 0 #22c55e; }
}

/* Scrollbar stylisée */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--background); }
::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--muted); }
```

---

## 5. Composant : MatrixRain (fond animé)

Canvas plein écran en position fixed derrière le terminal. Caractères verts (et occasionnellement violets) qui tombent style Matrix.

### Comportement :
- Colonnes de caractères qui tombent (katakana + chiffres)
- Chaque colonne a sa propre vitesse
- Effet de fondu (`rgba(10, 10, 26, 0.05)`) pour la traînée
- Opacity du canvas : `0.3` pour rester subtil
- Responsive : recalcule les colonnes au resize

### Code de référence :

```tsx
"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, columns = 0;
    let drops: number[] = [];

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      const newCols = Math.floor(W / fontSize);
      if (newCols !== columns) {
        const old = drops;
        drops = Array(newCols).fill(1);
        for (let i = 0; i < Math.min(old.length, newCols); i++) drops[i] = old[i];
        columns = newCols;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      // Fade effect
      ctx.fillStyle = "rgba(10, 10, 26, 0.05)";
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const alpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.fillText(char, x, y);

        // Occasional purple character
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.fillText(char, x, y);
        }

        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
}
```

---

## 6. Composant : TerminalEmulator

Le terminal occupe tout l'écran. Structure en 3 parties :

### 6.1 Header bar (barre de titre)

- 3 dots "traffic light" (rouge, jaune, vert) — purement décoratifs
- Titre : `portfolio-terminal v1.0`
- Fond : `bg-card-bg`, bordure basse `border-card-border`

### 6.2 Zone de sortie (scrollable)

- Prend tout l'espace restant (`flex-1 overflow-y-auto`)
- Fond animé subtil (grille + scan line + hex values flottants) via un canvas interne
- Chaque ligne apparaît avec une animation Framer Motion (`opacity: 0 → 1`, `x: -4 → 0`)
- Auto-scroll vers le bas quand de nouvelles lignes apparaissent
- Le message de bienvenue s'affiche au chargement

### 6.3 Zone de saisie (input)

- Prompt style : `visiteur@portfolio:~$`
- Input transparent, caret vert, font mono
- Curseur bloc clignotant à droite de l'input
- Fond semi-transparent : `bg-card-bg/50`

### 6.4 Fond animé du terminal (TerminalBackground)

Canvas interne au terminal avec :
- Grille subtile verte (`rgba(34, 197, 94, 0.03)`)
- Scan line qui descend (`rgba(34, 197, 94, 0.04)`)
- Hex values flottants (`0xA3F2B1C8`) très subtils

### Code de référence :

```tsx
"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminal } from "@/lib/hooks/useTerminal";
import type { TerminalLine } from "@/lib/hooks/useTerminal";

function getLineColor(line: TerminalLine): string {
  if (line.color) {
    const colorMap: Record<string, string> = {
      "terminal-green": "text-terminal-green",
      "error-red": "text-error-red",
      "warning-yellow": "text-warning-yellow",
      "accent-primary": "text-accent-primary",
      "muted": "text-muted",
    };
    return colorMap[line.color] || "text-foreground";
  }

  switch (line.type) {
    case "input": return "text-terminal-green";
    case "error": return "text-error-red";
    case "system": return "text-accent-primary";
    default: return "text-foreground";
  }
}

function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    const draw = () => {
      frame++;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = "rgba(34, 197, 94, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Moving scan line
      const scanY = (frame * 1.2) % (H + 60) - 30;
      const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      gradient.addColorStop(0, "rgba(34, 197, 94, 0)");
      gradient.addColorStop(0.5, "rgba(34, 197, 94, 0.04)");
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, W, 60);

      // Floating hex values
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(34, 197, 94, 0.025)";
      const hexChars = "0123456789ABCDEF";
      for (let i = 0; i < 6; i++) {
        const hx = ((frame * 0.3 + i * 170) % (W + 200)) - 100;
        const hy = ((i * 137 + 50) % H);
        let hex = "";
        for (let j = 0; j < 8; j++) {
          hex += hexChars[Math.floor(((frame * 0.1 + i + j) * 7) % 16)];
        }
        ctx.fillText(`0x${hex}`, hx, hy);
      }
    };

    const interval = setInterval(draw, 50);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
  );
}

export function TerminalEmulator() {
  const { lines, currentInput, setCurrentInput, submitCommand, clearTerminal, navigateHistory } = useTerminal();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); submitCommand(currentInput); }
    else if (e.key === "ArrowUp") { e.preventDefault(); navigateHistory("up"); }
    else if (e.key === "ArrowDown") { e.preventDefault(); navigateHistory("down"); }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); clearTerminal(); }
  }, [submitCommand, currentInput, navigateHistory, clearTerminal]);

  const handleContainerClick = useCallback(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="flex flex-col h-full font-mono text-sm bg-background rounded-lg border border-card-border overflow-hidden shadow-2xl" onClick={handleContainerClick}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-card-bg border-b border-card-border shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error-red/80" />
          <div className="w-3 h-3 rounded-full bg-warning-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-terminal-green/80" />
        </div>
        <span className="text-terminal-green text-xs tracking-wide">portfolio-terminal v1.0</span>
      </div>

      {/* Output */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 scroll-smooth relative">
        <TerminalBackground />
        <div className="relative z-10">
          <AnimatePresence initial={false}>
            {lines.map((line, index) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: Math.min(index * 0.03, 0.5) }}
                className={`${getLineColor(line)} whitespace-pre-wrap break-words leading-relaxed`}
              >
                {line.type === "input" ? (
                  <span><span className="text-terminal-green">$ </span>{line.content}</span>
                ) : (
                  <span>{line.content || "\u00A0"}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center px-4 py-3 bg-card-bg/50 border-t border-card-border shrink-0">
        <span className="text-terminal-green whitespace-nowrap mr-2">visiteur@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-foreground outline-none caret-terminal-green font-mono text-sm"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
        <span className="w-2 h-4 bg-terminal-green cursor-blink ml-0.5" />
      </div>
    </div>
  );
}
```

---

## 7. Hook : useTerminal

Gère l'état du terminal : lignes affichées, input courant, historique des commandes, navigation dans l'historique.

### Interface TerminalLine :

```typescript
export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  color?: string;  // Surcharge de couleur optionnelle
}
```

### Fonctionnalités :
- **submitCommand(input)** : ajoute la ligne input + les lignes de sortie
- **clearTerminal()** : réaffiche le message de bienvenue
- **navigateHistory("up" | "down")** : flèches haut/bas dans l'historique
- **Sauvegarde de l'input temporaire** quand on navigue dans l'historique

### Message de bienvenue (ASCII art) :

```
  ╔══════════════════════════════════════════════════════════════╗
  ║                                                            ║
  ║   PORTFOLIO TERMINAL v1.0                                  ║
  ║   [Prénom NOM] — [Titre]                                   ║
  ║                                                            ║
  ╚══════════════════════════════════════════════════════════════╝

  Tapez "help" pour afficher la liste des commandes disponibles.
```

---

## 8. Commandes du terminal

### 8.1 Données centralisées (`lib/data/profile.ts`)

Toutes les données personnelles sont dans un seul fichier. L'utilisateur le modifie pour personnaliser son portfolio.

```typescript
export const profile = {
  name: "Maxime LAUNOY",
  title: "Ingénieur Cybersécurité & Développeur Fullstack",
  email: "launoym@gmail.com",
  phone: "06 95 39 17 35",
  github: "github.com/Maxouka",
  linkedin: "linkedin.com/in/maxime-launoy",
  website: "",  // optionnel
  location: "France",
  languages: [
    "Français (natif)",
    "Anglais (C1 — TOEIC)",
    "Russe (natif)",
    "Espagnol (B2)",
  ],
  education: "Diplôme d'Ingénieur INSA — Spécialisation Cybersécurité",
  summary: "Ingénieur diplômé INSA spécialisé en cybersécurité avec une expérience concrète en Fintech. Compétences transverses en développement fullstack, automatisation et administration systèmes & réseaux.",

  // Expériences professionnelles
  experiences: [
    {
      period: "2023 - 2025",
      title: "Ingénieur Cybersécurité — Fintech (alternance INSA)",
      details: [
        "SOC : Investigation d'alertes quotidiennes sur Rapid7 InsightIDR",
        "EDR : Surveillance et réponse via Cybereason",
        "Déploiement BitLocker d'urgence sur +1000 machines",
        "Pilotage du plan de remédiation ISO 27001 (audit investisseurs)",
        "Migrations sécuritaires : FTP→SFTP, Telnet→SSH, HTTP→HTTPS",
        "Tanium : déploiement, patch management, packages personnalisés",
        "Ansible : playbooks d'automatisation sur ~100 machines",
        "Administration AD sur 3 domaines",
        "Gestion de +1000 VMs VMware, monitoring PRTG 24/7",
      ],
    },
    {
      period: "2020 - 2023",
      title: "Formation Ingénieur — INSA spécialisation Cybersécurité",
      details: [
        "Sécurité des systèmes d'information",
        "Cryptographie et protocoles de sécurité",
        "Réseaux avancés et sécurité OT",
        "Développement logiciel et architecture",
      ],
    },
  ],

  // Compétences avec niveau (0-100)
  skills: {
    "Cybersécurité": [
      { name: "SOC / SIEM (Rapid7 InsightIDR)", level: 95 },
      { name: "EDR (Cybereason)", level: 90 },
      { name: "Gestion vulnérabilités (Tanium)", level: 95 },
      { name: "Réponse à incident & forensique", level: 90 },
      { name: "Conformité ISO 27001", level: 85 },
      { name: "Sécurité OT / ICS / SCADA", level: 85 },
    ],
    "Développement": [
      { name: "TypeScript / React / Next.js", level: 95 },
      { name: "Node.js / API REST", level: 90 },
      { name: "Python (scripting sécurité)", level: 80 },
      { name: "PowerShell (automatisation)", level: 95 },
      { name: "Ansible (playbooks)", level: 85 },
    ],
    "Infrastructure": [
      { name: "Active Directory / GPO", level: 95 },
      { name: "VMware vSphere (~1000 VMs)", level: 90 },
      { name: "Réseaux / VLAN / segmentation", level: 85 },
      { name: "PRTG / monitoring 24/7", level: 90 },
      { name: "WSUS / patch management", level: 85 },
    ],
  },

  // Projets (pour la commande `projects`)
  projects: [
    {
      name: "Portfolio Terminal",
      description: "Ce site ! Portfolio interactif sous forme de terminal cybersécurité.",
      tech: "Next.js, TypeScript, Tailwind, Framer Motion, Canvas API",
      url: "github.com/Maxouka/portfolio-terminal",
    },
    {
      name: "Disney Cyber",
      description: "Site de candidature interactif fusionnant Disney et cybersécurité. SOC Dashboard, Parc d'attractions virtuel, terminal interactif.",
      tech: "Next.js 15, TypeScript, Tailwind CSS, Framer Motion",
      url: "",
    },
    // Ajouter d'autres projets ici
  ],
};
```

### 8.2 Commandes à implémenter

Chaque commande retourne un `TerminalLine[]`. Utiliser des helpers :

```typescript
function line(content: string, type = "output", color?: string): TerminalLine
function blank(): TerminalLine     // ligne vide
function header(text: string)      // texte violet/accent (type "system")
function success(text: string)     // texte vert
function error(text: string)       // texte rouge
function warning(text: string)     // texte jaune
```

#### `help` — Liste des commandes

```
  COMMANDES DISPONIBLES

  help          Afficher cette aide
  whoami        Profil et identité
  skills        Compétences techniques avec barres visuelles
  experience    Parcours professionnel
  projects      Projets et réalisations
  contact       Informations de contact
  education     Formation et certifications
  motivation    Ma philosophie et mes motivations
  socials       Liens vers mes réseaux
  clear         Effacer le terminal
```

#### `whoami` — Profil

Affiche dans un encadré ASCII :
- Nom, titre, formation, langues, localisation
- Résumé en quelques lignes

#### `skills` — Compétences avec barres visuelles

Affiche les compétences par catégorie avec des barres de progression ASCII :

```
  COMPETENCES TECHNIQUES

  CYBERSECURITE
  ███████████████████░ SOC / SIEM (Rapid7 InsightIDR)
  ██████████████████░░ EDR (Cybereason)
  ███████████████████░ Gestion vulnérabilités (Tanium)

  DEVELOPPEMENT
  ███████████████████░ TypeScript / React / Next.js
  ██████████████████░░ Node.js / API REST
  ...
```

La barre fait 20 caractères : `█` = rempli, `░` = vide. Le niveau est divisé par 5 pour obtenir le nombre de `█`.

#### `experience` — Parcours professionnel

Timeline avec périodes en vert, détails indentés.

#### `projects` — Projets

Pour chaque projet :
- Nom en vert
- Description
- Technologies
- URL (si disponible)

#### `contact` — Informations de contact

Affiche email, téléphone, GitHub, LinkedIn, localisation.

#### `education` — Formation

Détails de la formation + certifications.

#### `motivation` — Philosophie

Texte personnel sur les motivations, la vision, les valeurs.

#### `socials` — Liens réseaux

GitHub, LinkedIn, etc.

#### `clear` — Effacer le terminal

Réaffiche le message de bienvenue.

### 8.3 Gestion des commandes inconnues

```typescript
error(`  Commande inconnue : '${cmd}'. Tapez 'help' pour la liste des commandes.`);
```

---

## 9. Fonctionnalités clavier

| Touche | Action |
|--------|--------|
| `Enter` | Exécuter la commande |
| `Arrow Up` | Commande précédente dans l'historique |
| `Arrow Down` | Commande suivante dans l'historique |
| `Ctrl+L` | Effacer le terminal (= `clear`) |

### Historique des commandes :
- Stocké dans un tableau (plus récent en premier)
- Navigation avec un index
- L'input courant est sauvegardé quand on commence à naviguer (restauré avec flèche bas au-delà de l'historique)

---

## 10. Page principale

```tsx
// app/page.tsx
"use client";

import { TerminalEmulator } from "@/components/terminal/TerminalEmulator";
import { MatrixRain } from "@/components/background/MatrixRain";

export default function Home() {
  return (
    <main className="h-screen w-full p-2 sm:p-4 relative">
      <MatrixRain />
      <div className="relative z-10 h-full">
        <TerminalEmulator />
      </div>
    </main>
  );
}
```

---

## 11. Améliorations optionnelles (bonus)

Ces fonctionnalités ne sont pas obligatoires mais améliorent l'expérience :

### 11.1 Auto-complétion (Tab)
Quand l'utilisateur appuie sur Tab, compléter la commande en cours parmi les commandes disponibles.

### 11.2 Effet typewriter
Les lignes de sortie s'affichent caractère par caractère (30ms/char) au lieu d'apparaître d'un coup.

### 11.3 Easter eggs
- `sudo` → "Accès refusé. Bien tenté."
- `rm -rf /` → "Non non non. Pas ici."
- `matrix` → Augmenter temporairement l'opacité du MatrixRain
- `hack` → Animation glitch sur tout le terminal pendant 2s

### 11.4 Thèmes
Commande `theme <name>` pour changer les couleurs (green, purple, blue, amber).

### 11.5 Responsive mobile
Sur mobile, le terminal prend tout l'écran sans padding. Le clavier virtuel ne doit pas cacher l'input (scroll automatique).

---

## 12. Résumé des dépendances

```json
{
  "dependencies": {
    "framer-motion": "^12",
    "next": "^15",
    "react": "^19",
    "react-dom": "^19"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 13. Checklist de validation

- [ ] Le terminal occupe tout l'écran
- [ ] Le fond MatrixRain est visible derrière le terminal
- [ ] Le message de bienvenue s'affiche au chargement
- [ ] Toutes les commandes fonctionnent et affichent des données cohérentes
- [ ] Les commandes inconnues affichent un message d'erreur propre
- [ ] L'historique des commandes fonctionne (flèches haut/bas)
- [ ] Ctrl+L efface le terminal
- [ ] Le curseur clignote
- [ ] Les lignes apparaissent avec une animation fluide
- [ ] L'auto-scroll fonctionne quand le contenu dépasse la zone visible
- [ ] Le scan line et les hex values sont subtils mais visibles
- [ ] Le site est responsive (mobile OK)
- [ ] Le build statique fonctionne (`npm run build` sans erreur)
- [ ] Le déploiement GitHub Pages fonctionne
- [ ] Pas d'emoji dans le code (utiliser ASCII ou SVG)
- [ ] Pas d'erreur de hydration (pas de Math.random() dans le rendu React)

---

## 14. Comment personnaliser

Pour adapter ce portfolio à ton profil :

1. **Modifier `lib/data/profile.ts`** : changer nom, compétences, expériences, projets
2. **Modifier le message de bienvenue** dans `useTerminal.ts` : changer le titre et le nom
3. **Modifier le prompt** dans `TerminalEmulator.tsx` : changer `visiteur@portfolio:~$`
4. **Ajouter/supprimer des commandes** dans `commands/index.ts`
5. **Modifier `next.config.ts`** : changer le `basePath` pour ton repo GitHub
6. **Modifier les couleurs** dans `globals.css` si tu veux un thème différent
