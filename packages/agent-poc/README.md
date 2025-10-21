Agent PoC

But: small orchestrator that simulates a Developer agent proposing a PR, a Tester agent running tests, a Reviewer agent scoring, and an Integrator merging or failing.

Run:
  node index.js

It will write artifacts into `artifacts/queue/`, `artifacts/merged/` or `artifacts/failed/`.
