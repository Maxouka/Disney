export interface AlertStep {
  phase:
    | "Detection"
    | "Triage"
    | "Analyse"
    | "Containment"
    | "Remediation"
    | "Post-mortem";
  title: string;
  description: string;
  detail: string;
  duration: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  source: string;
  description: string;
  timeline: AlertStep[];
}

export const alerts: Alert[] = [
  // ─── 1. Acces PLC non autorise ──────────────────────────────────────
  {
    id: "ALT-001",
    title: "Acces non autorise au PLC Siemens S7-1500",
    severity: "CRITICAL",
    source: "Space Mountain",
    description:
      "Une tentative d'ecriture dans les registres de l'automate Siemens S7-1500 a ete detectee depuis un poste ne figurant pas dans l'inventaire des equipements autorises du segment OT.",
    timeline: [
      {
        phase: "Detection",
        title: "Alerte firewall industriel",
        description:
          "Le pare-feu industriel a bloque une requete Modbus fonction 0x06 (Write Single Register) provenant de l'IP 10.42.99.5.",
        detail:
          "Regle IDPS Suricata SID:2025001 -- Modbus Write depuis source non whitelistee. Correlation SIEM Rapid7 InsightIDR avec l'asset base.",
        duration: "instantane",
      },
      {
        phase: "Triage",
        title: "Qualification de la menace",
        description:
          "Verification de l'adresse IP source dans le CMDB et les bases de threat intelligence.",
        detail:
          "IP 10.42.99.5 absente du CMDB. Scan Nmap rapide : OS Windows 10, ports 135/445 ouverts. Aucune correspondance dans les IoC connus. Severite relevee a CRITIQUE.",
        duration: "5 min",
      },
      {
        phase: "Analyse",
        title: "Investigation forensique reseau",
        description:
          "Analyse des captures PCAP du segment OT et des journaux d'authentification.",
        detail:
          "Wireshark : 14 trames Modbus/TCP vers le PLC en 3 min (lectures registres puis tentative ecriture). Logs AD : connexion RDP depuis VPN avec compte de service desactive. Pivot lateral probable.",
        duration: "25 min",
      },
      {
        phase: "Containment",
        title: "Isolation du poste compromis",
        description:
          "Isolation reseau immediate du poste et verification de l'integrite du PLC.",
        detail:
          "ACL firewall : deny all depuis/vers 10.42.99.5. Verification registres PLC via TIA Portal : aucune modification effectuee (ecriture bloquee). Quarantaine EDR Cybereason appliquee.",
        duration: "10 min",
      },
      {
        phase: "Remediation",
        title: "Renforcement de la securite du segment",
        description:
          "Application de mesures correctives sur l'ensemble du segment OT Space Mountain.",
        detail:
          "Rotation des credentials comptes de service. Ajout regle firewall : whitelist stricte MAC+IP pour acces Modbus. Activation authentification S7 sur le PLC. Deploiement agent Tanium sur les postes HMI manquants.",
        duration: "2h",
      },
      {
        phase: "Post-mortem",
        title: "Rapport d'incident et ameliorations",
        description:
          "Documentation complete de l'incident et plan d'amelioration continue.",
        detail:
          "Cause racine : compte de service VPN non desactive apres depart prestataire. Actions : revue trimestrielle des comptes de service, segmentation micro-VLAN par attraction, deploiement NAC 802.1X sur le segment OT.",
        duration: "1 jour",
      },
    ],
  },

  // ─── 2. Trafic anomal SCADA ─────────────────────────────────────────
  {
    id: "ALT-002",
    title: "Trafic reseau anomal sur le reseau SCADA",
    severity: "HIGH",
    source: "Big Thunder Mountain",
    description:
      "Une augmentation de 300% du trafic reseau a ete detectee sur le segment SCADA de Big Thunder Mountain, avec des flux sortants inhabituels vers la passerelle OT/IT.",
    timeline: [
      {
        phase: "Detection",
        title: "Anomalie detectee par PRTG",
        description:
          "Le monitoring PRTG a declenche une alerte sur la bande passante du switch OT -- depassement du seuil de 100 Mbps.",
        detail:
          "Capteur NetFlow PRTG : pic a 340 Mbps sur interface Gi0/12 (SCADA VLAN). Baseline habituel : 80 Mbps. Correlation temporelle avec maintenance programmee inexistante.",
        duration: "2 min",
      },
      {
        phase: "Triage",
        title: "Identification des flux anormaux",
        description:
          "Analyse des flux reseau pour identifier la source et la destination du trafic excessif.",
        detail:
          "NetFlow analyse : station ingenierie 10.42.10.15 genere 85% du trafic vers gateway 10.42.0.1 (passerelle IT). Protocole : HTTPS sur port 443 vers IP externe. Volume : 2.1 Go en 30 min.",
        duration: "8 min",
      },
      {
        phase: "Analyse",
        title: "Investigation approfondie de l'exfiltration",
        description:
          "Analyse du contenu des flux suspects et du poste source.",
        detail:
          "Proxy logs : requetes vers service de stockage cloud non autorise. Analyse disque station : outil de synchronisation installe par un technicien pour sauvegarder des schemas. Pas de malware detecte -- erreur humaine confirmee.",
        duration: "45 min",
      },
      {
        phase: "Containment",
        title: "Blocage des flux non autorises",
        description:
          "Mise en place de regles de filtrage et restriction de la station concernee.",
        detail:
          "Proxy : ajout du domaine cloud en liste noire. Firewall OT : deny all outbound sauf destinations autorisees (serveur WSUS, NTP, SIEM). Desinstallation de l'outil de synchronisation non autorise.",
        duration: "15 min",
      },
      {
        phase: "Remediation",
        title: "Renforcement du filtrage sortant OT",
        description:
          "Implementation d'un filtrage strict des flux sortants sur l'ensemble des segments OT.",
        detail:
          "Deploiement proxy dedie OT avec whitelist de destinations. GPO : interdiction d'installation logicielle sans droits admin. Mise a jour politique de securite OT : aucun acces Internet direct depuis le segment SCADA.",
        duration: "4h",
      },
      {
        phase: "Post-mortem",
        title: "Sensibilisation et documentation",
        description:
          "Formation equipe maintenance et mise a jour des procedures.",
        detail:
          "Session sensibilisation cybersecurite pour les equipes OT. Documentation : procedure de sauvegarde schemas via partage reseau securise. KPI ajoute au dashboard : volume trafic sortant OT/IT par segment.",
        duration: "2 jours",
      },
    ],
  },

  // ─── 3. Integrite firmware ──────────────────────────────────────────
  {
    id: "ALT-003",
    title: "Echec de verification d'integrite firmware",
    severity: "HIGH",
    source: "Le Chateau",
    description:
      "La verification automatique d'integrite du firmware du controleur d'eclairage DMX a echoue -- le hash SHA-256 ne correspond pas a la reference stockee dans le CMDB.",
    timeline: [
      {
        phase: "Detection",
        title: "Hash firmware non concordant",
        description:
          "Le script de verification d'integrite quotidien a detecte une divergence de hash sur le controleur DMX-CH-04.",
        detail:
          "Hash attendu : a3f2...8c1d. Hash actuel : 7e91...b4f2. Script PowerShell de verification integrite execute via Tanium -- comparaison avec baseline CMDB. Delta detecte a 03:00 lors du scan nocturne.",
        duration: "instantane",
      },
      {
        phase: "Triage",
        title: "Evaluation de l'impact",
        description:
          "Determination de la criticite -- le controleur gere l'eclairage de securite du Chateau.",
        detail:
          "Le controleur DMX-CH-04 pilote 24 circuits d'eclairage dont 8 circuits de securite (issues de secours). Impact potentiel : non-conformite reglementaire ERP. Priorisation immediate.",
        duration: "5 min",
      },
      {
        phase: "Analyse",
        title: "Comparaison des firmwares",
        description:
          "Extraction et analyse differrentielle du firmware actuel par rapport a la version de reference.",
        detail:
          "Extraction firmware via interface JTAG. Diff binaire : modification dans le module de communication (offset 0x4A00-0x4C00). Analyse statique : ajout d'un handler HTTP non documente sur port 8080. Origine : mise a jour constructeur non validee appliquee par erreur.",
        duration: "1h30",
      },
      {
        phase: "Containment",
        title: "Isolation et mode degrade",
        description:
          "Basculement en mode manuel et isolation reseau du controleur.",
        detail:
          "Passage eclairage securite en mode manuel (bypass controleur). Deconnexion port switch OT du DMX-CH-04. Notification equipe exploitation pour supervision manuelle temporaire.",
        duration: "10 min",
      },
      {
        phase: "Remediation",
        title: "Reflashage firmware valide",
        description:
          "Reinstallation du firmware de reference valide et revalidation de l'integrite.",
        detail:
          "Reflashage via JTAG avec firmware signe v2.8.1 depuis depot securise. Verification hash post-installation : OK. Re-certification fonctionnelle des 24 circuits. Mise a jour baseline CMDB.",
        duration: "3h",
      },
      {
        phase: "Post-mortem",
        title: "Securisation de la chaine de mise a jour",
        description:
          "Mise en place d'un processus de validation des firmwares avant deploiement.",
        detail:
          "Procedure : tout firmware doit etre valide en environnement de test avant production. Signature numerique obligatoire. Ajout check d'integrite en temps reel (pas seulement scan quotidien). Alerte SIEM sur modification firmware hors fenetre de maintenance.",
        duration: "1 jour",
      },
    ],
  },

  // ─── 4. Brute force HMI ────────────────────────────────────────────
  {
    id: "ALT-004",
    title: "Attaque par force brute sur l'interface HMI",
    severity: "CRITICAL",
    source: "Pirates des Caraibes",
    description:
      "47 tentatives d'authentification echouees en 2 minutes detectees sur l'interface homme-machine de supervision de Pirates des Caraibes, provenant d'une IP interne.",
    timeline: [
      {
        phase: "Detection",
        title: "Seuil de tentatives atteint",
        description:
          "La regle de correlation SIEM a detecte un depassement du seuil de 10 echecs d'authentification par minute.",
        detail:
          "InsightIDR alerte : 47 tentatives login echouees sur HMI-PC-05 (10.42.5.200 -> 10.42.5.50). Comptes cibles : admin, operateur, maintenance, superviseur. Schema d'attaque par dictionnaire identifie.",
        duration: "instantane",
      },
      {
        phase: "Triage",
        title: "Identification de la source",
        description:
          "Localisation physique et logique du poste a l'origine de l'attaque.",
        detail:
          "IP 10.42.5.200 : poste de maintenance zone technique Pirates. CMDB : poste partage equipe technique. Dernier login legitime : 6h avant l'incident. Aucun ticket de maintenance en cours sur cette plage horaire.",
        duration: "5 min",
      },
      {
        phase: "Analyse",
        title: "Analyse forensique du poste source",
        description:
          "Investigation des processus, connexions et historique du poste de maintenance.",
        detail:
          "EDR Cybereason : processus suspect hydra.exe lance via cmd.exe. Parent process : explorer.exe (session interactive). Cle USB detectee dans les logs systeme 10 min avant l'attaque. Artefact : wordlist personnalisee contenant des termes Disney.",
        duration: "30 min",
      },
      {
        phase: "Containment",
        title: "Verrouillage immediat",
        description:
          "Verrouillage des comptes cibles et isolation du poste compromis.",
        detail:
          "Verrouillage comptes AD cibles. Kill process hydra.exe via EDR. Isolation reseau du poste 10.42.5.200. Desactivation ports USB sur tous les postes HMI via GPO d'urgence. Changement mots de passe comptes de service HMI.",
        duration: "8 min",
      },
      {
        phase: "Remediation",
        title: "Renforcement authentification HMI",
        description:
          "Deploiement de mesures de securite renforcees sur les postes de supervision.",
        detail:
          "Deploiement MFA sur les interfaces HMI critiques. Politique de verrouillage : 5 tentatives, verrouillage 30 min. Application control : whitelist d'executables autorises via AppLocker. Chiffrement BitLocker sur tous les postes HMI.",
        duration: "6h",
      },
      {
        phase: "Post-mortem",
        title: "Enquete interne et prevention",
        description:
          "Investigation sur l'origine de la cle USB et renforcement des procedures d'acces.",
        detail:
          "Cle USB tracee via numero de serie -- non repertoriee dans l'inventaire. Cameras de securite examinees pour identifier l'auteur. Actions : NAC 802.1X sur tous les ports OT, badge obligatoire pour acces zone technique, desactivation USB par defaut, session sensibilisation trimestrielle.",
        duration: "3 jours",
      },
    ],
  },

  // ─── 5. Protocole suspect segment OT ────────────────────────────────
  {
    id: "ALT-005",
    title: "Protocole suspect detecte sur le segment OT",
    severity: "MEDIUM",
    source: "Hyperspace Mountain",
    description:
      "Un protocole reseau non repertorie dans la matrice des flux autorises a ete detecte sur le segment OT de Hyperspace Mountain, avec des communications vers un port inhabituel.",
    timeline: [
      {
        phase: "Detection",
        title: "Signature protocole inconnue",
        description:
          "L'IDS industriel a detecte des trames sur le port 44818 ne correspondant a aucun protocole autorise dans la politique de securite OT.",
        detail:
          "Suricata alerte : unknown_protocol sur port 44818/TCP. Source : 10.42.8.30 (station ingenierie). Destination : 10.42.8.100 (gateway OT). 230 paquets en 15 min. Deep packet inspection : structure non standard.",
        duration: "3 min",
      },
      {
        phase: "Triage",
        title: "Classification du trafic",
        description:
          "Determination de la nature du protocole et du risque associe.",
        detail:
          "Analyse payload : structure similaire a EtherNet/IP (CIP) mais avec en-tete modifie. Port 44818 = port standard EtherNet/IP. Hypothese : outil de diagnostic constructeur utilisant une variante proprietaire. Risque moyen -- pas de signature malveillante.",
        duration: "15 min",
      },
      {
        phase: "Analyse",
        title: "Identification de l'outil source",
        description:
          "Recherche de l'application generant le trafic sur la station ingenierie.",
        detail:
          "Connexion a la station 10.42.8.30 : outil Rockwell Studio 5000 v34 recemment installe. Version incluant un nouveau module de diagnostic utilisant un sous-protocole CIP etendu. Non reference dans la matrice des flux car mise a jour recente.",
        duration: "20 min",
      },
      {
        phase: "Containment",
        title: "Autorisation conditionnelle",
        description:
          "Maintien du trafic sous surveillance renforcee en attendant la validation.",
        detail:
          "Regle IDS temporaire : journalisation detaillee de tout trafic port 44818 (sans blocage). Rate limiting : 100 paquets/min maximum. Notification temps reel au SOC pour tout depassement.",
        duration: "10 min",
      },
      {
        phase: "Remediation",
        title: "Mise a jour de la matrice des flux",
        description:
          "Validation et integration du nouveau protocole dans la politique de securite.",
        detail:
          "Validation aupres de Rockwell de la legitimite du sous-protocole. Mise a jour matrice des flux : ajout regle CIP-Extended sur port 44818 avec source/destination specifiques. Signature IDS personnalisee creee pour differencier trafic legitime et anomal.",
        duration: "1 jour",
      },
      {
        phase: "Post-mortem",
        title: "Processus de gestion des changements",
        description:
          "Amelioration du processus de validation avant installation d'outils sur le segment OT.",
        detail:
          "Procedure change management OT mise a jour : toute installation logicielle doit inclure une analyse des flux reseau generes. Test en environnement isole obligatoire. Mise a jour automatique de la matrice des flux dans le CMDB apres validation. Revue mensuelle des protocoles detectes.",
        duration: "2 jours",
      },
    ],
  },
];
