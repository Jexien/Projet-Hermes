Machine-oriented agents index

This file is a concise, machine-readable pointer for orchestrators and agents.

- Contract: `packages/agents/CONTRACT.md`
- Catalog: `packages/agents/catalog.json`
- Policies: `packages/agents/policies.json`
- Metadata: `repo-metadata.json`

Agents should be discovered from `catalog.json` and invoked with the CLI pattern:

  node <path-to-agent> <command> --root <repoRoot>

Agents must write artifacts to `artifacts/queue` (or `artifacts/merged`).
