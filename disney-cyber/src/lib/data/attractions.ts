export interface Attraction {
  id: string;
  name: string;
  cyberTitle: string;
  icon: string; // Icon name identifier, mapped to SVG in ParkMap
  mission: string;
  description: string;
  experience: string;
  demoType: "timeline" | "checklist" | "architecture" | "counter" | "playbook";
  demoData: any;
  color: string;
}

export const attractions: Attraction[] = [
  // ─── 1. Space Mountain → SOC / SIEM ─────────────────────────────────
  {
    id: "space-mountain",
    name: "Space Mountain",
    cyberTitle: "Centre des Operations de Securite (SOC)",
    icon: "rocket",
    mission:
      "Assurer le monitoring continu de la securite via le SIEM et la correlation d'evenements",
    description:
      "Le SOC est le coeur de la surveillance cyber. Il centralise les logs, detecte les menaces en temps reel grace au SIEM et orchestre la reponse aux incidents. Chaque alerte est triee, analysee et traitee selon une methodologie rigoureuse.",
    experience:
      "Utilisation quotidienne du SIEM Rapid7 InsightIDR pour l'investigation d'alertes de securite. Correlation d'evenements entre EDR Cybereason et logs reseau. Analyse de menaces et qualification des incidents en environnement Fintech.",
    demoType: "timeline",
    demoData: {
      title: "Investigation d'une alerte SOC",
      steps: [
        {
          label: "Detection",
          detail: "Alerte SIEM InsightIDR : connexion suspecte depuis IP non repertoriee sur le segment OT",
          duration: "instantane",
        },
        {
          label: "Enrichissement",
          detail: "Correlation EDR Cybereason : processus inconnu detecte sur le poste source. Recherche IoC dans les bases de threat intelligence",
          duration: "3 min",
        },
        {
          label: "Analyse",
          detail: "Examen des logs reseau, des flux NetFlow et des captures PCAP. Identification du vecteur d'attaque initial",
          duration: "15 min",
        },
        {
          label: "Qualification",
          detail: "Incident confirme : tentative de reconnaissance reseau depuis un poste compromis. Severite : HAUTE",
          duration: "5 min",
        },
        {
          label: "Escalade",
          detail: "Notification de l'equipe de reponse a incident. Creation du ticket et documentation initiale des artefacts",
          duration: "2 min",
        },
        {
          label: "Cloture",
          detail: "Rapport d'investigation complet. Mise a jour des regles de correlation SIEM. Ajout des IoC au blocklist",
          duration: "30 min",
        },
      ],
    },
    color: "#3B82F6",
  },

  // ─── 2. Pirates des Caraibes → Reponse a incident ──────────────────
  {
    id: "pirates-des-caraibes",
    name: "Pirates des Caraibes",
    cyberTitle: "Reponse a incident & Gestion de crise",
    icon: "pirate",
    mission:
      "Reagir rapidement aux incidents de securite et coordonner la gestion de crise",
    description:
      "La reponse a incident exige du sang-froid et de la methode. Du premier signal d'alerte a la remediation complete, chaque minute compte. L'objectif : contenir la menace, eradiquer le vecteur d'attaque et restaurer les operations le plus vite possible.",
    experience:
      "Deploiement de BitLocker en urgence sur l'ensemble du parc informatique suite a un incident de securite. Resolution du probleme des cles de recuperation perdues. Creation d'un script PowerShell d'auto-unlock pour assurer la continuite de service.",
    demoType: "timeline",
    demoData: {
      title: "Gestion de crise : deploiement BitLocker d'urgence",
      steps: [
        {
          label: "Alerte",
          detail: "Incident de securite detecte -- decision de chiffrer l'ensemble du parc en urgence pour proteger les donnees sensibles",
          duration: "T+0",
        },
        {
          label: "Planification eclair",
          detail: "Evaluation de l'impact : plus de 1000 postes a chiffrer. Preparation du package Tanium pour deploiement massif BitLocker",
          duration: "T+30 min",
        },
        {
          label: "Deploiement",
          detail: "Activation BitLocker via Tanium sur l'ensemble du parc. Supervision en temps reel du taux de deploiement",
          duration: "T+1h",
        },
        {
          label: "Gestion de crise",
          detail: "Detection du probleme : cles de recuperation non sauvegardees dans l'AD pour certains postes. Risque de perte d'acces",
          duration: "T+3h",
        },
        {
          label: "Resolution",
          detail: "Developpement d'un script PowerShell d'auto-unlock utilisant les protecteurs TPM+PIN. Deploiement du correctif sur les postes affectes",
          duration: "T+6h",
        },
        {
          label: "Stabilisation",
          detail: "100% du parc chiffre et operationnel. Sauvegarde centralisee des cles de recuperation dans l'AD. Documentation de la procedure",
          duration: "T+24h",
        },
      ],
    },
    color: "#EF4444",
  },

  // ─── 3. Le Chateau → ISO 27001 / Conformite ────────────────────────
  {
    id: "le-chateau",
    name: "Le Chateau",
    cyberTitle: "Conformite & Gouvernance ISO 27001",
    icon: "castle",
    mission:
      "Piloter la conformite aux referentiels de securite et preparer les audits",
    description:
      "La conformite est le socle de la confiance. ISO 27001 structure la gestion de la securite de l'information a travers des politiques, des controles et des audits reguliers. C'est la garantie que la securite n'est pas un accident mais un processus.",
    experience:
      "Pilotage du plan de remediation ISO 27001 en preparation d'un audit externe investisseurs. Migrations securitaires : FTP vers SFTP, Telnet vers SSH, HTTP vers HTTPS, LDAP vers LDAPS, SMTP vers SMTPS. Suppression des mots de passe en clair dans les configurations.",
    demoType: "checklist",
    demoData: {
      title: "Plan de remediation ISO 27001",
      items: [
        {
          label: "Migration FTP vers SFTP",
          description: "Remplacement de tous les transferts FTP non chiffres par SFTP sur l'ensemble de l'infrastructure",
          checked: true,
        },
        {
          label: "Migration Telnet vers SSH",
          description: "Suppression du protocole Telnet et migration de tous les acces distants vers SSH",
          checked: true,
        },
        {
          label: "Migration HTTP vers HTTPS",
          description: "Deploiement de certificats TLS sur toutes les interfaces web internes et externes",
          checked: true,
        },
        {
          label: "Migration LDAP vers LDAPS",
          description: "Activation du chiffrement TLS sur les annuaires LDAP pour proteger les donnees d'authentification",
          checked: true,
        },
        {
          label: "Migration SMTP vers SMTPS",
          description: "Securisation des flux de messagerie avec chiffrement TLS obligatoire",
          checked: true,
        },
        {
          label: "Suppression mots de passe en clair",
          description: "Audit et remediation de toutes les configurations contenant des secrets non chiffres",
          checked: true,
        },
        {
          label: "Politique de gestion des acces",
          description: "Definition et application du principe du moindre privilege sur l'ensemble des systemes",
          checked: true,
        },
        {
          label: "Plan de continuite d'activite",
          description: "Documentation et test du PCA/PRA pour les systemes critiques",
          checked: false,
        },
        {
          label: "Audit de conformite interne",
          description: "Revue complete des controles ISO 27001 avant l'audit externe",
          checked: false,
        },
      ],
    },
    color: "#8B5CF6",
  },

  // ─── 4. Big Thunder Mountain → Securite OT ─────────────────────────
  {
    id: "big-thunder-mountain",
    name: "Big Thunder Mountain",
    cyberTitle: "Securite des Systemes Industriels (OT)",
    icon: "mountain",
    mission:
      "Proteger les systemes de controle industriel et assurer la securite des infrastructures OT",
    description:
      "La securite OT protege les systemes physiques : automates, capteurs, actionneurs. Contrairement a l'IT, une faille OT peut avoir des consequences dans le monde reel. Le modele Purdue structure la defense en couches, de l'entreprise jusqu'aux equipements de terrain.",
    experience:
      "Gestion d'une infrastructure de plus de 1000 machines virtuelles. Monitoring continu avec PRTG. Astreintes 24/7 pour garantir la disponibilite des systemes critiques. Administration reseaux multi-sites.",
    demoType: "architecture",
    demoData: {
      title: "Architecture de securite OT (Modele Purdue)",
      layers: [
        {
          level: 5,
          name: "Zone Entreprise",
          description: "Reseau IT classique -- ERP, messagerie, Internet",
          components: ["Active Directory", "Serveurs applicatifs", "Postes bureautiques"],
          color: "#3B82F6",
        },
        {
          level: 4,
          name: "Zone DMZ IT/OT",
          description: "Zone demilitarisee separant les reseaux IT et OT",
          components: ["Firewall industriel", "Proxy OT", "Serveur de patchs WSUS"],
          color: "#8B5CF6",
        },
        {
          level: 3,
          name: "Operations du site",
          description: "Supervision et pilotage des operations",
          components: ["SCADA / PRTG", "Historian", "Serveur de supervision"],
          color: "#06B6D4",
        },
        {
          level: 2,
          name: "Controle de zone",
          description: "Controle et supervision locale des processus",
          components: ["Stations HMI", "Serveurs OPC-UA", "Postes ingenierie"],
          color: "#10B981",
        },
        {
          level: 1,
          name: "Controle basique",
          description: "Automates et controleurs de terrain",
          components: ["PLC Siemens S7-1500", "Variateurs ABB", "Controleurs DMX"],
          color: "#F59E0B",
        },
        {
          level: 0,
          name: "Processus physique",
          description: "Capteurs et actionneurs en contact avec le monde reel",
          components: ["Capteurs de temperature", "Capteurs vibration", "Moteurs et pompes"],
          color: "#EF4444",
        },
      ],
    },
    color: "#F59E0B",
  },

  // ─── 5. Hyperspace Mountain → Gestion Vulnerabilites ────────────────
  {
    id: "hyperspace-mountain",
    name: "Hyperspace Mountain",
    cyberTitle: "Gestion des Vulnerabilites a Grande Echelle",
    icon: "galaxy",
    mission:
      "Identifier, prioriser et remedier les vulnerabilites sur l'ensemble du parc informatique",
    description:
      "La gestion des vulnerabilites a l'echelle exige des outils performants et une methodologie rigoureuse. Scanner, prioriser par CVSS et contexte metier, deployer les correctifs, verifier -- en boucle continue sur des milliers d'assets.",
    experience:
      "Deploiement de Tanium sur plus de 1000 machines virtuelles pour le patch management centralise. Gestion des mises a jour via WSUS. Desactivation de SMBv1 a l'echelle du parc pour eliminer les vecteurs d'attaque connus.",
    demoType: "counter",
    demoData: {
      title: "Deploiement de securite a grande echelle",
      counters: [
        {
          label: "Machines couvertes par Tanium",
          target: 1047,
          unit: "VMs",
          icon: "monitor",
        },
        {
          label: "Patchs deployes ce trimestre",
          target: 3842,
          unit: "patchs",
          icon: "shield",
        },
        {
          label: "SMBv1 desactive",
          target: 100,
          unit: "%",
          icon: "lock",
        },
        {
          label: "Temps moyen de deploiement",
          target: 4,
          unit: "heures",
          icon: "clock",
        },
      ],
    },
    color: "#06B6D4",
  },

  // ─── 6. Buzz Lightyear → Automatisation ─────────────────────────────
  {
    id: "buzz-lightyear",
    name: "Buzz Lightyear",
    cyberTitle: "Automatisation & Orchestration",
    icon: "laser",
    mission:
      "Automatiser les taches de securite repetitives et orchestrer les reponses",
    description:
      "L'automatisation est le multiplicateur de force de la cybersecurite. Playbooks Ansible, scripts PowerShell, packages Tanium -- chaque tache automatisee libere du temps pour l'analyse et la strategie, tout en eliminant l'erreur humaine.",
    experience:
      "Creation et execution de playbooks Ansible sur un parc d'environ 100 machines. Developpement de packages Tanium et PowerShell pour le deploiement automatise de BitLocker. Scripts PowerShell pour la gestion Active Directory sur 3 domaines distincts.",
    demoType: "playbook",
    demoData: {
      title: "Playbook d'automatisation securite",
      playbooks: [
        {
          name: "deploiement-bitlocker.yml",
          description: "Chiffrement automatise du parc via Tanium et PowerShell",
          steps: [
            { task: "Verification prerequis TPM 2.0", status: "ok" },
            { task: "Installation du module BitLocker", status: "ok" },
            { task: "Activation du chiffrement AES-256", status: "ok" },
            { task: "Sauvegarde cle de recuperation dans l'AD", status: "ok" },
            { task: "Verification post-deploiement", status: "ok" },
          ],
        },
        {
          name: "hardening-ad.yml",
          description: "Durcissement Active Directory sur 3 domaines",
          steps: [
            { task: "Desactivation des comptes inactifs (> 90 jours)", status: "ok" },
            { task: "Application des GPO de securite", status: "ok" },
            { task: "Rotation des mots de passe comptes de service", status: "ok" },
            { task: "Activation audit avance des evenements", status: "ok" },
            { task: "Verification conformite des delegations", status: "running" },
          ],
        },
        {
          name: "patch-management.yml",
          description: "Deploiement de correctifs via WSUS et Tanium",
          steps: [
            { task: "Scan des vulnerabilites en attente", status: "ok" },
            { task: "Telechargement des correctifs approuves", status: "ok" },
            { task: "Deploiement sur le groupe pilote", status: "ok" },
            { task: "Validation et deploiement general", status: "running" },
            { task: "Rapport de conformite", status: "pending" },
          ],
        },
        {
          name: "desactivation-smbv1.yml",
          description: "Suppression du protocole SMBv1 sur l'ensemble du parc",
          steps: [
            { task: "Inventaire des machines avec SMBv1 actif", status: "ok" },
            { task: "Verification de compatibilite applicative", status: "ok" },
            { task: "Desactivation via GPO et PowerShell", status: "ok" },
            { task: "Redemarrage programme des postes", status: "ok" },
            { task: "Scan de verification post-desactivation", status: "ok" },
          ],
        },
      ],
    },
    color: "#10B981",
  },
];
