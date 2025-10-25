# Instructions Copilot pour Projet Appolon

## Vue d'ensemble
- Dépôt en phase d'initialisation : aucune source applicative n'est encore committée.
- Vision produit *Keep It Simple* : n'introduire un module que lorsqu'une fonctionnalité validée l'exige et garder les couches découplées.
- Architecture visée en couches nettes (interfaces, application, domaine, infrastructure) pour respecter la *Separation of Concerns* (SOC) et la *Law of Demeter* (LOD).

## Pile technologique (note de statut)

La description détaillée de la pile technique a évolué : une version allégée "local-first" a été adoptée le 2025-10-24.
Pour la définition actuelle et la roadmap d'évolution, les documents humains ont été archivés dans `archive/docs_human/docs/` ; la source machine‑canonique reste `.github/copilot-instructions.md`.

La spécification plus ambitieuse (Next.js / NestJS / Postgres / Redis / Meilisearch / BullMQ, etc.) est conservée à titre documentaire dans l'historique, mais n'est pas l'orientation recommandée pour le PoC initial (voir ADR `archive/docs_human/docs/adr/0001-simplify-stack.md`).

## Concepts structurants
- **Separation of Concerns (SOC)** : chaque couche ne traite qu'une responsabilité (ex. application orchestre, domaine porte la logique, infrastructure gère les adaptateurs). Aucun débordement de responsabilités entre couches.
- **Law of Demeter (LOD)** : chaque service ne parle qu'à ses dépendances directes ; éviter les appels en chaîne (`a.b.c()`) et préférer des façades/ports.
- **Keep It Simple (KIS)** : solutions minimales viables, éviter la sur‑ingénierie tant que la fonctionnalité n'est pas confirmée.
- **Don't Repeat Yourself (DRY)** : factoriser les comportements partagés dans des utilitaires documentés, réutilisables across `src/`.
- **Autonomie IA opérable** : privilégier les outils, workflows et chaînes d'intégration où l'IA (Copilot, automations locales) peut produire, maintenir et tester le code avec un minimum d'intervention humaine, tout en respectant les autres principes.

## Structure attendue
- `src/` : logique métier encapsulée dans des services courts et testables ; éviter les appels en chaîne (LOD).
- `tests/` : mirroir de `src/` avec scénarios nominaux + contre-exemples ; privilégier les tests rapides en ligne de commande.
-- `docs/` : (remplacé) les documents humains ont été archivés sous `archive/docs_human/docs/`.
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
-- Documenter les décisions architecturales majeures dans `archive/docs_human/docs/adr/XXXX-titre.md` (numérotation séquentielle) pour l'historique; inscrire toute décision machine‑canonique dans `.github/copilot-instructions.md`.
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

## Rôles : "cerveau" vs documentation humaine

Pour éviter les contradictions et la duplication d'information, on applique la règle suivante :
- `.github/copilot-instructions.md` est le "cerveau" — source de vérité opérationnelle pour les agents (policies, formats d'artefacts, scripts d'exécution, seuils, chemins attendus). Les agents doivent s'appuyer prioritairement sur ce fichier et sur les schémas machine‑readables (ex : `packages/shared/schemas/`).
-- Les documents humains ont été archivés sous `archive/docs_human/docs/` : synthèse, roadmap, guides d'onboarding et documentation approfondie sont disponibles dans l'archive pour consultation historique.

Politique pratique : toute modification ayant un impact sur le comportement des agents (formats d'artefacts, schémas, chemins, politiques d'approbation) doit être consignée dans `.github/copilot-instructions.md`. Les documents humains de contexte ont été archivés dans `archive/docs_human/docs/` pour historique et récupération.

But : garder un "cerveau" machine‑readable fiable tout en offrant une vue synthétique et accessible aux humains.
	# Copilot-instructions — cerveau central du projet Hermes

	Ce fichier est la source de vérité opérationnelle destinée aux agents (Copilot inclus) et aux contributeurs : il définit la manière dont le "cerveau" du projet orchestre les composants de plus bas niveau (agents, schémas, artefacts, scripts). Toute opération automatisée doit pouvoir se référer à ce document pour connaître les responsabilités, les contrats JSON et les points d'extension.

	Principes clés
	- Autorité centrale : ce fichier documente les politiques, le protocole d'artefacts, et les points d'entrée pour les agents. Les fichiers sous `packages/agents/`, `packages/shared/schemas/` et `scripts/` implémentent les détails.
	- Minimalisme opérationnel : garder des interfaces stables et simples — préférer des CLI JSON-in/JSON-out et des artefacts append-only.
	- Auditabilité : chaque action agent produit un artefact horodaté, haché (SHA256) et indexé dans `artifacts/index.jsonl`.

	Organisation et responsabilités
	- `packages/agents/` : implémentation des runners d'agents (planner, dev-frontend, reviewer, tester, integrator, …). Chaque agent doit exposer une CLI minimale :
	  - `node index.js --in <artifact.json> --out <artifact.json>` (entrées/sorties JSON)
	  - produire un artefact d'action avec métadonnées (`agentId`, `timestamp`, `hash`, `signedBy` si pertinent)

	- `packages/shared/schemas/` : schémas JSON (PR, approval, test-report, audit-entry). Ces schémas sont des contrats : tout agent doit valider ses sorties contre les schémas avant d'écrire dans `artifacts/`.

	- `artifacts/` : zone locale d'échange append-only. Arborescence recommandée :
	  - `artifacts/queue/` : artefacts entrants (PR proposals, jobs)
	  - `artifacts/approvals/` : approbations humaines/agents pour P1
	  - `artifacts/merged/` : logs de merges/actions effectives
	  - `artifacts/index.jsonl` : index append-only (métadonnées + hash)
	  - `artifacts/restore/` : snapshots pour rollback

	Flux canonique (exemple résumé)
	1. Un agent (ex : planner) produit un artefact PR dans `artifacts/queue/` validé par le schéma `pr-artifact.schema.json`.
	2. Le tester exécute les suites et produit `test-report.json` dans `artifacts/queue/`.
	3. Le reviewer(s) écrit des `review-*.json` dans `artifacts/queue/` ou `artifacts/approvals/`.
	4. L'agent central (`packages/agents/copilot/index.js`) lit les artefacts, applique `packages/agents/copilot/policies.json` (quorum, thresholds), vérifie l'index et les signatures, puis crée un artefact de merge dans `artifacts/merged/` si les conditions sont satisfaites.

	Contrats & validations
	- Obligation de schéma : tout artefact écrit doit être validé contre le schéma correspondant dans `packages/shared/schemas/`. Utiliser `packages/shared/validate.js` (AJV si disponible) pour centraliser la validation.
	- Hashing & indexation : utiliser `packages/shared/indexer.js` ou `packages/shared/artifact-utils.js` pour calculer le SHA256 et ajouter une ligne dans `artifacts/index.jsonl`.
	- Signatures & preuve : les approbations P1 exigent `signedBy` ou un artefact d'approbation machine compatible (`approval.schema.json`). Les signatures HMAC/PKI sont gérées via adaptateurs dans `packages/shared/`.

	Sécurité et limites opérationnelles
	- Interdictions : les agents ne peuvent modifier `secrets/` ou pousser vers branches protégées sans artefact d'approbation valide.
	- Sandbox : toute exécution potentiellement dangereuse doit passer via un runtime sandboxé (container, user namespace) — voir `scripts/sandbox/` pour PoC.
	- Rollback : toute opération destructive doit produire un snapshot dans `artifacts/restore/` avant exécution.

	Points d'extension
	- Ajouter un agent :
	  1. Créer `packages/agents/<nom>/` avec `index.js` exposant l'API CLI JSON.
	  2. Documenter l'artefact produit dans `packages/shared/schemas/`.
	  3. Ajouter un test minimal et un script `scripts/run-<nom>.ps1` pour l'intégration locale.

	- Mettre à jour un schéma :
	  1. Proposer une PR et inclure un changelog et un test de validation.
	  2. Mettre à jour `packages/shared/validate.js` si nécessaire.

	Gouvernance et processus
	- Ce document est l'énoncé de politique haute-niveau. Les décisions structurelles (ex : passage P0→P1, approbations humaines) doivent être consignées dans `docs/adr/` et référencées dans `CHANGELOG.md`.
	- Toute modification de ces instructions doit être accompagnée d'un artefact `docs/adr/` ou d'une entrée de `CHANGELOG.md` expliquant les raisons et les risques.

	Exemples rapides (CLI)
	```powershell
	# Valider un artefact et indexer
	node packages/shared/validate.js packages/shared/schemas/pr-artifact.schema.json artifacts/queue/pr-123.json
	node packages/shared/indexer.js artifacts/queue/pr-123.json

	# Lancer l'agent copilot pour évaluer la queue
	node packages/agents/copilot/index.js --root H:/Projet Hermes
	```

	Notes finales
	- Ce fichier doit rester concis et actionnable : il oriente les agents et référence les implémentations concrètes. Pour les détails d'implémentation, se reporter aux `packages/` et `docs/`.
	- Si tu veux, j'applique automatiquement la modification (commit + push) et j'ajoute un workflow CI minimal pour valider les schémas à chaque PR.

	- Developer : applique changements, crée branches locales, génère tests et commits atomiques.
	- Reviewer : évalue changements via critères codifiés (lint, tests, heuristiques de sécurité) et émet un vote (accept/reject) avec justification.
	- Tester : exécute les profils de tests (unit, e2e, fuzzing) et produit rapports JUnit/JSON.
	- Integrator : prend les merges autorisés par le protocole interne et gère les conflits par stratégie (rebase automatique, merge commits, ou fallback à la reconstruction).
	- Releaser : prépare artefacts de release locales et exécute la promotion vers branches de release selon politiques (tagging, changelog automatique).



