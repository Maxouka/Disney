export interface MetricSeries {
  label: string;
  data: number[];
  unit: string;
  threshold?: number;
  color: string;
}

export interface KPI {
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
  good: boolean;
}

export const metricSeries: MetricSeries[] = [
  {
    label: "Utilisation CPU -- Serveurs SCADA",
    data: [
      32, 35, 28, 26, 24, 23, 22, 31, 45, 58, 62, 67,
      72, 68, 65, 60, 63, 71, 66, 55, 48, 42, 38, 34,
    ],
    unit: "%",
    threshold: 85,
    color: "#3B82F6",
  },
  {
    label: "Utilisation memoire -- Serveurs SCADA",
    data: [
      61, 62, 60, 59, 58, 58, 59, 63, 68, 72, 74, 76,
      78, 77, 75, 73, 74, 76, 74, 70, 67, 65, 63, 62,
    ],
    unit: "%",
    threshold: 90,
    color: "#8B5CF6",
  },
  {
    label: "Debit reseau OT",
    data: [
      12, 10, 8, 7, 6, 5, 6, 18, 45, 62, 78, 85,
      82, 79, 76, 72, 80, 88, 75, 58, 42, 30, 22, 15,
    ],
    unit: "Mbps",
    threshold: 100,
    color: "#10B981",
  },
  {
    label: "Disponibilite attractions",
    data: [
      100, 100, 100, 100, 100, 100, 100, 99.8, 99.9, 99.9, 99.7, 99.5,
      99.8, 99.9, 100, 99.6, 99.4, 99.8, 99.9, 100, 100, 100, 100, 100,
    ],
    unit: "%",
    threshold: 99.0,
    color: "#F59E0B",
  },
  {
    label: "Alertes actives",
    data: [
      2, 2, 1, 1, 1, 0, 0, 3, 5, 7, 8, 12,
      10, 9, 8, 6, 7, 11, 9, 5, 4, 3, 2, 2,
    ],
    unit: "alertes",
    threshold: 15,
    color: "#EF4444",
  },
  {
    label: "Evenements SIEM par heure",
    data: [
      120, 98, 85, 72, 65, 60, 78, 210, 450, 680, 720, 810,
      780, 690, 640, 580, 620, 750, 640, 420, 310, 240, 180, 140,
    ],
    unit: "evt/h",
    color: "#06B6D4",
  },
  {
    label: "Latence reseau OT",
    data: [
      2, 2, 1, 1, 1, 1, 2, 3, 5, 8, 12, 15,
      14, 11, 9, 7, 8, 13, 10, 6, 4, 3, 2, 2,
    ],
    unit: "ms",
    threshold: 20,
    color: "#F97316",
  },
];

export const kpis: KPI[] = [
  {
    label: "Disponibilite globale attractions",
    value: "99.87%",
    trend: "up",
    good: true,
  },
  {
    label: "MTTR (temps moyen de resolution)",
    value: "23 min",
    trend: "down",
    good: true,
  },
  {
    label: "Alertes ouvertes",
    value: "7",
    trend: "down",
    good: true,
  },
  {
    label: "Conformite patchs",
    value: "94%",
    trend: "up",
    good: true,
  },
  {
    label: "Assets surveilles",
    value: "1 247",
    trend: "up",
    good: true,
  },
  {
    label: "Vulnerabilites critiques",
    value: "2",
    trend: "down",
    good: true,
  },
  {
    label: "Incidents ce mois",
    value: "3",
    trend: "up",
    good: false,
  },
  {
    label: "Couverture EDR",
    value: "98.2%",
    trend: "up",
    good: true,
  },
];
