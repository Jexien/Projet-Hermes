# User Stories — Éditeur raster basique

## Epic
En tant qu’utilisateur créatif, je veux pouvoir éditer des images bitmap (raster) avec calques, ajustements et filtres, afin de produire des visuels adaptés à mes besoins graphiques.

---

### Story 1 — Création d’un projet raster
- **Rôle** : Utilisateur
- **Besoin** : Démarrer un nouveau projet d’édition d’image bitmap.
- **Valeur** : Permet de retoucher des photos ou créer des compositions à partir d’images existantes.
- **Critères d’acceptation** :
  - L’utilisateur peut ouvrir l’éditeur et importer une image ou démarrer sur un canevas vide.
  - Le canevas supporte le zoom et le déplacement.
  - Un bouton « Nouveau projet » réinitialise le canevas.
- **Risques** : Problèmes de compatibilité format image, UX confuse à l’import.

---

### Story 2 — Gestion des calques
- **Rôle** : Utilisateur avancé
- **Besoin** : Organiser les éléments sur différents calques pour faciliter la composition et les retouches.
- **Valeur** : Permet de structurer des visuels complexes et d’isoler des modifications.
- **Critères d’acceptation** :
  - L’utilisateur peut créer, renommer, supprimer des calques.
  - Les éléments (images, ajustements) peuvent être déplacés d’un calque à l’autre.
  - La visibilité et l’ordre des calques sont contrôlables.
- **Risques** : Perte d’éléments lors de manipulations calques, confusion sur la hiérarchie.

---

### Story 3 — Ajustements et filtres
- **Rôle** : Utilisateur
- **Besoin** : Modifier la luminosité, le contraste, appliquer des filtres standards (flou, netteté, niveaux).
- **Valeur** : Permet d’améliorer ou styliser les images rapidement.
- **Critères d’acceptation** :
  - L’utilisateur peut appliquer des ajustements sur chaque calque indépendamment.
  - Les filtres sont accessibles via une barre d’outils ou un panneau latéral.
  - Les modifications sont visibles en temps réel.
- **Risques** : Latence sur images lourdes, bugs d’application des filtres.

---

### Story 4 — Export PNG/JPG
- **Rôle** : Utilisateur
- **Besoin** : Exporter le visuel créé dans un format bitmap réutilisable (PNG/JPG).
- **Valeur** : Permet d’utiliser le visuel dans d’autres outils ou de le partager facilement.
- **Critères d’acceptation** :
  - L’utilisateur peut exporter le canevas en PNG ou JPG via un bouton dédié.
  - Les propriétés du visuel (dimensions, transparence) sont respectées à l’export.
  - Un message de confirmation s’affiche après export.
- **Risques** : Problèmes de compatibilité ou de qualité à l’export.

---

### Story 5 — Undo/Redo et gestion erreurs
- **Rôle** : Utilisateur
- **Besoin** : Pouvoir annuler/rétablir les actions, être informé en cas d’erreur (import, filtre, export).
- **Valeur** : Sécurise le workflow, rassure l’utilisateur.
- **Critères d’acceptation** :
  - Boutons « Annuler » et « Rétablir » accessibles, historique d’actions.
  - Message d’erreur explicite en cas d’échec (import, filtre, export).
  - Les erreurs sont logguées pour support technique.
- **Risques** : Perte de travail si undo/redo défaillant, frustration utilisateur.

---

## Autoévaluation
- **Points forts** : stories couvrent tout le parcours MVP raster, critères précis, risques identifiés, gestion erreurs et undo/redo intégrés.
- **Points faibles** : pas encore de wireframes ni de scénarios d’erreur détaillés.
- **Améliorations proposées** : ajouter des cas limites (import formats exotiques, filtres cumulés), prévoir tests d’accessibilité et de performance.
- **Incohérences** : aucune relevée, stories alignées avec le backlog P0.
- **UX non-expert** : parcours simple, feedback export/documentation à prévoir, actions undo/redo rassurantes.
