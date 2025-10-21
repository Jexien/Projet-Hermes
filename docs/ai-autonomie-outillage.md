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

	## Note opérationnelle : autonomie TOTALE (quorum d'agents pour P1)

	- Principe supplémentaire : Hermes est conçu pour un fonctionnement en autonomie TOTALE. Les agents ne posent pas de questions ouvertes à un humain pour obtenir des validations. Les approbations P1+ reposent sur un mécanisme machine‑vérifiable : soit un artefact d'approbation humaine explicite, soit un quorum d'agents (option B) validant la même action. Par défaut, Hermes applique la politique C (1 humain OU quorum d'agents), mais la configuration est lisible par l'agent central (`packages/agents/copilot/policies.json`).

	- Interaction technique minimale : lorsqu'une interaction humaine est strictement nécessaire pour des raisons techniques, l'agent exige un "continuation token" local (fichier signé HMAC dans `artifacts/semaphores/`) ou un caractère technique uniquement destiné à déclencher la mécanique. Cette saisie n'est JAMAIS considérée comme approbation pour des actions P1+. Les agents acceptent uniquement des artefacts d'approbation machine (voir `packages/shared/schemas/approval.schema.json`) comme preuve d'autorisation.

	- Transparence et immutabilité : tous les artefacts produits sont horodatés, hachés (SHA256) et indexés de façon append‑only dans `artifacts/index.jsonl`. Chaque artefact doit contenir `hash` et `signedBy` lorsque c'est pertinent. Le registre append‑only sert de source de vérité pour audits et reconstitutions.

	- Limitation opérationnelle : rien dans ce mode n'autorise l'exfiltration de données vers des services non autorisés ni le contournement des politiques. Tout accès aux secrets passe par un adaptateur sécurisé (vault local/HSM) et toute tentative non autorisée est rejetée et consignées.

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
- Protocole de décision (simplifié) :
	1. Developer propose un changement (PR / patch) avec tests attachés.
	2. Reviewer(s) — idéalement plusieurs agents — évaluent indépendamment et rendent un verdict chiffré (score). Les décisions sont basées sur une checklist codifiée (`templates/review-checklist.json`).
	3. Si le score moyen dépasse un seuil configurable (ex : 0.8), Integrator fusionne et déclenche pipelines de tests additionnels.
	4. En cas d'échec significatif, la stratégie prioritaire est : rollback automatisé → reconstruire depuis `templates/` → si persistance du problème, escalade vers ADR + log pour revue humaine.

## Artefacts et contrats entre agents
- Tous les échanges entre agents doivent se faire via artefacts déclaratifs (JSON) stockés dans `artifacts/queue/` avec schéma versionné (`packages/shared/schemas/`).
- Contrat minimal d'un artefact PR/patch : { id, author-agent, timestamp, files-changed, tests-run, test-report-hash, justification }.

## Sécurité opérationnelle
- Les agents disposent d'un runtime à privilèges réduits. Toute opération nécessitant l'accès à des secrets doit échouer proprement et être consignées.
- Les politiques d'exécution et de rollback sont versionnées et soumises à ADR.


---

Version : Hermes 0.1 — document initialisé et prêt pour validation produit et revue sécurité.
