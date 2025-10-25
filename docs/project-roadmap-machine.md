## Projet Hermes — Plan de route machine-lisible

Ce document décrit la vision, la roadmap et la liste des fonctionnalités pour reconstruire Hermes en tant qu'application web réunissant, dans l'ordre, les fonctionnalités de Canva et Adobe Express (phase 1), puis Photoshop/Figma/Illustrator (phases suivantes). Il est structuré pour être lisible et suivable par une IA (tâches actionnables, dépendances, critères d'acceptation, formats d'artefacts).

---

### 0) Résumé exécutif
- Objectif : fournir une application web d'édition graphique local-first et/ou cloud-optional qui combine ergonomie rapide (Canva/Express) et puissance d'édition (Photoshop/Illustrator) à terme.
- Priorité PoC : implémenter un noyau d'éditeur raster/vectoriel minimal + export et templates (phase 1). Agents CLI et pipelines locaux pour CI / automation restent disponibles comme outils d'orchestration et tests.

---

### 1) Principes et contraintes
- Local-first, offline-capable. Les fonctionnalités réseau sont optionnelles et contrôlées.
- Modularité : séparer frontend (UI/UX), backend (API, processing), stockage (local FS / cloud), et agents/opérations automatisées.
- Incremental & testable : découper en petits incréments (sprints de 2 semaines) testables individuellement.
- Sécurité & données : privilégier proxys et sandbox pour tout traitement de fichier potentiellement dangereux.

---

### 2) Périmètre par phase

- Phase 1 — MVP Canva/Adobe Express (3 sprints)
  - Éditeur raster basique : import image, rognage, redimension, calques simples, pinceau de base, texte.
  - Templates & composition : galerie de templates modifiables, glisser-déposer éléments.
  - Export : PNG / JPG / PDF export qualité configurable.
  - UI responsive et accessible (toolbar, panneau calques, timeline simplifiée).
  - Auth/local projects : sauvegarde locale + option export ZIP projet.

- Phase 2 — Fonctions intermédiaires (4 sprints)
  - Outils avancés : détourage automatique simple, filtres, réglages couleur (exposition, contraste, saturation).
  - Vector support minimal : formes, tracés, texte vectoriel.
  - Collaboration read-only (optionnel) : partage d'export ou prévisualisation.

- Phase 3 — Puissance (6+ sprints)
  - Outils avancés de type Photoshop : masques, blending modes, calques d'effets, outils de sélection avancés.
  - Import/Export compatibilités : PSD, SVG, PDF amélioré.
  - Edition vectorielle riche (chemins, boolean ops) similaire à Illustrator.
  - Interop avec Figma : importer calques/structures (si possible).

---

### 3) Décomposition en livrables (par sprint)
- Sprint 1 (MVP 1) : scaffolding monorepo, app frontend minimale, route /editor, importer image, visualiser image.
- Sprint 2 (MVP 2) : outil recadrage, redimension, export PNG/JPG.
- Sprint 3 (MVP 3) : templates, panneau calques, save/load projet.

Etc. (voir section machine-tasks pour toutes les tâches détaillées).

---

### 4) Critères d'acceptation (par fonctionnalité)
- Import image : l'utilisateur peut glisser/déposer un PNG/JPG, le fichier est affiché et metadata lue; test automatisé : importer 3 formats différents.
- Export PNG : export produit un fichier PNG valide avec dimensions demandées ; test automatisé : comparaison checksum minimal + taille.
- Templates : ouvrir un template et modifier texte/position ; test manuel + script e2e qui simule modifications et vérifie JSON projet.

---

### 5) Architecture cible (haut niveau)
- Frontend : React (Vite) ou Next.js app (client-render for editor) — composants réutilisables, state management via Zustand ou Redux minimal.
- Backend (optionnel) : Node.js express minimal pour traitements lourds (export serveur), APIs REST JSON.
- Processing : bibliothèques locales (sharp, canvas, skia) ; pour vector : SVG native + paper.js ou fabric.js.
- Storage : local FS / IndexedDB pour navigateur ; adaptateur cloud optionnel (S3-like).
- Agents / automation : conserver pattern `packages/agents/*` pour tâches reproductibles (scaffold, ci, tests, integrator).

---

### 6) Qualité & tests
- Tests unitaires : composants, utilitaires image, transformations.
- Tests e2e : Playwright pour interactions UI de l'éditeur (import, edit, export).
- Smoke-tests : exécuter `scripts/smoke-agents.ps1` et pipelines d'integration.

---

### 7) Plan machine-actionnable (tâches prioritaires)

Les tâches ci‑dessous sont formatées pour être consommées par une IA : chaque tâche contient id, titre, description, entrée/sortie, dépendances et estimation.

```json
{
  "project":"Hermes",
  "version":"1.0",
  "tasks":[
    {"id":"T001","title":"Scaffold monorepo","desc":"Créer la structure monorepo (packages/frontend, packages/backend, packages/shared, packages/agents)","inputs":[],"outputs":["package.json","tsconfig.json","README.md"],"deps":[],"estimate_days":2},
    {"id":"T002","title":"Scaffold frontend minimal","desc":"Initialiser app frontend (Vite + React), route /editor, page vide avec canvas","inputs":["T001"],"outputs":["packages/frontend"],"deps":["T001"],"estimate_days":3},
    {"id":"T003","title":"Importer image dans l'éditeur","desc":"Implémenter glisser-déposer et affichage d'images PNG/JPG sur le canvas","inputs":["user file"],"outputs":["image rendered on canvas"],"deps":["T002"],"estimate_days":2},
    {"id":"T004","title":"Recadrage et redimension","desc":"Outils recadrage & redimension avec handles","inputs":["canvas image"],"outputs":["modified image state"],"deps":["T003"],"estimate_days":3},
    {"id":"T005","title":"Export PNG/JPG","desc":"Exporter la composition au format PNG/JPG avec options qualité/dimensions","inputs":["modified image state"],"outputs":["exported file"],"deps":["T004"],"estimate_days":2},
    {"id":"T006","title":"Templates & UI","desc":"Ajouter galerie de templates modifiables et panneau calques simple","inputs":["T005"],"outputs":["templates feature"],"deps":["T005"],"estimate_days":4}
  ]
}
```

---

### 8) Définition d'artefacts / formats
- Projet sauvegardé (JSON) : contient liste de calques, métadatas, transformations. Exemple minimal :

```json
{
  "projectId":"string",
  "name":"string",
  "width":1024,
  "height":768,
  "layers":[{"id":"l1","type":"image","src":"data:...","transform":{}}]
}
```

Ces fichiers seront stockés dans `storage/projects/` (local) et peuvent être exportés dans `artifacts/` pour consommation par agents.

---

### 9) Rôles & responsabilités (petit guide pour l'IA)
- AI / agents : générer code scaffolding, créer issues, produire PRs avec patchs minimalistes, exécuter smoke-tests, générer mockups (via descriptions), produire tests e2e.
- Humain (product owner) : valider priorités, UI/UX critiques, décider trade-offs créatifs.

Pour chaque tâche l'IA doit :
1. Vérifier dépendances (tâches achevées). 
2. Scaffolder le code minimal. 
3. Exécuter tests locaux rapides (lint + smoke). 
4. Ouvrir PRs atomiques avec description claire et artefacts de test.

---

### 10) Mesures de succès
- MVP usable : utilisateur peut créer, modifier et exporter un visuel simple en < 3 actions.
- Régression : pipelines CI (smoke-tests) verts sur PRs.
- Performances : chargement éditeur < 2s sur machine décente (desktop).

---

### 11) Risques & mitigations
- Traitements lourds (large images) : utiliser worker threads / web workers / offload vers backend.
- Complexité vectorielle : prioriser SVG+paper.js avant d'implémenter un moteur complet.

---

### 12) Prochaines actions immédiates (pour l'IA — backlog court)
1. Créer `packages/frontend` scaffold Vite + React (T002). 
2. Implémenter import d'image (T003) et tests e2e basiques. 
3. Ajouter export PNG (T005). 
4. Documenter format `project.json` et intégrer sauvegarde locale.

---

Fichier créé automatiquement par l'IA — pour restaurer ou compléter, éditez `docs/project-roadmap-machine.md`.
