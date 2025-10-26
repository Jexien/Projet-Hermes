# MVP Decision  options and recommendation

Date: 2025-10-26

Contexte
- Après revue des propositions (Gemini) et consolidation en local-first, il est indispensable de choisir et verrouiller un MVP précis avant de lancer un développement intensif.

Trois options de MVP (court résumé)

Option 1  Core Local Editor (recommandée)
- Description: éditeur local-first pour raster et templates comprenant canvas, drag/drop, layers, import/export (PNG/JPG/SVG), gestion locale d'assets (IndexedDB/File System Access API), et système de templates.
- Avantages: compatible avec la stratégie locale-first, faible coût infra, permet livrer une app fonctionnelle rapidement, composants frontend fortement réutilisables.
- Risques & limites: pas d'IA avancée ni de collaboration realtime au démarrage; concurrence avec outils locaux existants.
- Critères d'acceptation (DoD):
  - Canvas éditable avec calques, sélection, déplacement et redimensionnement.
  - Import/export images (PNG/JPG) et export SVG/PDF basique.
  - Sauvegarde et chargement de projet local (IndexedDB ou FS API).
  - Templates intégrés et workflow d'application de template.

Option 2  Background Remover (feature centreuse)
- Description: outil focalisé sur le détourage automatique d'images (image & vidéo léger), avec export transparent/PNG et intégration UI simple dans un éditeur minimal.
- Avantages: feature à fort impact UX qui attire des utilisateurs, peut être proposée comme plugin BYOK si besoin d'IA.
- Risques & limites: qualité locale limitée vs cloud; nécessite R&D ou intégration BYOK pour qualité compétitive.
- Critères d'acceptation:
  - Détourage automatique pour images (résultats acceptables sur 80% des cas simples).
  - Export PNG transparent et intégration dans un projet template.

Option 3  IA Text-to-Image minimal (cloud option via BYOK)
- Description: simple interface prompt->image (intégration d'un fournisseur externe via BYOK), puis insertion de l'image dans un template.
- Avantages: forte valeur perçue, différenciant pour marketing.
- Risques & limites: dépendances externes, coût API, gestion des clés (BYOK), éloigné du local-first pure.
- Critères d'acceptation:
  - Prompt génère une image via API utilisateur (BYOK) et l'insère dans l'éditeur.
  - UI d'entrée de clé API, opt-in explicite et documentation de coûts.

Recommandation
- Choix recommandé: Option 1  Core Local Editor.
  - Raisons: cohérence avec la décision locale-first, permet d'itérer rapidement, limite les coûts initiaux et facilite le recrutement de premiers utilisateurs ciblés (privacy-conscious). L'architecture et les composants ainsi développés faciliteront ensuite l'ajout d'options (Background Remover ou BYOK GenAI) en tant que plugins.

Plan d'exécution immédiat après verrouillage
1. Mettre à jour `docs/project-roadmap-machine.md` pour fixer T1..T4 (déjà fait partiellement).
2. Transformer les tâches Phase 1 en issues GitHub et prioriser (T1 ~ T4 en 3 sprints).
3. Scaffolder storybook + quickstart dev (package.json, README).
4. Démarrer sprint 1: scaffold monorepo, composants UI, storybook, tests unitaires.

Notes opérationnelles
- Si tu veux que je crée automatiquement les issues Phase 1 et/ou que je scafolde le quickstart, dis 'B' pour issues, 'C' pour scaffold, ou 'B+C' pour les deux. Je peux exécuter cela immédiatement.

