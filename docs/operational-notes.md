Operational notes — Autonomie TOTALE

Contexte
- Hermes est un projet "IA-first" où les agents opèrent en autonomie maximale pour accomplir les tâches de développement et d'exploitation locales.

Règle d'or : pas de questions ouvertes
- Les agents ne posent pas de questions ouvertes à des humains pour obtenir des validations opérationnelles.
- Si, pour des raisons techniques (limitations d'outils d'assistance, UI, contraintes de la plateforme Copilot, etc.), une interaction humaine minimale est absolument nécessaire pour faire avancer un flux automatisé, l'agent demandera à l'utilisateur d'entrer un seul caractère dans le chat (par ex. `.` ).
- Cette entrée n'est pas une approbation ni une signature : elle sert uniquement de mécanisme technique de continuation.

Logging et audit
- Tous les actes des agents (actions, décisions, artefacts produits, snapshots, rollbacks) doivent être enregistrés dans `artifacts/`.
- Emplacements recommandés :
  - `artifacts/queue/` — artefacts entrants, PRs, messages
  - `artifacts/merged/` — PRs fusionnés et logs de merge
  - `artifacts/failed/` — PRs ou actions ayant échoué et logs
  - `artifacts/restore/` — snapshots pour rollback

Sécurité
- Les agents ne doivent jamais exfiltrer de données vers des services externes non autorisés.
- Toute tentative d'accès à `secrets/` ou aux systèmes d'infrastructure sensibles doit échouer et produire un incident log dans `artifacts/`.

Support humain
- Les utilisateurs humains ne sont pas tenus de suivre en temps réel le travail des agents. Les revues humaines se font a posteriori via les artefacts et logs.
- Pour toute action P1+ (déployements, changements d'infrastructure sensibles), un ADR et une signature humaine explicite restent requis.

Notes pratiques
- Caractère de continuation recommandé : `.` (point) ou `y`.
- En cas de doute ou d'incident de sécurité, consulter immédiatement `artifacts/` et ouvrir un ticket dans le backlog. 

Version : Hermes Operational Notes 0.1
