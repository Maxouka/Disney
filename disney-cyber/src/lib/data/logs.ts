export interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  severity: "INFO" | "WARNING" | "ERROR" | "CRITICAL";
  message: string;
  category: string;
}

export const logPool: LogEntry[] = [
  // --- INFO ---
  {
    id: "LOG-001",
    timestamp: "2026-02-19T08:00:12.000Z",
    source: "Space Mountain",
    severity: "INFO",
    message: "Heartbeat PLC Siemens S7-1500 -- cycle automate nominal (45 ms)",
    category: "OT",
  },
  {
    id: "LOG-002",
    timestamp: "2026-02-19T08:01:30.000Z",
    source: "Pirates des Caraibes",
    severity: "INFO",
    message: "Capteur niveau eau bassin principal : 1.82 m -- seuil nominal",
    category: "OT",
  },
  {
    id: "LOG-003",
    timestamp: "2026-02-19T08:02:45.000Z",
    source: "Big Thunder Mountain",
    severity: "INFO",
    message: "Connexion OPC-UA etablie entre SCADA et station de supervision",
    category: "Network",
  },
  {
    id: "LOG-004",
    timestamp: "2026-02-19T08:05:00.000Z",
    source: "Buzz Lightyear",
    severity: "INFO",
    message: "Authentification operateur reussie -- badge #4417 (poste HMI-BL-03)",
    category: "Auth",
  },
  {
    id: "LOG-005",
    timestamp: "2026-02-19T08:06:12.000Z",
    source: "Hyperspace Mountain",
    severity: "INFO",
    message: "Mise a jour firmware variateur de frequence ABB ACS880 -- version 3.14.2 appliquee",
    category: "System",
  },
  {
    id: "LOG-006",
    timestamp: "2026-02-19T08:10:33.000Z",
    source: "Le Chateau",
    severity: "INFO",
    message: "Scan de vulnerabilites programme termine -- 0 critique detectee sur segment eclairage",
    category: "System",
  },
  {
    id: "LOG-007",
    timestamp: "2026-02-19T08:12:00.000Z",
    source: "Space Mountain",
    severity: "INFO",
    message: "Synchronisation NTP reussie -- derive horloge PLC corrigee (delta 12 ms)",
    category: "OT",
  },
  {
    id: "LOG-008",
    timestamp: "2026-02-19T08:15:22.000Z",
    source: "Pirates des Caraibes",
    severity: "INFO",
    message: "Rotation des logs SCADA effectuee -- archive compressee envoyee au SIEM",
    category: "System",
  },
  {
    id: "LOG-009",
    timestamp: "2026-02-19T08:18:44.000Z",
    source: "Big Thunder Mountain",
    severity: "INFO",
    message: "Lecture capteur vibration rail secteur B : 0.3 g -- dans les tolerances",
    category: "OT",
  },
  {
    id: "LOG-010",
    timestamp: "2026-02-19T08:20:00.000Z",
    source: "Buzz Lightyear",
    severity: "INFO",
    message: "Execution playbook Ansible maintenance nocturne -- 47 taches OK, 0 echouee",
    category: "System",
  },

  // --- WARNING ---
  {
    id: "LOG-011",
    timestamp: "2026-02-19T08:22:15.000Z",
    source: "Space Mountain",
    severity: "WARNING",
    message: "Latence reseau inhabituelle sur segment OT-VLAN42 : 85 ms (seuil 50 ms)",
    category: "Network",
  },
  {
    id: "LOG-012",
    timestamp: "2026-02-19T08:25:30.000Z",
    source: "Pirates des Caraibes",
    severity: "WARNING",
    message: "Capteur temperature moteur pompe #3 : 78 degC -- approche seuil alerte (80 degC)",
    category: "OT",
  },
  {
    id: "LOG-013",
    timestamp: "2026-02-19T08:28:00.000Z",
    source: "Hyperspace Mountain",
    severity: "WARNING",
    message: "Certificat TLS du serveur OPC-UA expire dans 7 jours -- renouvellement necessaire",
    category: "Network",
  },
  {
    id: "LOG-014",
    timestamp: "2026-02-19T08:30:11.000Z",
    source: "Le Chateau",
    severity: "WARNING",
    message: "Tentative de connexion Telnet detectee sur port 23 -- protocole obsolete non autorise",
    category: "Network",
  },
  {
    id: "LOG-015",
    timestamp: "2026-02-19T08:33:45.000Z",
    source: "Big Thunder Mountain",
    severity: "WARNING",
    message: "Taux CPU automate Allen-Bradley a 82% -- au-dessus du seuil de surveillance (75%)",
    category: "OT",
  },
  {
    id: "LOG-016",
    timestamp: "2026-02-19T08:35:20.000Z",
    source: "Buzz Lightyear",
    severity: "WARNING",
    message: "3 echecs d'authentification consecutifs sur HMI-BL-01 -- compte operateur verrouille temporairement",
    category: "Auth",
  },
  {
    id: "LOG-017",
    timestamp: "2026-02-19T08:38:00.000Z",
    source: "Space Mountain",
    severity: "WARNING",
    message: "Paquet Modbus/TCP malformme recu depuis 10.42.3.18 -- trame ignoree par l'automate",
    category: "OT",
  },
  {
    id: "LOG-018",
    timestamp: "2026-02-19T08:40:10.000Z",
    source: "Pirates des Caraibes",
    severity: "WARNING",
    message: "Firmware capteur de proximite non a jour -- version 1.2.0 (derniere : 1.4.1)",
    category: "System",
  },
  {
    id: "LOG-019",
    timestamp: "2026-02-19T08:42:55.000Z",
    source: "Hyperspace Mountain",
    severity: "WARNING",
    message: "Trafic DNS anormal detecte depuis station ingenierie OT -- 450 requetes en 5 min",
    category: "Network",
  },

  // --- ERROR ---
  {
    id: "LOG-020",
    timestamp: "2026-02-19T08:45:00.000Z",
    source: "Big Thunder Mountain",
    severity: "ERROR",
    message: "Perte de communication Profinet avec variateur VFD-BTM-07 -- timeout 3000 ms depasse",
    category: "OT",
  },
  {
    id: "LOG-021",
    timestamp: "2026-02-19T08:47:33.000Z",
    source: "Le Chateau",
    severity: "ERROR",
    message: "Echec verification integrite firmware controleur eclairage DMX -- hash SHA-256 non concordant",
    category: "System",
  },
  {
    id: "LOG-022",
    timestamp: "2026-02-19T08:50:15.000Z",
    source: "Space Mountain",
    severity: "ERROR",
    message: "Connexion non autorisee detectee sur port Modbus 502 depuis IP 10.42.99.5 (hors inventaire)",
    category: "Network",
  },
  {
    id: "LOG-023",
    timestamp: "2026-02-19T08:52:00.000Z",
    source: "Buzz Lightyear",
    severity: "ERROR",
    message: "Echec deploiement patch Tanium sur 12 postes HMI -- erreur de distribution package KB2026-114",
    category: "System",
  },
  {
    id: "LOG-024",
    timestamp: "2026-02-19T08:54:40.000Z",
    source: "Pirates des Caraibes",
    severity: "ERROR",
    message: "Violation de regle firewall OT : tentative de communication directe entre zone 3 (capteurs) et zone 1 (entreprise)",
    category: "Network",
  },
  {
    id: "LOG-025",
    timestamp: "2026-02-19T08:56:20.000Z",
    source: "Hyperspace Mountain",
    severity: "ERROR",
    message: "Echec authentification RADIUS pour compte de service svc-scada-hm -- mot de passe expire",
    category: "Auth",
  },

  // --- CRITICAL ---
  {
    id: "LOG-026",
    timestamp: "2026-02-19T09:00:00.000Z",
    source: "Space Mountain",
    severity: "CRITICAL",
    message: "Tentative d'ecriture registre PLC detectee depuis poste non autorise -- fonction Modbus 0x06 bloquee par firewall industriel",
    category: "OT",
  },
  {
    id: "LOG-027",
    timestamp: "2026-02-19T09:02:30.000Z",
    source: "Big Thunder Mountain",
    severity: "CRITICAL",
    message: "Arret d'urgence declenche -- capteur securite rail secteur C hors tolerances (vibration 2.1 g > seuil 1.5 g)",
    category: "OT",
  },
  {
    id: "LOG-028",
    timestamp: "2026-02-19T09:05:00.000Z",
    source: "Le Chateau",
    severity: "CRITICAL",
    message: "Protocole industriel inconnu detecte sur segment OT (port 44818) -- signature ne correspond a aucun protocole autorise",
    category: "Network",
  },
  {
    id: "LOG-029",
    timestamp: "2026-02-19T09:07:45.000Z",
    source: "Pirates des Caraibes",
    severity: "CRITICAL",
    message: "Brute force detecte sur interface HMI supervision -- 47 tentatives en 2 min depuis 10.42.5.200",
    category: "Auth",
  },
  {
    id: "LOG-030",
    timestamp: "2026-02-19T09:10:00.000Z",
    source: "Hyperspace Mountain",
    severity: "CRITICAL",
    message: "Exfiltration potentielle : flux sortant anormal de 850 Mo detecte sur passerelle OT/IT -- connexion bloquee",
    category: "Network",
  },
];

/** Retourne une copie du log avec un timestamp actualise. */
export function generateTimestampedLog(log: LogEntry): LogEntry {
  return {
    ...log,
    timestamp: new Date().toISOString(),
  };
}
