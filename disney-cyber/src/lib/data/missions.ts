export interface MissionMapping {
  mission: string;
  experience: string;
  tools: string;
  where: string;
}

export const missionMappings: MissionMapping[] = [
  {
    mission:
      "Assurer le monitoring de la securite via le SIEM et la correlation d'evenements",
    experience:
      "Investigation quotidienne d'alertes sur le SIEM Rapid7 InsightIDR. Correlation des evenements entre EDR Cybereason et logs reseau pour detecter les menaces avancees en environnement Fintech.",
    tools: "Rapid7 InsightIDR, Cybereason EDR, Suricata, Wireshark",
    where: "Space Mountain -- Centre des Operations de Securite",
  },
  {
    mission:
      "Reagir aux incidents de securite et coordonner la gestion de crise",
    experience:
      "Deploiement de BitLocker en urgence sur l'ensemble du parc suite a un incident de securite. Resolution des problemes de cles de recuperation. Developpement de scripts d'auto-unlock pour assurer la continuite de service.",
    tools: "BitLocker, Tanium, PowerShell, Active Directory",
    where: "Pirates des Caraibes -- Reponse a incident & Gestion de crise",
  },
  {
    mission:
      "Piloter la conformite aux referentiels de securite (ISO 27001) et preparer les audits",
    experience:
      "Pilotage du plan de remediation ISO 27001 pour un audit externe investisseurs. Migrations securitaires completes : FTP vers SFTP, Telnet vers SSH, HTTP vers HTTPS, LDAP vers LDAPS, SMTP vers SMTPS. Renforce la gestion des secrets.",
    tools: "Referentiel ISO 27001, outils d'audit, SFTP, SSH, TLS",
    where: "Le Chateau -- Conformite & Gouvernance ISO 27001",
  },
  {
    mission:
      "Proteger les systemes de controle industriel et assurer la securite des infrastructures OT",
    experience:
      "Gestion d'une infrastructure de plus de 1000 machines virtuelles. Monitoring continu avec PRTG 24/7. Administration reseaux multi-sites avec segmentation IT/OT.",
    tools: "PRTG, VMware vSphere, firewall industriel, Profinet",
    where: "Big Thunder Mountain -- Securite des Systemes Industriels",
  },
  {
    mission:
      "Identifier, prioriser et remedier les vulnerabilites sur l'ensemble du parc",
    experience:
      "Deploiement de Tanium sur plus de 1000 VMs pour le patch management centralise. Gestion des mises a jour via WSUS. Desactivation de SMBv1 a l'echelle du parc pour eliminer les vecteurs d'attaque connus.",
    tools: "Tanium, WSUS, PowerShell, Nessus",
    where: "Hyperspace Mountain -- Gestion des Vulnerabilites a Grande Echelle",
  },
  {
    mission:
      "Automatiser les taches de securite et orchestrer les reponses aux incidents",
    experience:
      "Creation de playbooks Ansible sur un parc de ~100 machines. Packages Tanium et scripts PowerShell pour le deploiement automatise de BitLocker. Gestion Active Directory automatisee sur 3 domaines.",
    tools: "Ansible, Tanium, PowerShell, Active Directory",
    where: "Buzz Lightyear -- Automatisation & Orchestration",
  },
  {
    mission:
      "Administrer et securiser les infrastructures systemes et reseaux",
    experience:
      "Administration systeme de plus de 1000 VMs (VMware). Gestion des astreintes 24/7. Configuration et maintien des firewalls, VLANs et segmentation reseau. Migration des protocoles non securises.",
    tools: "VMware vSphere, PRTG, Active Directory, GPO, firewalls",
    where: "Big Thunder Mountain -- Architecture OT & Space Mountain -- SOC",
  },
  {
    mission:
      "Contribuer au developpement et a la maintenance des outils de securite internes",
    experience:
      "Developpement fullstack d'applications web de securite. Creation de scripts et d'outils d'automatisation PowerShell pour la gestion des postes et des serveurs. Package Tanium personnalises.",
    tools: "TypeScript, React, Node.js, PowerShell, Python, Tanium",
    where: "Buzz Lightyear -- Automatisation & Orchestration",
  },
  {
    mission:
      "Participer a la sensibilisation des equipes et a la documentation des procedures",
    experience:
      "Redaction de procedures de securite post-incident. Documentation des processus de deploiement et de remediation. Support technique et formation des equipes operationnelles sur les bonnes pratiques cyber.",
    tools: "Confluence, procedures operationnelles, supports de formation",
    where: "Le Chateau -- Conformite & Gouvernance ISO 27001",
  },
];
