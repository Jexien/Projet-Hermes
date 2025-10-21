# Wireframes & Scénarios d’erreur — Éditeur raster basique

## Parcours utilisateur

### 1. Accueil / Nouveau projet
- **Wireframe** : Canevas vide ou image importée, bouton « Nouveau projet », barre d’outils latérale (calques, ajustements, filtres, export).
- **Scénario d’erreur** : Si le canevas ou l’import échoue, afficher « Impossible d’initialiser le projet ou d’importer l’image. »

---

### 2. Gestion des calques
- **Wireframe** : Liste des calques à gauche, boutons créer/renommer/supprimer, drag & drop éléments entre calques.
- **Scénario d’erreur** : Si déplacement ou suppression échoue, afficher « Action sur le calque impossible. » et restaurer l’état précédent.

---

### 3. Ajustements et filtres
- **Wireframe** : Barre d’outils ou panneau latéral pour appliquer luminosité, contraste, filtres (flou, netteté, niveaux).
- **Scénario d’erreur** : Si l’application d’un filtre échoue, afficher « Erreur lors de l’application du filtre. » et proposer d’annuler l’action.

---

### 4. Export PNG/JPG
- **Wireframe** : Bouton « Exporter », modal choix format (PNG/JPG), options dimensions/transparence.
- **Scénario d’erreur** : Si l’export échoue, afficher « Export impossible. » et proposer de réessayer ou de télécharger une version brute.

---

### 5. Undo/Redo et gestion erreurs
- **Wireframe** : Boutons « Annuler » et « Rétablir » en haut, historique d’actions accessible.
- **Scénario d’erreur** : Si l’action undo/redo échoue, afficher « Impossible d’annuler/rétablir l’action. » et conserver l’état courant.

---

## Autoévaluation
- **Points forts** : wireframes couvrent chaque étape clé, scénarios d’erreur anticipés, undo/redo et gestion export inclus.
- **Points faibles** : wireframes textuels, à compléter par des maquettes visuelles.
- **Améliorations proposées** : ajouter des tests automatisés sur les erreurs critiques, prévoir logs détaillés pour support.
- **Incohérences** : aucune, structure alignée avec les stories MVP.
- **UX non-expert** : feedback explicite, parcours robuste même en cas d’erreur, actions undo/redo rassurantes.
