import type { TerminalLine } from "@/lib/hooks/useTerminal";
import { profile } from "@/lib/data/profile";
import { missionMappings } from "@/lib/data/missions";
import { vulnerabilities } from "@/lib/data/vulnerabilities";
import { alerts } from "@/lib/data/alerts";

let idCounter = 0;
function id(): string {
  return `cmd-${++idCounter}-${Date.now()}`;
}

function line(
  content: string,
  type: TerminalLine["type"] = "output",
  color?: string
): TerminalLine {
  return { id: id(), type, content, color };
}

function blank(): TerminalLine {
  return line("");
}

function header(text: string): TerminalLine {
  return line(text, "system", "disney-purple");
}

function success(text: string): TerminalLine {
  return line(text, "output", "cyber-green");
}

function error(text: string): TerminalLine {
  return line(text, "error", "cyber-red");
}

function warning(text: string): TerminalLine {
  return line(text, "output", "cyber-yellow");
}

// ─── HELP ───────────────────────────────────────────────────────────────────

function helpCommand(): TerminalLine[] {
  return [
    blank(),
    header("  COMMANDES DISPONIBLES"),
    blank(),
    line(
      "  help          Afficher cette aide"
    ),
    line(
      "  whoami        Profil et identite"
    ),
    line(
      "  skills        Competences techniques avec barres visuelles"
    ),
    line(
      "  experience    Parcours professionnel"
    ),
    line(
      "  missions      Correspondance missions / experience"
    ),
    line(
      "  scan          Lancer un scan de vulnerabilites OT"
    ),
    line(
      "  investigate   Investigation d'un incident de securite"
    ),
    line(
      "  deploy        Recit du deploiement BitLocker d'urgence"
    ),
    line(
      "  audit         Checklist de conformite ISO 27001"
    ),
    line(
      "  automate      Exemples d'automatisation"
    ),
    line(
      "  motivation    Pourquoi Disney, pourquoi ce poste"
    ),
    line(
      "  contact       Informations de contact"
    ),
    line(
      "  clear         Effacer le terminal"
    ),
    blank(),
  ];
}

// ─── WHOAMI ─────────────────────────────────────────────────────────────────

function whoamiCommand(): TerminalLine[] {
  return [
    blank(),
    header(
      "  ╔══════════════════════════════════════════════════════════╗"
    ),
    header(
      "  ║  IDENTIFICATION OPERATEUR                               ║"
    ),
    header(
      "  ╚══════════════════════════════════════════════════════════╝"
    ),
    blank(),
    success(`  Nom          : ${profile.name}`),
    success(`  Poste        : ${profile.title}`),
    line(`  Formation    : ${profile.education}`),
    line(
      `  Langues      : ${profile.languages.join(", ")}`
    ),
    line(`  Localisation : ${profile.location}`),
    blank(),
    header("  RESUME"),
    line(`  ${profile.summary}`),
    blank(),
  ];
}

// ─── SKILLS ─────────────────────────────────────────────────────────────────

function skillBar(name: string, level: number): string {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  return `  ${"█".repeat(filled)}${"░".repeat(empty)} ${name}`;
}

function skillsCommand(): TerminalLine[] {
  return [
    blank(),
    header("  COMPETENCES TECHNIQUES"),
    blank(),
    warning("  CYBERSECURITE"),
    line(skillBar("SOC / SIEM (Rapid7 InsightIDR)", 95)),
    line(skillBar("EDR (Cybereason)", 90)),
    line(skillBar("Gestion vulnerabilites (Tanium)", 95)),
    line(skillBar("Reponse a incident & forensique", 90)),
    line(skillBar("Conformite ISO 27001", 85)),
    line(skillBar("Securite OT / ICS / SCADA", 85)),
    line(skillBar("Firewall / IDS / Suricata", 80)),
    blank(),
    warning("  DEVELOPPEMENT"),
    line(skillBar("TypeScript / React / Next.js", 95)),
    line(skillBar("Node.js / API REST", 90)),
    line(skillBar("Python (scripting securite)", 80)),
    line(skillBar("PowerShell (automatisation)", 95)),
    line(skillBar("Ansible (playbooks)", 85)),
    blank(),
    warning("  INFRASTRUCTURE"),
    line(skillBar("Active Directory / GPO", 95)),
    line(skillBar("VMware vSphere (~1000 VMs)", 90)),
    line(skillBar("Reseaux / VLAN / segmentation", 85)),
    line(skillBar("PRTG / monitoring 24/7", 90)),
    line(skillBar("WSUS / patch management", 85)),
    blank(),
  ];
}

// ─── EXPERIENCE ─────────────────────────────────────────────────────────────

function experienceCommand(): TerminalLine[] {
  return [
    blank(),
    header("  PARCOURS PROFESSIONNEL"),
    blank(),
    success("  [2023 - 2025] Ingenieur Cybersecurite — Fintech (alternance INSA)"),
    line("    - SOC : Investigation d'alertes quotidiennes sur Rapid7 InsightIDR"),
    line("    - EDR : Surveillance et reponse via Cybereason"),
    line("    - Deploiement BitLocker d'urgence sur l'ensemble du parc (+1000 machines)"),
    line("    - Pilotage du plan de remediation ISO 27001 (audit investisseurs)"),
    line("    - Migrations securitaires : FTP>SFTP, Telnet>SSH, HTTP>HTTPS, LDAP>LDAPS"),
    line("    - Tanium : deploiement, patch management, packages personnalises"),
    line("    - Ansible : playbooks d'automatisation sur ~100 machines"),
    line("    - Administration AD sur 3 domaines"),
    line("    - Gestion de +1000 VMs VMware, monitoring PRTG 24/7"),
    blank(),
    success("  [2020 - 2023] Formation Ingenieur — INSA specialisation Cybersecurite"),
    line("    - Securite des systemes d'information"),
    line("    - Cryptographie et protocoles de securite"),
    line("    - Reseaux avances et securite OT"),
    line("    - Developpement logiciel et architecture"),
    blank(),
    success("  [Projets personnels]"),
    line("    - Developpement fullstack (React / Next.js / TypeScript)"),
    line("    - Outils de securite et scripts d'automatisation"),
    line("    - Ce site : demonstration interactive de competences"),
    blank(),
  ];
}

// ─── MISSIONS ───────────────────────────────────────────────────────────────

function missionsCommand(): TerminalLine[] {
  const lines: TerminalLine[] = [
    blank(),
    header("  CORRESPONDANCE MISSIONS DISNEY / EXPERIENCE"),
    blank(),
  ];

  missionMappings.forEach((m, i) => {
    lines.push(
      success(`  ━━━ Mission ${i + 1} ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    );
    lines.push(warning(`  Mission   : ${m.mission}`));
    lines.push(line(`  Lieu      : ${m.where}`));
    lines.push(line(`  Outils    : ${m.tools}`));
    lines.push(
      line(`  Experience: ${m.experience}`)
    );
    lines.push(blank());
  });

  return lines;
}

// ─── SCAN ───────────────────────────────────────────────────────────────────

function scanCommand(): TerminalLine[] {
  const critical = vulnerabilities.filter((v) => v.severity === "CRITICAL");
  const high = vulnerabilities.filter((v) => v.severity === "HIGH");
  const medium = vulnerabilities.filter((v) => v.severity === "MEDIUM");
  const low = vulnerabilities.filter((v) => v.severity === "LOW");

  const lines: TerminalLine[] = [
    blank(),
    success("  [*] Initialisation du scan OT..."),
    success("  [*] Cible : Parc Disneyland Paris — Reseau OT"),
    success("  [*] Methode : Scan passif + interrogation registres"),
    success(
      `  [*] Perimetre : ${vulnerabilities.length} assets analyses`
    ),
    blank(),
    warning(
      `  [+] ${vulnerabilities.length} vulnerabilites detectees`
    ),
    error(
      `  [!] ${critical.length} CRITIQUES | ${high.length} HAUTES | ${medium.length} MOYENNES | ${low.length} BASSES`
    ),
    blank(),
  ];

  vulnerabilities.forEach((v) => {
    const severityColor =
      v.severity === "CRITICAL"
        ? "cyber-red"
        : v.severity === "HIGH"
          ? "cyber-yellow"
          : "muted";

    const statusLabel =
      v.status === "remediated"
        ? "[CORRIGE]"
        : v.status === "in_progress"
          ? "[EN COURS]"
          : "[OUVERT]";

    const statusColor =
      v.status === "remediated"
        ? "cyber-green"
        : v.status === "in_progress"
          ? "cyber-yellow"
          : "cyber-red";

    lines.push(
      line(
        `  ${v.id} | ${v.cve} | CVSS ${v.cvss} | ${v.severity}`,
        "output",
        severityColor
      )
    );
    lines.push(line(`    ${v.title}`));
    lines.push(line(`    Asset : ${v.asset}`));
    lines.push(line(`    Statut : ${statusLabel}`, "output", statusColor));
    lines.push(line(`    Recommandation : ${v.recommendation}`));
    lines.push(blank());
  });

  lines.push(success("  [*] Scan termine. Rapport genere."));
  lines.push(blank());

  return lines;
}

// ─── INVESTIGATE ────────────────────────────────────────────────────────────

function investigateCommand(): TerminalLine[] {
  const alert = alerts[0];
  if (!alert) return [error("  Aucune alerte disponible.")];

  const lines: TerminalLine[] = [
    blank(),
    error(`  [ALERTE] ${alert.title} — ${alert.source}`),
    error(`  Severite : ${alert.severity}`),
    line(`  ${alert.description}`),
    blank(),
    header("  CHRONOLOGIE DE L'INVESTIGATION"),
    blank(),
  ];

  alert.timeline.forEach((step, i) => {
    const phaseLabels: Record<string, string> = {
      Detection: "DETECTION",
      Triage: "TRIAGE",
      Analyse: "ANALYSE",
      Containment: "CONFINEMENT",
      Remediation: "REMEDIATION",
      "Post-mortem": "POST-MORTEM",
    };

    const phaseLabel = phaseLabels[step.phase] || step.phase.toUpperCase();

    lines.push(
      success(
        `  Phase ${i + 1} — ${phaseLabel} (${step.duration})`
      )
    );
    lines.push(warning(`  ${step.title}`));
    lines.push(line(`    ${step.description}`));
    lines.push(line(`    ${step.detail}`, "output", "muted"));
    lines.push(blank());
  });

  lines.push(
    success("  [OK] Investigation terminee. Incident cloture et documente.")
  );
  lines.push(blank());

  return lines;
}

// ─── DEPLOY ─────────────────────────────────────────────────────────────────

function deployCommand(): TerminalLine[] {
  return [
    blank(),
    header("  DEPLOIEMENT BITLOCKER D'URGENCE — RECIT OPERATIONNEL"),
    blank(),
    error("  [INCIDENT] Directive securite : chiffrement integral du parc"),
    line(
      "  Suite a un incident de securite, la direction exige le chiffrement"
    ),
    line(
      "  de l'ensemble des postes de travail dans un delai contraint."
    ),
    blank(),
    success("  Phase 1 — PREPARATION"),
    line("    - Audit de l'existant : inventaire TPM, etat BitLocker, OS compatibles"),
    line("    - Identification des prerequis : TPM 2.0, partitionnement GPT, UEFI"),
    line("    - Preparation des GPO de chiffrement BitLocker"),
    line("    - Creation du package Tanium pour deploiement automatise"),
    blank(),
    success("  Phase 2 — DEPLOIEMENT"),
    line("    - Deploiement progressif par lots de 50 machines via Tanium"),
    line("    - Monitoring en temps reel du statut de chiffrement"),
    line("    - Gestion des cas particuliers : machines sans TPM, disques MBR"),
    line("    - Sauvegarde centralisee des cles de recuperation dans Active Directory"),
    blank(),
    success("  Phase 3 — PROBLEMES & RESOLUTION"),
    line("    - Probleme : certaines machines bloquees au boot apres chiffrement"),
    line("    - Cause : conflit entre BitLocker et mise a jour BIOS pending"),
    line("    - Solution : script PowerShell d'auto-unlock avec cle de recuperation AD"),
    line("    - Developpement d'un outil de diagnostic automatise pour le support"),
    blank(),
    success("  Phase 4 — RESULTAT"),
    line("    - +1000 machines chiffrees en moins de 2 semaines"),
    line("    - Taux de reussite : 98.5% au premier passage"),
    line("    - Zero perte de donnees"),
    line("    - Processus documente et reproductible pour les futures machines"),
    blank(),
    warning(
      "  Competences mobilisees : Tanium, PowerShell, Active Directory, GPO, BitLocker"
    ),
    blank(),
  ];
}

// ─── AUDIT ──────────────────────────────────────────────────────────────────

function auditCommand(): TerminalLine[] {
  return [
    blank(),
    header("  AUDIT ISO 27001 — CHECKLIST DE CONFORMITE"),
    blank(),
    warning("  Contexte : Preparation d'un audit externe pour des investisseurs"),
    blank(),
    success("  A.5  Politiques de securite de l'information"),
    line("    [OK] Politique de securite definie et approuvee"),
    line("    [OK] Revue periodique de la politique"),
    blank(),
    success("  A.6  Organisation de la securite de l'information"),
    line("    [OK] Roles et responsabilites attribues"),
    line("    [OK] Separation des taches"),
    blank(),
    success("  A.8  Gestion des actifs"),
    line("    [OK] Inventaire des actifs (CMDB a jour)"),
    line("    [OK] Classification des informations"),
    blank(),
    success("  A.9  Controle d'acces"),
    line("    [OK] Politique de controle d'acces"),
    line("    [OK] Gestion des droits utilisateurs (AD, 3 domaines)"),
    line("    [OK] Revue des droits d'acces periodique"),
    blank(),
    success("  A.10 Cryptographie"),
    line("    [OK] Politique de chiffrement (BitLocker deploye)"),
    line("    [OK] Gestion des cles de chiffrement (AD + backup)"),
    blank(),
    success("  A.12 Securite des operations"),
    line("    [OK] Procedures operationnelles documentees"),
    line("    [OK] Protection contre les malwares (EDR Cybereason)"),
    line("    [OK] Sauvegarde des informations"),
    line("    [OK] Journalisation et surveillance (SIEM Rapid7)"),
    blank(),
    success("  A.13 Securite des communications"),
    line("    [OK] Migration FTP vers SFTP"),
    line("    [OK] Migration Telnet vers SSH"),
    line("    [OK] Migration HTTP vers HTTPS"),
    line("    [OK] Migration LDAP vers LDAPS"),
    line("    [OK] Migration SMTP vers SMTPS"),
    blank(),
    success("  A.14 Acquisition, developpement et maintenance"),
    line("    [OK] Exigences de securite dans les developpements"),
    line("    [OK] Tests de securite"),
    blank(),
    success("  A.16 Gestion des incidents de securite"),
    line("    [OK] Procedures de reponse aux incidents"),
    line("    [OK] Signalement des evenements de securite"),
    line("    [OK] Collecte de preuves"),
    blank(),
    success("  A.18 Conformite"),
    line("    [OK] Identification des exigences legales"),
    line("    [OK] Revues de la conformite technique"),
    blank(),
    warning(
      "  Resultat : Audit reussi — conformite demontree aux investisseurs"
    ),
    blank(),
  ];
}

// ─── AUTOMATE ───────────────────────────────────────────────────────────────

function automateCommand(): TerminalLine[] {
  return [
    blank(),
    header("  AUTOMATISATION — EXEMPLES CONCRETS"),
    blank(),
    success("  1. ANSIBLE — Playbooks de securisation (~100 machines)"),
    blank(),
    line("    # Exemple : Durcissement SSH sur le parc", "output", "muted"),
    line("    - name: Securiser la configuration SSH"),
    line("      hosts: all"),
    line("      tasks:"),
    line("        - name: Desactiver l'authentification par mot de passe"),
    line("          lineinfile:"),
    line("            path: /etc/ssh/sshd_config"),
    line("            regexp: '^PasswordAuthentication'"),
    line("            line: 'PasswordAuthentication no'"),
    line("        - name: Desactiver l'acces root"),
    line("          lineinfile:"),
    line("            path: /etc/ssh/sshd_config"),
    line("            regexp: '^PermitRootLogin'"),
    line("            line: 'PermitRootLogin no'"),
    blank(),
    success("  2. TANIUM + POWERSHELL — Deploiement BitLocker"),
    blank(),
    line("    # Script de deploiement automatise", "output", "muted"),
    line("    $tpm = Get-Tpm"),
    line("    if ($tpm.TpmPresent -and $tpm.TpmReady) {"),
    line("        Enable-BitLocker -MountPoint 'C:'"),
    line("            -EncryptionMethod XtsAes256"),
    line("            -RecoveryPasswordProtector"),
    line("        Backup-BitLockerKeyProtector -MountPoint 'C:'"),
    line("            -KeyProtectorId (Get-BitLockerVolume -MountPoint 'C:'"),
    line("            ).KeyProtector[1].KeyProtectorId"),
    line("    }"),
    blank(),
    success(
      "  3. ACTIVE DIRECTORY — Gestion automatisee (3 domaines)"
    ),
    blank(),
    line("    # Audit des comptes inactifs", "output", "muted"),
    line(
      "    $inactifs = Search-ADAccount -AccountInactive -TimeSpan 90.00:00:00"
    ),
    line("    $inactifs | ForEach-Object {"),
    line("        Disable-ADAccount -Identity $_.SamAccountName"),
    line(
      '        Set-ADUser $_ -Description "Desactive auto - inactif 90j"'
    ),
    line("    }"),
    line('    $inactifs | Export-Csv "rapport_inactifs.csv"'),
    blank(),
    success("  4. DESACTIVATION SMBv1 — Parc complet"),
    blank(),
    line("    # Deploiement via GPO + validation Tanium", "output", "muted"),
    line("    Disable-WindowsOptionalFeature -Online"),
    line("        -FeatureName SMB1Protocol -NoRestart"),
    line("    Set-SmbServerConfiguration"),
    line("        -EnableSMB1Protocol $false -Force"),
    blank(),
    warning(
      "  Resultat : reduction de 70% des taches manuelles repetitives"
    ),
    blank(),
  ];
}

// ─── MOTIVATION ─────────────────────────────────────────────────────────────

function motivationCommand(): TerminalLine[] {
  return [
    blank(),
    header(
      "  ╔══════════════════════════════════════════════════════════╗"
    ),
    header(
      "  ║  POURQUOI DISNEY — POURQUOI CE POSTE                   ║"
    ),
    header(
      "  ╚══════════════════════════════════════════════════════════╝"
    ),
    blank(),
    success("  LA CONVERGENCE PARFAITE"),
    blank(),
    line(
      "  Disneyland Paris n'est pas seulement un parc d'attractions."
    ),
    line(
      "  C'est un ecosysteme technologique complexe ou la cybersecurite"
    ),
    line(
      "  protege a la fois des vies humaines et la magie de l'experience."
    ),
    blank(),
    line(
      "  La securite OT dans un parc comme Disney, c'est la ou mon"
    ),
    line(
      "  experience prend tout son sens : chaque automate protege, chaque"
    ),
    line(
      "  vulnerabilite corrigee, chaque incident maitrise contribue"
    ),
    line(
      "  directement a la securite des visiteurs."
    ),
    blank(),
    success("  CE QUE J'APPORTE"),
    blank(),
    line(
      "  Mon experience en Fintech m'a forge dans un environnement"
    ),
    line(
      "  hautement reglemente ou la rigueur est non negociable."
    ),
    line(
      "  J'ai gere un parc de +1000 machines, deploye des solutions"
    ),
    line(
      "  de securite a grande echelle et pilote des projets de conformite."
    ),
    blank(),
    line(
      "  Mais au-dela des competences techniques, c'est la capacite a"
    ),
    line(
      "  reagir sous pression, a automatiser l'ennuyeux et a toujours"
    ),
    line(
      "  chercher l'amelioration continue qui definit mon approche."
    ),
    blank(),
    success("  MA VISION"),
    blank(),
    line(
      "  Je veux contribuer a faire de Disneyland Paris un modele de"
    ),
    line(
      "  cybersecurite industrielle, ou la protection des systemes OT"
    ),
    line(
      "  est aussi exemplaire que l'experience offerte aux visiteurs."
    ),
    blank(),
    line(
      "  Ce site lui-meme est une preuve : j'investis mon temps et mes"
    ),
    line(
      "  competences fullstack pour montrer ma motivation. Ce n'est pas"
    ),
    line(
      "  juste une candidature, c'est une demonstration de ce que je"
    ),
    line(
      "  peux construire quand un projet me passionne."
    ),
    blank(),
    warning("  \"La ou il y a de la magie, il faut un gardien.\""),
    blank(),
  ];
}

// ─── CONTACT ────────────────────────────────────────────────────────────────

function contactCommand(): TerminalLine[] {
  return [
    blank(),
    header("  INFORMATIONS DE CONTACT"),
    blank(),
    success(`  Nom        : ${profile.name}`),
    line(`  Poste      : ${profile.title}`),
    line(`  Email      : ${profile.email}`),
    line(`  Telephone  : ${profile.phone}`),
    line(`  GitHub     : ${profile.github}`),
    line(`  Mobilite   : ${profile.location}`),
    blank(),
    line(`  Formation  : ${profile.education}`),
    line(`  Langues    : ${profile.languages.join(", ")}`),
    blank(),
  ];
}

// ─── ROUTER ─────────────────────────────────────────────────────────────────

const commands: Record<string, () => TerminalLine[]> = {
  help: helpCommand,
  whoami: whoamiCommand,
  skills: skillsCommand,
  experience: experienceCommand,
  missions: missionsCommand,
  scan: scanCommand,
  investigate: investigateCommand,
  deploy: deployCommand,
  audit: auditCommand,
  automate: automateCommand,
  motivation: motivationCommand,
  contact: contactCommand,
};

export function processCommand(input: string): TerminalLine[] {
  const cmd = input.trim().toLowerCase().split(/\s+/)[0];

  if (cmd === "clear") {
    return [];
  }

  const handler = commands[cmd];
  if (handler) {
    return handler();
  }

  return [
    blank(),
    error(
      `  Commande inconnue : '${cmd}'. Tapez 'help' pour la liste des commandes.`
    ),
    blank(),
  ];
}
