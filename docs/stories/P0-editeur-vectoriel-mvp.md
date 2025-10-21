# User Stories — Éditeur vectoriel MVP

## Epic
En tant qu’utilisateur créatif, je veux pouvoir créer, modifier et exporter des visuels vectoriels (SVG/PNG) via un éditeur simple, afin de produire des assets graphiques réutilisables pour mes projets.

---

### Story 1 — Création d’un canvas 2D
- **Rôle** : Utilisateur
- **Besoin** : Démarrer un nouveau projet graphique sur une zone de dessin vectorielle.
- **Valeur** : Permet de créer des visuels personnalisés, base de tout workflow créatif.
- **Critères d’acceptation** :
  - L’utilisateur peut ouvrir l’éditeur et voit un canvas vide.
  - Le canvas supporte le zoom et le déplacement.
  - Un bouton « Nouveau projet » réinitialise le canvas.
- **Risques** : Complexité UX si navigation non intuitive.

---

### Story 2 — Ajout et modification de formes de base
- **Rôle** : Utilisateur
- **Besoin** : Insérer des formes (rectangle, cercle, ligne, texte) et les modifier (taille, couleur, position).
- **Valeur** : Permet de composer des visuels variés sans compétence technique.
- **Critères d’acceptation** :
  - L’utilisateur peut ajouter chaque type de forme via une barre d’outils.
  - Les formes sont sélectionnables et modifiables (drag, resize, color picker).
  - Les propriétés sont éditables dans un panneau latéral.
- **Risques** : Bugs d’interaction (sélection, drag, resize).

---

### Story 3 — Gestion des calques
- **Rôle** : Utilisateur avancé
- **Besoin** : Organiser les éléments sur différents calques pour faciliter la composition.
- **Valeur** : Permet de structurer des visuels complexes et d’isoler des modifications.
- **Critères d’acceptation** :
  - L’utilisateur peut créer, renommer, supprimer des calques.
  - Les éléments peuvent être déplacés d’un calque à l’autre.
  - La visibilité et l’ordre des calques sont contrôlables.
- **Risques** : Perte d’éléments lors de manipulations calques.

---

### Story 4 — Export SVG/PNG
- **Rôle** : Utilisateur
- **Besoin** : Exporter le visuel créé dans un format réutilisable (SVG/PNG).
- **Valeur** : Permet d’utiliser le visuel dans d’autres outils ou de le partager facilement.
- **Critères d’acceptation** :
  - L’utilisateur peut exporter le canvas en SVG ou PNG via un bouton dédié.
  - Les propriétés du visuel (dimensions, transparence) sont respectées à l’export.
  - Un message de confirmation s’affiche après export.
- **Risques** : Problèmes de compatibilité ou de qualité à l’export.

---

### Story 5 — Accessibilité et performance
- **Rôle** : Utilisateur
- **Besoin** : Utiliser l’éditeur sans latence, avec une interface accessible (clavier, contraste).
- **Valeur** : Permet à tous les profils d’utiliser l’outil efficacement.
- **Critères d’acceptation** :
  - L’éditeur répond instantanément aux actions courantes.
  - Les raccourcis clavier sont documentés et fonctionnels.
  - L’interface respecte les standards a11y (contraste, navigation clavier).
- **Risques** : Exclusion de certains profils si accessibilité négligée.

---

## Autoévaluation
- **Points forts** : Stories couvrent tout le parcours MVP, critères précis, risques identifiés.
- **Points faibles** : Pas encore de wireframes ni de scénarios d’erreur détaillés.
- **Améliorations proposées** : Ajouter des cas limites (undo/redo, gestion erreurs export), prévoir tests d’accessibilité.
- **Incohérences** : Aucune relevée, stories alignées avec le backlog P0.
- **UX non-expert** : Parcours simple, actions explicites, feedback export/documentation à prévoir.
