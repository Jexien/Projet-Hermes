# Wireframes & Scénarios d’erreur — Export manuel

## Parcours utilisateur

### 1. Export réseaux sociaux
- **Wireframe** : Page d’export avec sélection du réseau, aperçu du rendu, champs métadonnées (titre, description), bouton « Exporter ».
- **Scénario d’erreur** : Si le format ou l’export échoue, afficher « Export impossible pour ce réseau. » et proposer de réessayer ou de changer de format.

---

### 2. Export PDF/X prêt à imprimer
- **Wireframe** : Page d’export PDF avec options format, marges, profil couleur, contrôle conformité, bouton « Exporter ».
- **Scénario d’erreur** : Si le PDF n’est pas conforme ou l’export échoue, afficher « Export PDF impossible. » et proposer de corriger les options ou de contacter le support.

---

### 3. Checklist export
- **Wireframe** : Modal ou page checklist avec points à valider (résolution, format, métadonnées, conformité), feedback visuel (vert/rouge), bouton « Valider et exporter ».
- **Scénario d’erreur** : Si un point bloque, afficher « Export impossible tant que la checklist n’est pas validée. »

---

## Autoévaluation
- **Points forts** : wireframes couvrent chaque étape clé, scénarios d’erreur anticipés, checklist intégrée.
- **Points faibles** : wireframes textuels, à compléter par des maquettes visuelles.
- **Améliorations proposées** : ajouter des tests automatisés sur les erreurs critiques, prévoir logs détaillés pour support.
- **Incohérences** : aucune, structure alignée avec les stories export.
- **UX non-expert** : feedback explicite, parcours robuste même en cas d’erreur.
