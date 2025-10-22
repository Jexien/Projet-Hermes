# Copilot agent (squelette)

Ce dossier contient un runner minimal pour l'agent Copilot qui orchestre la découverte d'artefacts, applique des politiques (quorum) et peut produire des artefacts PR.

Usage local (exemples):

```powershell
# créer un PR exemple
node packages/agents/copilot/index.js scaffold:example-pr --root H:/Projet Hermes

# traiter la queue et tenter des merges
node packages/agents/copilot/index.js process:queue --root H:/Projet Hermes
```

Le runner respecte le protocole décrit dans `.github/copilot-instructions.md`.
