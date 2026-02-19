export interface Vulnerability {
  id: string;
  cve: string;
  title: string;
  asset: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  cvss: number;
  description: string;
  recommendation: string;
  status: "open" | "in_progress" | "remediated";
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: "VLN-001",
    cve: "CVE-2024-38876",
    title: "Execution de code a distance sur Siemens SIMATIC S7-1500",
    asset: "Space Mountain -- PLC principal S7-1500 (CPU 1518F-4)",
    severity: "CRITICAL",
    cvss: 9.8,
    description:
      "Vulnerabilite dans le serveur web integre du SIMATIC S7-1500 permettant l'execution de code arbitraire sans authentification via une requete HTTP specialement formee.",
    recommendation:
      "Appliquer le correctif Siemens SSA-2024-071. En attendant, desactiver le serveur web integre et restreindre l'acces au reseau de gestion via ACL firewall.",
    status: "in_progress",
  },
  {
    id: "VLN-002",
    cve: "CVE-2024-10920",
    title: "Debordement de tampon dans le protocole Modbus/TCP",
    asset: "Pirates des Caraibes -- Passerelle Modbus MGate 5105",
    severity: "HIGH",
    cvss: 8.1,
    description:
      "Un debordement de tampon dans le traitement des trames Modbus/TCP permet a un attaquant distant d'executer du code ou de provoquer un deni de service sur la passerelle Moxa MGate.",
    recommendation:
      "Mettre a jour le firmware MGate vers la version 4.6.2 ou superieure. Deployer une regle IDS pour detecter les trames Modbus malformees.",
    status: "remediated",
  },
  {
    id: "VLN-003",
    cve: "CVE-2025-02145",
    title: "Contournement d'authentification OPC-UA",
    asset: "Big Thunder Mountain -- Serveur OPC-UA supervision SCADA",
    severity: "HIGH",
    cvss: 7.5,
    description:
      "Une faille dans l'implementation du protocole OPC-UA permet de contourner l'authentification par certificat en exploitant une validation insuffisante de la chaine de confiance.",
    recommendation:
      "Appliquer le patch editeur OPC Foundation. Verifier et renouveler tous les certificats OPC-UA. Activer le mode Security Policy Basic256Sha256 minimum.",
    status: "in_progress",
  },
  {
    id: "VLN-004",
    cve: "CVE-2024-45032",
    title: "Elevation de privileges SCADA WinCC",
    asset: "Hyperspace Mountain -- Station SCADA WinCC Professional",
    severity: "HIGH",
    cvss: 7.8,
    description:
      "Une elevation de privileges locale dans Siemens WinCC permet a un utilisateur authentifie d'obtenir des droits administrateur sur la station SCADA via une DLL malveillante.",
    recommendation:
      "Appliquer la mise a jour WinCC V8.0 SP1. Restreindre les droits d'installation avec AppLocker. Activer la surveillance d'integrite des DLL systeme.",
    status: "open",
  },
  {
    id: "VLN-005",
    cve: "CVE-2024-33655",
    title: "Protocole SMBv1 active sur les postes HMI",
    asset: "Parc entier -- 23 postes HMI Windows 10",
    severity: "HIGH",
    cvss: 8.6,
    description:
      "Le protocole SMBv1, connu pour ses vulnerabilites critiques (EternalBlue), est encore actif sur 23 postes HMI du parc. Risque de propagation laterale en cas de compromission.",
    recommendation:
      "Desactiver SMBv1 via GPO et script PowerShell sur l'ensemble des postes. Verifier la compatibilite des applications OT avec SMBv2/v3 avant desactivation.",
    status: "remediated",
  },
  {
    id: "VLN-006",
    cve: "CVE-2025-01287",
    title: "Injection de commandes dans l'interface web du switch industriel",
    asset: "Le Chateau -- Switch Hirschmann RS20-0800",
    severity: "CRITICAL",
    cvss: 9.1,
    description:
      "L'interface web d'administration du switch industriel Hirschmann est vulnerable a une injection de commandes OS via le champ de configuration SNMP, permettant un acces root.",
    recommendation:
      "Mettre a jour le firmware Hirschmann vers la version HiOS 9.6.2. Desactiver l'interface web et administrer uniquement via CLI avec SSH. Restreindre l'acces SNMP aux IP de supervision.",
    status: "open",
  },
  {
    id: "VLN-007",
    cve: "CVE-2024-50563",
    title: "Credentials par defaut sur le controleur DMX",
    asset: "Le Chateau -- Controleur eclairage DMX-CH-01 a DMX-CH-08",
    severity: "MEDIUM",
    cvss: 6.5,
    description:
      "Les controleurs d'eclairage DMX utilisent des identifiants par defaut (admin/admin) pour l'interface de configuration. Un attaquant sur le segment OT pourrait prendre le controle de l'eclairage.",
    recommendation:
      "Changer immediatement les mots de passe par defaut. Deployer une politique de mots de passe robustes. Ajouter les controleurs au perimetre de supervision des comptes.",
    status: "remediated",
  },
  {
    id: "VLN-008",
    cve: "CVE-2025-03892",
    title: "Absence de chiffrement sur le bus Profinet",
    asset: "Big Thunder Mountain -- Reseau Profinet (12 equipements)",
    severity: "MEDIUM",
    cvss: 5.9,
    description:
      "Les communications Profinet entre le PLC et les variateurs de frequence ne sont pas chiffrees, permettant l'interception et la modification des commandes de controle en cas d'acces au segment reseau.",
    recommendation:
      "Activer Profinet Security (TLS) sur les equipements compatibles. Pour les equipements legacy, deployer des tunnels VPN industriels point-a-point. Renforcer la segmentation physique.",
    status: "in_progress",
  },
  {
    id: "VLN-009",
    cve: "CVE-2024-42345",
    title: "Certificat TLS expire sur le serveur OPC-UA",
    asset: "Hyperspace Mountain -- Serveur OPC-UA (port 4840)",
    severity: "LOW",
    cvss: 4.3,
    description:
      "Le certificat TLS du serveur OPC-UA a expire depuis 12 jours, empechant la validation de l'identite du serveur par les clients et exposant les communications a des attaques de type man-in-the-middle.",
    recommendation:
      "Renouveler le certificat TLS aupres de l'autorite de certification interne. Mettre en place un monitoring d'expiration des certificats avec alerte 30 jours avant echeance.",
    status: "open",
  },
  {
    id: "VLN-010",
    cve: "CVE-2025-00478",
    title: "Firmware obsolete sur les variateurs ABB ACS880",
    asset: "Space Mountain -- 4 variateurs ABB ACS880",
    severity: "MEDIUM",
    cvss: 6.1,
    description:
      "Les variateurs de frequence ABB ACS880 executent un firmware en version 3.12.0, connue pour une vulnerabilite de deni de service via le protocole Modbus/TCP. La version corrigee 3.14.2 est disponible.",
    recommendation:
      "Planifier une fenetre de maintenance pour mettre a jour le firmware vers la version 3.14.2. Tester la mise a jour sur un variateur isole avant deploiement. Verifier la compatibilite avec la configuration PLC.",
    status: "in_progress",
  },
];

/** Score de risque global (0-100) -- calcule a partir des vulnerabilites ouvertes et en cours */
export const riskScore = 62;
