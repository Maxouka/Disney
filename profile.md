# Profil Professionnel

*Dernière mise à jour : 2026-02-19*

## Vue d'ensemble du candidat
**Nom** : Maxime LAUNOY
**Email** : launoym@gmail.com
**Téléphone** : 06 95 39 17 35
**GitHub** : github.com/Maxouka
**Expertise principale** : Ingénieur diplômé INSA spécialisé en cybersécurité avec une expérience concrète en Fintech. Compétences transverses en développement fullstack, automatisation et administration systèmes & réseaux.
**Fil conducteur de carrière** : Parcours d'ingénieur passionné par la sécurité informatique, passé de l'exploitation/infrastructure à la cybersécurité, tout en cultivant des compétences en développement. Capable de faire le pont entre les enjeux techniques (systèmes, réseaux, dev) et les enjeux de gouvernance (ISO 27001, reporting COMEX, audits).

**Langues** : Français (natif), Anglais courant (C1 TOEIC), Russe (natif), Espagnol (B2)
**Localisation** : Alpes-Maritimes (mobile France entière, permis B + véhicule)
**Situation** : Demandeur d'emploi (diplômé 2024)

---

## Poste : Ingénieur Cybersécurité chez Harvest (Fintech) — Paris
**Durée** : 1 an (contrat de professionnalisation)
**Contexte entreprise** : Fintech leader en France dans les logiciels de gestion de patrimoine pour banques et CGP. 400+ employés, CA 60M€, infrastructure de 1000+ machines virtuelles. En pleine démarche de certification ISO 27001 avec création d'une task force sécurité dédiée.

### Réalisations clés

1. **Mise en conformité ISO 27001 & plan de remédiation pour audit Rothschild**
   Situation : L'entreprise devait se conformer à la norme ISO 27001 suite à un audit externe des investisseurs (Rothschild).
   Action : Participation active à l'ensemble du plan de remédiation sécurité — gestion des droits admin via Active Directory, suivi des changements de mots de passe (scripts PowerShell sur 3 domaines), migration des protocoles obsolètes (FTP→SFTP, Telnet→SSH, HTTP→HTTPS, LDAP→LDAPS, SMTP→SMTPS), suppression des mots de passe en clair sur Confluence.
   Résultat : Renforcement significatif de la posture de sécurité de l'entreprise, conformité aux exigences de l'audit.

2. **Reporting sécurité hebdomadaire au COMEX**
   Situation : Besoin de visibilité de la direction sur la posture de sécurité.
   Action : Rédaction de rapports KPI hebdomadaires incluant : analyse des vulnérabilités CVE/ANSSI, statistiques de patch OS (WSUS), opérations malicieuses détectées par les EDR (InsightIDR, Cybereason), et statistiques antivirus.
   Résultat : Rapports présentés au comité exécutif, permettant des décisions éclairées et une allocation optimale des ressources sécurité.

3. **Déploiement BitLocker en urgence sur tout le parc**
   Situation : Vol du PC d'un cadre de l'entreprise — risque de fuite de données.
   Action : Création de packages Tanium (scripts PowerShell) pour déployer BitLocker sur les disques C et D de toutes les machines. Gestion d'un incident (clés de récupération du disque D non stockées dans l'AD) en récupérant manuellement les clés dans les logs Tanium, puis développement d'un script d'auto-unlock.
   Résultat : Chiffrement complet du parc utilisateur, prévention de futures fuites de données.

4. **Gestion des vulnérabilités & déploiement Tanium sur 1000+ VMs**
   Situation : Absence de gestion centralisée des endpoints.
   Action : Déploiement des agents Tanium (automatique + manuel sur les machines en échec). Utilisation de Tanium pour le suivi des vulnérabilités, le patch management, la désactivation de SMBv1 (prévention WannaCry/Petya), et l'export/analyse des machines avec protocoles obsolètes.
   Résultat : Visibilité et contrôle centralisés sur l'ensemble de l'infrastructure, réduction de la surface d'attaque.

5. **Investigation d'alertes SIEM (Rapid7 InsightIDR)**
   Situation : Alertes de sécurité quotidiennes à traiter.
   Action : Investigation des alertes via SIEM Rapid7 InsightIDR, corrélation avec les données EDR Cybereason, correction des vulnérabilités identifiées (en-têtes HTTP manquants, configurations SSL/TLS non sécurisées).
   Résultat : Détection et résolution rapide des incidents de sécurité.

### Autres détails
- **Équipe** : Task force sécurité de 3 à 7 personnes (mobilité interne), rattachée à la DSI
- **Outils** : Tanium, Rapid7 InsightIDR, Cybereason, PRTG, Active Directory, Salt, WSUS, EasyVista, Jira, Confluence
- **Méthodologie** : Agile/Scrum, réunions quotidiennes, backlog Jira, documentation Confluence
- **Compétences développées** : Gestion de crise (déploiement BitLocker en urgence), communication transverse, documentation, préparation d'audits sous pression

---

## Poste : Ingénieur d'Exploitation (Stage) chez Harvest (Fintech) — Sophia-Antipolis
**Durée** : 4 mois
**Contexte entreprise** : Même entreprise (Harvest), équipe exploitation en charge de la maintenance des environnements informatiques et applicatifs.

### Réalisations clés

1. **Automatisation du monitoring via Ansible et API PRTG**
   Situation : Besoin de déployer des sondes de monitoring PRTG sur une centaine de machines, nécessitant des modifications de configuration et des droits spéciaux sur chaque VM.
   Action : Développement de playbooks Ansible pour automatiser les modifications de configuration (droits, paramètres) sur ~100 machines, puis installation des sondes via l'API PRTG.
   Résultat : Déploiement en masse au lieu d'interventions manuelles machine par machine — gain de temps considérable.

2. **Permanence opérationnelle**
   Situation : Nécessité de garantir la continuité des services 24/7 sur un parc de 1000+ VMs.
   Action : Surveillance des alertes PRTG, vérification de la disponibilité de 500+ URLs, gestion des astreintes week-end, résolution d'incidents en temps réel.
   Résultat : Montée en compétences sur l'ensemble de l'infrastructure, amélioration de la réactivité face aux incidents.

### Autres détails
- **Outils** : PRTG, Ansible, Hyper-V, Teams, outils Waycom
- **Transition** : Ce stage a débouché sur le contrat de professionnalisation en cybersécurité

---

## Projet personnel : Lead Dev — TeachMe (Marketplace de cours particuliers)
**Date** : 2026
**Contexte** : Projet personnel motivé par le besoin concret de sa copine, professeure de cours particuliers, qui utilisait une plateforme existante avec des frais élevés sur ses revenus.

### Réalisations clés

1. **Conception et développement solo d'une marketplace SaaS complète**
   Situation : Besoin d'une plateforme indépendante pour organiser des cours particuliers sans frais de plateforme excessifs.
   Action : Développement fullstack d'une marketplace avec gestion multi-rôles (parent, professeur, admin), système de réservation avec calendrier interactif et créneaux récurrents, messagerie temps réel (Supabase Realtime), paiement sécurisé via Stripe (checkout + webhooks idempotents), système de crédits (packs d'heures), avis vérifiés avec modération admin.
   Résultat : ~30 pages, ~50 composants, ~15 tables DB, 29 migrations SQL. Application fonctionnelle hébergée sur Vercel.

### Détails techniques
- **Stack** : Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Supabase (PostgreSQL + Auth + Realtime + Storage), Stripe, Nodemailer, Vitest + Testing Library
- **Architecture** : Server Actions + React Query, Row Level Security, validation Zod, CSP headers, protection CSRF
- **Statut** : Fonctionnel, hébergé sur Vercel, en attente d'utilisation par de nouveaux clients

---

## Poste : Vendeur Polyvalent — Relay, Aéroport de Nice
**Date** : Été 2019
**Contexte** : Job d'été en vente dans un commerce de l'aéroport de Nice.

### Compétences développées
- Relation client, polyvalence, travail en environnement dynamique

---

## Schémas transversaux

**Superpower** : Capacité à combiner expertise cybersécurité (gouvernance, conformité, investigation) et compétences techniques opérationnelles (automatisation, scripting, développement fullstack). À l'aise aussi bien pour rédiger un rapport COMEX que pour déployer un script PowerShell en urgence sur tout un parc.

**Thèmes récurrents** :
- **Automatisation** : Ansible pour le déploiement de sondes, Tanium pour le patch management, scripts PowerShell pour l'AD et BitLocker — toujours chercher à automatiser ce qui peut l'être
- **Gestion de crise** : Réponse rapide au vol de PC (BitLocker), gestion d'incident sur les clés de récupération, astreintes opérationnelles
- **Conformité & gouvernance** : ISO 27001, audits Rothschild, reporting COMEX, migration de protocoles obsolètes
- **Curiosité technique** : Du monitoring (PRTG/Ansible) à la cybersécurité (SIEM/EDR) au développement fullstack (Next.js/Supabase/Stripe) — profil polyvalent et curieux
- **Autonomie** : Projet TeachMe développé seul de A à Z, prise d'initiative sur les missions chez Harvest

---

## Blockchain & Web3

- Utilisateur actif de l'écosystème Solana depuis plusieurs années (DeFi, trading, NFTs)
- Connaissance pratique de Jupiter (swaps), Jito bundles (MEV), modèle de comptes Solana
- Rust (bases), Anchor Framework (débutant)
- Projet portfolio : solana-tx-toolkit (github.com/Maxouka/solana-tx-toolkit) — Rust + TypeScript

---

## Outils IA

- Power user Claude Code (utilisation quotidienne pour le développement)
- Cursor, GitHub Copilot

---

## Centres d'intérêt

- IA, Blockchain/Crypto, Voyages, Sport

---

## Règles de confidentialité (TOUJOURS respecter dans les CV/lettres)

- Ne JAMAIS mentionner de noms de clients/investisseurs spécifiques → utiliser "audit externe investisseurs"
- Ne JAMAIS décrire d'incidents de sécurité spécifiques → utiliser "incident de sécurité"
- Ne JAMAIS exposer de détails de vulnérabilités → utiliser "renforcé la gestion des secrets"

---

## Préférences de candidature

- **Langue CV** : Français
- **Format** : PDF visuel (HTML→PDF, pas DOCX)
- **Style** : Mots-clés de l'offre en **bold** dans les bullets d'expérience
- **1 page max** : Le CV doit toujours tenir sur une seule page A4
- **Projet perso URL** : trouverunprof.com
