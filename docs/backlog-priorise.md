# Backlog priorisé (version 0.1)

> Barème d'estimation : **S** (1 semaine·dev), **M** (2-3 semaines·dev), **L** (1-2 mois·équipe), **XL** (>2 mois / nécessite équipe dédiée). Les dépendances critiques sont listées pour chaque lot.
>
> Les priorités suivent l'ordre P0 > P1 > P2 > P3 > P4 (P0 = à livrer en premier). "Priorité minimale" signifie que l'épic est la dernière à traiter.
>
> Toutes les fonctionnalités doivent fonctionner en priorité sur la machine hôte (exécution locale optimisée GPU/multi-coeurs) ; le serveur sera peu puissant.
>
> **Décision du 2025-10-03** : toutes les épics impliquant un entraînement IA maison sont mises en pause tant qu'aucune ressource GPU dédiée n'est disponible ou qu'un réseau ≥500 volontaires n'est pas opérationnel. Elles restent listées pour référence mais marquées `EN PAUSE`.

> Utilisation d'APIs tierces uniquement si elles apportent un gain substantiel de praticité **et** que leur licence autorise la commercialisation du logiciel.
>
> **Source UI** : la page `/about` consomme `apps/web/src/content/roadmap.json`. Mettre à jour ce fichier en parallèle de ce document pour garantir la cohérence affichée dans l'application.

## Phase 1 — Fondation produit (priorité P0)
1. **Éditeur vectoriel MVP** *(M)*
   - Canvas 2D (Paper.js), calques, formes de base, export SVG/PNG.
   - Dépendances : moteur rendu front, service export raster.
2. **Éditeur raster basique** *(M)*
   - Calques, ajustements (luminosité, contraste), filtres standards WebGL.
   - Dépendances : pipeline WebGL/WASM, service thumbnail.
3. **Workflows sans API externe** *(S)*
   - Export manuel réseaux sociaux (templates titres + to-do utilisateur).
   - Guides impression (PDF/X prêt à imprimer) + checklists.

## Phase 2 — Collaboration & IA de base (priorité P1)
5. **Collaboration temps réel** *(M)*
   - CRDT/OT, commentaires, historique.
   - Dépendances : service WebSocket, stockage états temporaires.
6. **Assistant IA image (background remover)** *(M) — EN PAUSE*
   - Modèle segmentation interne (U-Net) + interface fine-tuning contributeur.
   - Dépendances : cluster GPU, pipeline MLOps.
7. **UI fine-tuning IA** *(S) — EN PAUSE*
   - Dashboard collecte dataset, lancement entraînement, suivi métriques.
   - Dépendances : service MLOps, stockage dataset versionné.
8. **Gestion de marque** *(S)*
   - Palettes, polices, logos, tokens synchronisés.

## Phase 3 — Suite créative avancée (priorité P2)
9. **Layout & publishing avancé** *(M)*
   - Gabarits multi-colonnes, générateur PDF/X, styles hiérarchiques.
10. **UI/UX & design system** *(M)*
    - Auto Layout, composants, inspecteur code.
11. **Automation vidéo & templates motion** *(L)*
    - Timeline simplifiée, audio libre, animations préconfigurées.
12. **Marketplace interne & plugins** *(L)*
    - SDK local, webhooks internes, modération communauté.

## Phase 4 — 3D accessible (priorité P3)
13. **Module 3D guidé** *(L)*
    - Création scène à partir de primitives, matériaux presets, rendu WebGPU.
14. **Auto-rig & animation assistée** *(XL) — EN PAUSE*
    - Modèles ML rigging + bibliothèque de motions partageable.
15. **Génération d’objets 3D (texte → mesh)** *(XL) — EN PAUSE*
    - Pipeline diffusion 3D, interface prompt + retouches.

## Phase 5 — Scalabilité & écosystème (priorité P4)
16. **Workflow publication automatisée** *(L)*
    - Planification offline, rappels, scripts d’export multi-format.
17. **Analytics & télémétrie open** *(M)*
    - Tableaux de bord usage, instrumentation OpenTelemetry.
18. **Gouvernance communautaire** *(S)*
    - Portail contributeurs, charte qualité, système vote backlog.
19. **Gestion comptes & utilisateurs** *(M) — Priorité minimale*
    - Authentification, rôles, licences Creative Commons, paramètres de profil.
    - Renforcement de la sécurité des accès : durcissement des endpoints, protection contre les failles courantes (OWASP), surveillance des tentatives d’intrusion.
    - Dépendances : service d'identité, base utilisateurs, politique RGPD.
20. **Projets & stockage partagé** *(M) — Priorité minimale*
    - Synchronisation projets multi-appareils, stockage S3 compatible, quotas par utilisateur.
    - Dépendances : service d'identité, base projets, stockage objet.
21. **Orchestrateur multi-hôtes** *(L) — Priorité minimale*
    - Couplage de plusieurs ordinateurs volontaires pour répartir les tâches lourdes (GPU, multi-coeurs).
    - Dépendances : agent local, protocole P2P, planificateur jobs local-first.

## Prochaines étapes immédiates
- Détailler les Epics des lots P0/P1 (hors IA) en user stories.
- Prototyper l'UX des workflows d'export manuel et des modules vectoriel/raster.
- Documenter les prérequis techniques pour la collaboration temps réel.
- Préparer la procédure d'initialisation outillée (scripts, dépendances, commandes officielles) à partir de la stack retenue.
- Formaliser la posture sécurité (gestion des secrets, sauvegardes, politique de branches) dans `docs/security.md`.
- Ajouter les diagrammes de séquence et niveaux C3/C4 pour les modules export, média et collaboration.
- Introduire un template user story (ID, rôle, besoin, valeur, critères d'acceptation, risques) et commencer les stories P0.
- Créer un checklist de readiness (monorepo, workspace pnpm, docker-compose, lint, test command) avant premier commit code.
- Cartographier les outils et automatisations où l'IA peut intervenir de manière autonome (génération de code, QA, documentation) et aligner les workflows critiques en conséquence.
- Synchroniser la page `/about` (feuille de route) avec la progression effective des épics et y référencer les jalons priorisés.
