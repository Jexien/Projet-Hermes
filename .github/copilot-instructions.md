# Instructions Copilot pour Projet Appolon

## Vue d'ensemble
- Dépôt en phase d'initialisation : aucune source applicative n'est encore committée.
- Vision produit *Keep It Simple* : n'introduire un module que lorsqu'une fonctionnalité validée l'exige et garder les couches découplées.
- Architecture visée en couches nettes (interfaces, application, domaine, infrastructure) pour respecter la *Separation of Concerns* (SOC) et la *Law of Demeter* (LOD).

## Pile technologique cible (2025-10)
- Voir `docs/stack-technique.md` pour les détails complets et la roadmap outillage.
- **Frontend** : Next.js 14 (App Router) + React + TypeScript, gestion d'état via Zustand/TanStack Query, Storybook + Tailwind CSS pour le design system.
- **Canvas & rendu** : Paper.js / Konva pour le vectoriel, WebGL/WASM (regl/PixiJS) pour le raster, Three.js + WebGPU (feature flags) pour la 3D.
- **Backend** : NestJS (Node.js 20 + TypeScript), architecture modulaire, REST + GraphQL, WebSocket pour collaboration temps réel.
- **Persistance & temps réel** : PostgreSQL (relationnel), Redis (sessions/pub-sub), Meilisearch (index léger), BullMQ sur Redis (jobs export/worker). Evolution possible vers services Go/Rust pour les workloads lourds.
- **Infra locale** : pnpm monorepo (`apps/web`, `apps/api`, `packages/shared`), Docker Compose pour services (Postgres, Redis, Meilisearch), GitHub Actions pour CI.
- **Qualité** : ESLint + Prettier, Vitest (mono repo) + Playwright E2E, Trivy & npm audit pour la sécurité.

## Concepts structurants
- **Separation of Concerns (SOC)** : chaque couche ne traite qu'une responsabilité (ex. application orchestre, domaine porte la logique, infrastructure gère les adaptateurs). Aucun débordement de responsabilités entre couches.
- **Law of Demeter (LOD)** : chaque service ne parle qu'à ses dépendances directes ; éviter les appels en chaîne (`a.b.c()`) et préférer des façades/ports.
- **Keep It Simple (KIS)** : solutions minimales viables, éviter la sur‑ingénierie tant que la fonctionnalité n'est pas confirmée.
- **Don't Repeat Yourself (DRY)** : factoriser les comportements partagés dans des utilitaires documentés, réutilisables across `src/`.
- **Autonomie IA opérable** : privilégier les outils, workflows et chaînes d'intégration où l'IA (Copilot, automations locales) peut produire, maintenir et tester le code avec un minimum d'intervention humaine, tout en respectant les autres principes.

## Structure attendue
- `src/` : logique métier encapsulée dans des services courts et testables ; éviter les appels en chaîne (LOD).
- `tests/` : mirroir de `src/` avec scénarios nominaux + contre-exemples ; privilégier les tests rapides en ligne de commande.
- `docs/` : décisions d'architecture (ADR), maquettes, guides d'onboarding.
- `CHANGELOG.md` : consigner chaque itération avec la nomenclature fournie (version, date, catégories, dépendances vérifiées).

## Workflows critiques (build/test/debug)
- Scripts d'installation : `powershell -ExecutionPolicy Bypass -File .\scripts\bootstrap.ps1` (console Administrateur) pour installer les prérequis et activer pnpm.
- Début de session : `powershell -ExecutionPolicy Bypass -File .\scripts\start-session.ps1` pour vérifier les dépendances, lancer Docker et ouvrir VS Code.
- Exécution des tests : centraliser derrière une seule commande (`npm test`, `pytest`, `dotnet test`, …) et la référencer ici pour automatiser les validations.
- Débogage : isoler les effets de bord via des adaptateurs mockables (`src/infrastructure/`) afin de tester le domaine sans dépendances réelles.

## Conventions spécifiques
- Toujours factoriser les responsabilités partagées dans des utilitaires réutilisables (DRY) et documenter le point d'entrée.
- Préférer les DTO/ports explicites entre couches plutôt que des objets partagés implicites.
- Toute dépendance réseau ou système doit passer par une interface décrite dans `src/infrastructure/`.
- Documenter les décisions architecturales majeures dans `docs/adr/XXXX-titre.md` (numérotation séquentielle).
- Absence d'API accessible ⇒ implémenter une solution maison (sources open data acceptées, pas de partenariats externes implicites).
- Usage d'API tierce uniquement si elle apporte un gain majeur de praticité **et** si sa licence autorise explicitement la commercialisation du logiciel.
- Décision 2025-10-03 : suspendre tout développement d'IA maison tant qu'aucune ressource GPU dédiée n'est provisionnée ou qu'un réseau décentralisé d'au moins 500 volontaires n'est pas opérationnel. Les tâches restent documentées mais ne doivent pas être lancées avant validation.
- Plateforme local-first : toutes les fonctionnalités doivent être optimisées pour tourner sur la machine hôte (CPU multi-coeurs, GPU local) avec un serveur central minimal.
- Le couplage multi-hôtes est une amélioration optionnelle (priorité minimale) ; ne pas l'implémenter tant que les fondations locales ne sont pas stabilisées.

## Protocole d'interaction pour les agents
1. **Lister les demandes** : recenser toutes les attentes exprimées dans chaque prompt et les reformuler sous forme de liste.
2. **Décomposer et répondre** : traiter chaque élément de la liste individuellement avant de passer au suivant.
3. **Autoévaluation obligatoire** : répondre systématiquement aux questions suivantes :
	- Quels sont les points forts de ce travail ?
	- Quels sont les points faibles identifiés ?
	- Quelles améliorations puis-je proposer ?
	- Y a-t-il des incohérences visuelles/fonctionnelles ?
	- L'UX est-elle optimale pour un non-expert ?
4. **Application immédiate des recommandations** : implémenter sans délai les améliorations identifiées, répéter la boucle autoévaluation → amélioration jusqu'à stabilisation.
5. **Traçabilité** : consigner chaque itération dans `CHANGELOG.md` selon la nomenclature `[VX.X.X] - YYYY-MM-DD 🎯` avec analyse d'amélioration et dépendances vérifiées.
6. **Projection** : ajouter à chaque entrée du `CHANGELOG.md` la prévision des prochaines mises à jour et rappeler que le changelog doit être injecté dans le contexte à chaque grosse évolution.

## Qualité et revues
- Refuser toute PR sans tests automatisés correspondants ou justification formelle.
- Ajouter un contrôle statique (lint/format/type) et le référencer ici une fois disponible ; exécuter les contrôles avant chaque commit.
- Vérifier systématiquement les connexions entre modules (contrats d'interface) et consigner les dépendances validées dans le CHANGELOG.
- Lors de chaque correction ou évolution, dresser un état rapide des fichiers/fonctions/assets liés pour éliminer tout vestige de la solution précédente (ex : remplacer chaque référence à une librairie minifiée par sa version complète si elle devient la norme, puis supprimer l'artefact obsolète).

## À compléter rapidement
- Tenir à jour la pile technologique cible (langage, framework, base de données) et documenter tout changement.
- Ajouter les commandes exactes de build/test dès qu'elles existent.
- Compléter les patterns d'organisation (agrégats, repository, event bus, etc.) lorsque la première implémentation est créée.
- Produire les wireframes des modules P0 (éditeurs vectoriel/raster, export manuel) et référencer la source dans `docs/`.
- Documenter les diagrammes C3/C4 des composants critiques (export, média, collaboration) dès leur conception.
 
## Hermes — Autonomie IA opérable

Le texte ci‑dessous provient de `docs/ai-autonomie-outillage.md` et définit les règles opérationnelles que les agents (Copilot inclus) doivent appliquer de façon globale dans le dépôt Hermes. Ce comportement s'applique à l'ensemble du projet — pas seulement à certaines phases — et doit être considéré comme la source de vérité opérationnelle pour tous les agents.

---

# Autonomie IA opérable — orientation Hermes

Ce document décrit l'approche d'"Hermes" : un fork d'Apollon réorienté pour devenir une plateforme centrée sur des agents IA autonomes et opérables localement. L'objectif est d'autoriser des boucles de travail automatisées (scaffolding, tests, releases expérimentalement) tout en garantissant sécurité, traçabilité et conformité aux principes local-first, KIS, SOC et LOD.

## Objectifs clés
- Faire monter progressivement des agents IA capables d'exécuter des tâches de développement et d'exploitation de manière contrôlée.
- Réserver l'intervention humaine aux décisions produit, aux validations critiques et aux audits post-opération.
- Maintenir une posture local-first : priorité à l'exécution sur ressources locales (CPU/GPU) et à la protection des données.

## Niveau d'autonomie et périmètre
- Autonomie graduelle : agents en modes "assistance", "opération supervisée" et "exécution restreinte". Par défaut, démarrer en "assistance" puis basculer vers des modes plus autonomes après revue humaine et tests de sécurité.
- Périmètre initial (P0) : automatisation des tâches répétitives non sensibles — génération de scaffolds, création de tests, corrections de format/linters, exécution de suites de tests avec rapports.
- Périmètre avancé (P1+) : agents capables d'exécuter des merges automatiques, déploiements locaux contrôlés et workflows d'optimisation. Ces capacités nécessitent des garde-fous stricts (approbations, audit logs, rollback automatisé).

## Contraintes de sécurité & gouvernance
- Sandbox d'exécution : tout code exécuté par un agent passe via un runtime sandboxé (conteneurs isolés, user namespaces, limitations IO/CPU) et des policies d'entités (capabilities réduites).
- Auditabilité : chaque action agent doit produire un événement horodaté, identité de l'agent, entrée/sortie (inputs/outputs) et un artefact lisible (`.log`, JSON/JUnit) stocké localement dans `artifacts/`.
- Politique de désactivation : les agents autonomes ne peuvent modifier les secrets, changer les tokens d'accès, ou exécuter des scripts d'infrastructure sans une signature humaine explicite.
- Revues obligatoires : tout passage en environnement P1+ exige un ADR (dans `docs/adr/`) et un test d'intrusion automatisé minimal.

> Note historique : une décision antérieure (2025-10-03) préconisait de suspendre tout développement IA maison tant qu'aucune ressource GPU dédiée n'était provisionnée ou qu'un réseau décentralisé de contributeurs n'était opérationnel. Hermes respecte l'esprit de cette décision : l'effort initial est "CPU-first" et orienté vers des PoC locaux ; les capacités GPU sont une condition d'extension pour certains workloads (modèles lourds, entraînements locaux, etc.).

## Domaines opérationnels
### Développement
- Génération de code : usage contrôlé de Copilot / modèles locaux pour scaffolding, refactorings et tests. Les suggestions doivent toujours être accompagnées d'un test minimal et d'un rapport d'impact.
- Guides & patterns : centraliser les patterns, conventions et templates dans `docs/` pour que les agents puissent les réutiliser sans heuristiques fragiles.
- Scripts invocables : privilégier des scripts CLI paramétrables (`.ps1`, Node) avec sorties JSON pour ingestion machine.

### Qualité & rapports
- Standardiser les scripts : `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e` et leurs variantes `*:report` produisant des artefacts JSON/JUnit.
- Tests rapides : maintenir une suite Vitest optimisée (tests unitaires rapides) pour permettre des boucles d'itération rapides en autonome.
- E2E en mode gated : Playwright en headless produit des rapports mais les exécutions massives en autonome sont limitées au mode supervisé.

### Documentation & CHANGELOG
- Changelog programmatique : conserver la structure `[VX.X.X] - YYYY-MM-DD 🎯` et fournir un script d'extraction pour générer des résumés lisibles par les agents.
- Templates : stocker `templates/` (user stories, ADR, checklists) pour guider la génération et la validation automatique.

### DevOps & Session locale
- CI minimal : pipeline `lint + test + typecheck` exécutable par GitHub Actions et localement via `start-session.ps1`.
- Start session : `start-session.ps1` doit vérifier pnpm, Docker (si utilisé), drivers GPU (optionnel), et proposer un mode `--check-only`.
- Provisioning reproductible : `bootstrap.ps1` documente toutes les étapes nécessaires pour remettre un poste en état de développement identique.

## Feuille de route rapide (P0 → P1)
P0 (échéance initiale)
- Normaliser commandes & scripts (README + `scripts/`).
- Générer rapports machine-readable pour lint/test/typecheck.
- Mettre en place sandbox d'exécution minimale et logging d'actions agents.
- Ajouter ADR initial expliquant l'orientation Hermes (voir `docs/adr/0001-orientation-ia-autonome.md`).

P1 (après validation P0)
- Étendre la sandbox (limitation de ressources, quotas, policies dynamiques).
- Intégration d'un orchestrateur local d'agents (process supervisor, queue interne).
- Expérimentations GPU-local pour modèles plus lourds et accélération des workloads.

## Checklist expérimentale avant mise en autonome complète
- Évaluer dépendances : licence, stabilité CLI, capacité d'exécution hors-ligne.
- Safety net : rollback automatique et points de restauration.
- Tests : unitaires, E2E, adversarial & fuzzing sur les entrées générées par agents.
- Gouvernance : ADR signée + plan d'audit humain périodique.

## Indicateurs de performance IA
- Taux d'opérations réussies (scripts critiques) en mode autonome.
- Délai moyen entre action agent et revue humaine (pour opérations nécessitant approbation).
- Couverture tests minimale pour les paquets sensibles. 

## Liens & artefacts
- ADRs : `docs/adr/`
- Scripts de session : `scripts/bootstrap.ps1`, `scripts/start-session.ps1`
- Rapports & artefacts : `artifacts/`

## Gouvernance opérationnelle
- Toute intégration d'un nouvel outil doit suivre la checklist d'opérabilité (stabilité CLI, licence, capacité à produire sorties machine-readable).
- Les décisions structurantes sont consignées dans `docs/adr/` et référencées dans `CHANGELOG.md`.

## Exécution autonome sans confirmations humaines

- Principe : les agents Hermes doivent pouvoir exécuter des tâches end-to-end sans demander de confirmations humaines. Cela exclut les actions impliquant la divulgation de secrets, la modification des clés d'accès, ou les changements d'infrastructure à portée globale tant qu'un ADR P1+ n'a pas été approuvé.
- Garde-fous techniques :
 	- Mode `no-confirm`: exécution automatique pour les tâches définies comme sûres (formatting, tests, merges de branches feature-to-dev si critères passés, exécution de scripts locaux non-privés).
 	- Rollback automatique : chaque action destructive doit être précédée d'un snapshot/artifact et disposer d'un plan de rollback automatique exécutable par un agent (ex : restaurer commit, revert migration, restaurer dossier `artifacts/restore/`).
 	- Artefacts et logs : obligatoirement stockés sous `artifacts/` avec metadata (agent-id, timestamp, justification, input, output, hashes). Ces artefacts servent de preuves et d'entrées pour les audits.
 	- Interdictions strictes : agents non autorisés à modifier `secrets/`, `credentials`, fichiers de configuration d'infrastructure sensibles, ou à pousser sur des branches protégées sans preuve d'ADRs et signatures humaines explicites.

	## Note opérationnelle : autonomie TOTALE

	- Principe supplémentaire : Hermes est conçu pour un fonctionnement en autonomie TOTALE. Les agents ne posent pas de questions ouvertes à un humain pour obtenir des validations. Les approbations P1+ reposent sur un mécanisme machine‑vérifiable : soit un artefact d'approbation humaine explicite, soit un quorum d'agents (option B) validant la même action. Par défaut, Hermes applique la politique C (1 humain OU quorum d'agents), mais la configuration est lisible par l'agent central (`packages/agents/copilot/policies.json`).

	- Interaction technique minimale : lorsqu'une interaction humaine est strictement nécessaire pour des raisons techniques, l'agent exige un "continuation token" local (fichier signé HMAC dans `artifacts/semaphores/`) ou un caractère technique uniquement destiné à déclencher la mécanique. Cette saisie n'est JAMAIS considérée comme approbation pour des actions P1+. Les agents acceptent uniquement des artefacts d'approbation machine (voir `packages/shared/schemas/approval.schema.json`) comme preuve d'autorisation.

	- Transparence et immutabilité : tous les artefacts produits sont horodatés, hachés (SHA256) et indexés de façon append‑only dans `artifacts/index.jsonl`. Chaque artefact doit contenir `hash` et `signedBy` lorsque c'est pertinent. Le registre append‑only sert de source de vérité pour audits et reconstitutions.

	- Limitation opérationnelle : rien dans ce mode n'autorise l'exfiltration de données vers des services non autorisés ni le contournement des politiques. Tout accès aux secrets passe par un adaptateur sécurisé (vault local/HSM) et toute tentative non autorisée est rejetée et consignée.

## Reconstruction agressive et stratégie "destruct-rebuild"

- Mentalité : pour garder le système simple et résilient, les agents sont autorisés à choisir des stratégies agressives — supprimer et reconstruire un sous-système — si cela réduit la dette technique et si un rollback est disponible.
- Processus :
	1. Préparer snapshot complet des artefacts impactés et stocker dans `artifacts/restore/YYYYMMDD-HHMMSS/`.
	2. Exécuter la suppression contrôlée du sous-ensemble identifié (ex : `packages/foo`), marquer l'opération dans le log.
	3. Reconstruire depuis templates ou scaffolds validés (`templates/`), lancer la suite de tests et générer un rapport.
	4. Si les tests échouent, tenter des stratégies alternatives (rollback, patch minimal, ou recréation itérative). Toutes les tentatives doivent être journalisées.

## Simulation d'équipe IA

- Objectif : faire fonctionner un ensemble d'agents spécialisés qui simulent les rôles d'une équipe de développement — Planner, Developer, Reviewer, Tester, Integrator, Releaser — avec un protocole de prises de décision internes sans intervention humaine.
- Rôles & responsabilités (esquisse) :
	- Planner : génère tâches, priorise backlog et propose plans d'itération.
	- Developer : applique changements, crée branches locales, génère tests et commits atomiques.
	- Reviewer : évalue changements via critères codifiés (lint, tests, heuristiques de sécurité) et émet un vote (accept/reject) avec justification.
	- Tester : exécute les profils de tests (unit, e2e, fuzzing) et produit rapports JUnit/JSON.
	- Integrator : prend les merges autorisés par le protocole interne et gère les conflits par stratégie (rebase automatique, merge commits, ou fallback à la reconstruction).
	- Releaser : prépare artefacts de release locales et exécute la promotion vers branches de release selon politiques (tagging, changelog automatique).



