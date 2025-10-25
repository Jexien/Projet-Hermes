# Projet Hermes

Hermes — PoC d'une plateforme locale d'agents.

Ce dépôt contient des agents CLI simples (squelettes) qui communiquent via des artefacts JSON dans `artifacts/`.

Principaux points :
- Agents : `packages/agents/*` (copilot, planner, tester, reviewer, integrator, designer, dev-frontend, dev-backend, releaser, ux)
- Artefacts : `artifacts/queue/` (échange) et `artifacts/merged/` (résultats)
- Contrat machine : `packages/agents/CONTRACT.md`
- Scripts utilitaires : `scripts/smoke-agents.ps1` (exécuter la suite d'agents localement)
- Documentation humaine : archivée dans `archive/docs_human/` (backup créé avant purge)

Usage rapide pour un run local (PowerShell) :

```powershell
# exécuter la batterie de smoke-tests
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/smoke-agents.ps1
```

Notes : le dépôt a été simplifié pour rester local-first et facile à exécuter. Pour toute opération destructive (purge d'archives), une sauvegarde ZIP a été créée à la racine.

Licence: MIT

