# Contrat commun des agents

But
- Décrire le contrat minimal que respectent les agents CLI du dépôt.
- Permettre à l'orchestrateur (ou à l'IA) d'appeler des agents de façon déterministe.

Entrée (CLI)
- Tous les agents exposent une CLI Node.js minimale :
  - Commande : `node packages/agents/<agent>/index.js <command> --root <repoRoot>`
  - `--root` : chemin racine du dépôt (optionnel, défaut = repo racine estimé).

Sortie (artefacts)
- Les agents produisent des artefacts JSON dans l'arborescence `artifacts/`.
  - Emplacements standards :
    - `artifacts/queue/` : artefacts d'échange (PR, review, asset, ci-report, release, ...)
    - `artifacts/merged/` : artefacts transformés/fusionnés par l'integrator

- Format minimal attendu d'un artefact JSON (métadonnées communes) :

```json
{
  "id": "string-unique",
  "agentId": "string",        
  "type": "pr|review|ci-report|asset|release|plan",
  "timestamp": "ISO-8601 string",
  "payload": {}
}
```

Schémas d'exemples (minimal)
- PR (type `pr`)
```json
{
  "id":"pr-...",
  "agentId":"copilot",
  "type":"pr",
  "title":"Résumé",
  "description":"...",
  "files":[{"path":"path","change":"append|modify|delete","content":"..."}],
  "timestamp":"..."
}
```

- Review (type `review`)
```json
{
  "id":"review-...",
  "agentId":"reviewer",
  "type":"review",
  "prId":"pr-...",
  "score":0.0,
  "comment":"...",
  "timestamp":"..."
}
```

- CI report (type `ci-report`)
```json
{
  "id":"ci-...",
  "agentId":"dev-frontend",
  "type":"ci-report",
  "name":"frontend-lint-build",
  "success":true,
  "timestamp":"..."
}
```

- Asset (type `asset`)
```json
{
  "id":"asset-...",
  "agentId":"designer",
  "type":"asset",
  "title":"example-asset",
  "metadata":{ "format":"png","size":1024 },
  "timestamp":"..."
}
```

- Release (type `release`)
```json
{
  "id":"release-...",
  "agentId":"releaser",
  "type":"release",
  "tag":"vX.Y.Z",
  "timestamp":"..."
}
```

Garanties de sécurité et invariants
- Aucun agent ne doit effectuer d'appels réseau par défaut.
- Aucun agent ne doit modifier la branche git ou des fichiers hors `artifacts/` sans une étape explicite et approuvée.
- Les artefacts sont append-only : éviter d'écraser un artefact existant (préférer création d'un nouveau fichier).

Évolution
- Versionner les schémas dans `packages/shared/schemas/` et valider par AJV lors de l'écriture d'artefacts.
- Aligner les politiques (ex. quorum) dans un fichier partagé (`packages/agents/policies.json`) pour éviter désynchronisations.

Exemples d'usage rapide
- Créer un PR : `node packages/agents/copilot/index.js scaffold:example-pr --root .`
- Lancer les tests : `node packages/agents/tester/index.js run --root .`
- Traiter la queue : `node packages/agents/copilot/index.js process:queue --root .`

Fichier canonique : `packages/agents/CONTRACT.md` — toute modification majeure doit être documentée et validée.
