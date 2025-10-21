# Wireframes & Scénarios d’erreur — Éditeur vectoriel MVP

## Parcours utilisateur

### 1. Accueil / Nouveau projet
- **Wireframe** : Canvas vide, bouton « Nouveau projet », barre d’outils latérale (formes, calques, export).
- **Scénario d’erreur** : Si le canvas ne se charge pas, afficher un message « Impossible d’initialiser le projet. Veuillez réessayer ou contacter le support. »

---

### 2. Ajout de forme
- **Wireframe** : Sélection d’une forme dans la barre d’outils, affichage sur le canvas, panneau propriétés à droite.
- **Scénario d’erreur** : Si la forme ne peut être ajoutée (bug, ressource manquante), afficher « Erreur lors de l’ajout de la forme. » avec option « Réessayer ».

---

### 3. Modification de forme
- **Wireframe** : Sélection, drag & resize, color picker, propriétés éditables.
- **Scénario d’erreur** : Si la modification échoue, afficher « Impossible de modifier la forme. » et proposer d’annuler l’action.

---

### 4. Gestion des calques
- **Wireframe** : Liste des calques à gauche, boutons créer/renommer/supprimer, drag & drop éléments entre calques.
- **Scénario d’erreur** : Si déplacement ou suppression échoue, afficher « Action sur le calque impossible. » et restaurer l’état précédent.

---

### 5. Undo/Redo
- **Wireframe** : Boutons « Annuler » et « Rétablir » en haut, historique d’actions accessible.
- **Scénario d’erreur** : Si l’action undo/redo échoue, afficher « Impossible d’annuler/rétablir l’action. » et conserver l’état courant.

---

### 6. Export SVG/PNG
- **Wireframe** : Bouton « Exporter », modal choix format (SVG/PNG), options dimensions/transparence.
- **Scénario d’erreur** :
  - Si l’export échoue (erreur serveur, format non supporté), afficher « Export impossible. » et proposer de réessayer ou de télécharger une version brute.
  - Loguer l’erreur pour support technique.

---

### 7. Accessibilité & performance
- **Wireframe** : Indicateurs de chargement, feedback instantané, raccourcis clavier affichés.
- **Scénario d’erreur** : Si une action est trop lente, afficher « Action en cours… » puis « Temps d’attente anormal, veuillez vérifier votre connexion ou relancer l’éditeur. »

---

## Autoévaluation
- **Points forts** : wireframes couvrent chaque étape clé, scénarios d’erreur anticipés, undo/redo et gestion export inclus.
- **Points faibles** : wireframes textuels, à compléter par des maquettes visuelles (Figma, Excalidraw…).
- **Améliorations proposées** : ajouter des tests automatisés sur les erreurs critiques, prévoir logs détaillés pour support.
- **Incohérences** : aucune, structure alignée avec les stories MVP.
- **UX non-expert** : feedback explicite, parcours robuste même en cas d’erreur, actions undo/redo rassurantes.
