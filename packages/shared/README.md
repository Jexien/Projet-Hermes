Packages partagés : schémas et utilitaires pour les agents.

Contenu :
- `schemas/` : JSON schemas décrivant les artefacts échangés entre agents (PRs, messages, design artifacts).

Usage :
Les agents doivent valider leurs artefacts contre ces schémas avant de publier dans `artifacts/queue/`.


## Schema validation
Run `npm install ajv` in this package and use `node validate.js <schema> <file>`

## Indexer improvements
Add verifyIntegrity and CLI tests. Use `node indexer.js` to index artifacts.