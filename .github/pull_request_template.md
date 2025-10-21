## Résumé
- [ ] Cette PR met à jour `CHANGELOG.md`
- [ ] Les captures/logs nécessaires sont jointes (rapports `reports/` ou artefacts CI)
- [ ] Les documents impactés (`docs/`, `README.md`, `roadmap`) sont alignés

## Checklist qualité
- [ ] `pnpm lint`
- [ ] `pnpm test`
- [ ] `pnpm typecheck`
- [ ] `pnpm test:e2e`
- [ ] `pnpm roadmap:generate` + `git diff -- docs/roadmap-snippet.md`
- [ ] Scans sécurité (audit npm / Trivy / Gitleaks) propres

## Tests/Validation
Décrivez les scénarios testés (CLI, Playwright, scripts, etc.).

## Notes complémentaires
- Risques connus / dette technique acceptée
- Besoins de revue spécifiques (sécu, UX, performance)
