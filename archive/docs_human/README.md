# Archive: documentation orientée humain

Les fichiers de documentation orientés "humain" ont été retirés de `docs/` et centralisés en archive pour réduire la surface humaine du dépôt.

Raison : requête de suppression des éléments à destination humaine. Les contenus originaux restent dans l'historique Git (commits précédents) si besoin de restauration.

Fichiers concernés (exemples) :
- docs/overview.md
- docs/stack-technique.md
- docs/project-definition.md
- docs/plan-developpement.md
- docs/architecture-highlevel.md
- docs/architecture.md
- docs/backlog-priorise.md
- docs/benchmark-adobe-express-canva.md
- docs/stories/ (tous les fichiers de stories et wireframes)
- docs/ai-autonomie-outillage.md
- docs/operational-notes.md
- docs/adr/ (ADRs)

Pour restaurer un fichier : utiliser `git checkout <commit-sha> -- <path>` ou retrouver le commit historique correspondant.
