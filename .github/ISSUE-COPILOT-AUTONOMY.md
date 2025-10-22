Titre: Autonomie Copilot — Implémenter un agent de coding autonome (Copilot coding agent)

Contexte
-------
Hermes vise à supporter des agents IA opérant en autonomie. Cette issue décrit le travail nécessaire pour implémenter un "GitHub Copilot coding agent" capable de proposer, créer et pousser des PR conformes aux politiques du dépôt, en respectant les contraintes de sécurité et d'audit.

Objectif
-------
Fournir un agent Copilot capable d'exécuter les tâches suivantes de manière autonome (dans un cadre contrôlé) :
- Générer ou modifier du code selon une tâche planifiée (artefact PR dans `artifacts/queue/`).
- Lancer des validations locales (lint, typecheck, tests rapides) et produire des rapports JSON/JUnit.
- Produire des artefacts d'approval / review conformes aux schémas (`packages/shared/schemas/`).
- Créer des PRs ou merges via le protocole d'artefacts (quorum / approval machine).

Livrables
--------
1. Code de l'agent sous `packages/agents/copilot/` (runner CLI) avec :
   - `index.js` exposant une CLI JSON-in/JSON-out
   - `policies.json` (configurable)
   - tests unitaires basiques
2. Scripts d'intégration : `scripts/run-copilot-agent.ps1` (mode local/CI)
3. Documentation : mise à jour de `docs/` (procédure d'exécution, permissions requises)
4. Artefacts attendus : exemples JSON de PR, review et approval (dans `artifacts/examples/`)

Critères d'acceptation (Definition of Done)
-----------------------------------------
- L'agent peut générer un artefact PR dans `artifacts/queue/` respectant `pr-artifact.schema.json`.
- L'agent exécute `pnpm lint` / `pnpm test` si disponibles et publie un test-report JSON.
- L'agent peut proposer une review (fichier `review-<id>.json`) et, si la politique est satisfaite, initier la merge via `artifacts/merged/`.
- Tous les artefacts produits sont indexés via `packages/shared/indexer.js` et présents dans `artifacts/index.jsonl`.
- Tests unitaires couverts (Vitest) : 1 test happy-path + 1 test de refus (schéma invalide).

Permissions requises (à fournir par le owner)
-------------------------------------------
- Un token GitHub (machine user ou Deploy Key) avec scope `repo` (écriture) pour que l'agent puisse créer PRs / push sur des branches non-protégées. IMPORTANT : pour pousser sur `main` en production, préférer un flux d'intégration via artefacts + Copilot central (le dépôt peut exiger des approbations humaines).
- Si tu veux que l'agent agisse via GitHub Actions, fournir un secret `AGENT_TOKEN` dans Settings > Secrets (repository) et/ou créer un machine user identifié.

Sécurité & garde-fous
---------------------
- L'agent **ne doit jamais** exposer ou exfiltrer le contenu de `secrets/` ni écrire de clé en clair dans le repo.
- Toute action destructive doit créer un snapshot dans `artifacts/restore/` avant exécution.
- Les pushes sur branches protégées doivent rester bloqués sans artefact d'approbation valide.

Checklist de travail (à cocher par PR)
-------------------------------------
- [ ] Implémenter `packages/agents/copilot/index.js` (runner CLI)
- [ ] Ajouter `packages/agents/copilot/policies.json` (quorum, thresholds)
- [ ] Ajouter tests unitaires (Vitest)
- [ ] Ajouter scripts `scripts/run-copilot-agent.ps1` et `scripts/run-copilot-agent.sh`
- [ ] Ajouter exemples JSON dans `artifacts/examples/`
- [ ] Documenter permissions requises et procédure d'activation dans `docs/agents/copilot.md`
- [ ] Vérifier que toutes les sorties sont indexées dans `artifacts/index.jsonl`

Notes opérationnelles pour celui/celle qui implémente
----------------------------------------------------
- Utiliser `packages/shared/validate.js` pour valider les artefacts avant écriture.
- Appeler `packages/shared/indexer.js` après chaque artefact créé pour garantir l'immutabilité et l'audit.
- Les tests CI doivent simuler l'exécution en `--ci` mode (sans accès à secrets) et valider uniquement le flow local.

Demande explicite au mainteneur (action requise avant exécution autonome)
---------------------------------------------------------------------
1. Créer un secret `AGENT_TOKEN` ou fournir un Deploy Key/machine-user pour l'agent.
2. Confirmer la politique de merges automatiques (quorum vs humain). Si quorum, indiquer le nombre et la liste des agents autorisés.
3. Indiquer les branches sur lesquelles l'agent est autorisé à créer des PRs.

Si tu veux, je peux créer la PR initiale et ensuite itérer en autonomie si tu fournis le token et confirmes la politique. 
