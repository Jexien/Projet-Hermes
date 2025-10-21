# Benchmark fonctionnalités : Adobe Express & Canva

> Contexte : l'exploration directe des URLs fournies (`https://new.express.adobe.com`, `https://www.canva.com`) n'est pas possible depuis l'environnement actuel. Les informations ci-dessous synthétisent la documentation et les annonces publiques disponibles jusqu'en 2024. Toute mise à jour devra être validée lors d'une session d'exploration authentifiée.
>
> **Décision du 2025-10-03** : toutes les fonctionnalités nécessitant un entraînement IA maison sont temporairement mises en pause faute de ressources GPU ou d'un réseau de ≥500 volontaires. Elles demeurent documentées pour planification future mais ne doivent pas être développées tant que les prérequis ne sont pas réunis.

## Adobe Express

### Inventaire des fonctionnalités

| Domaine | Fonctionnalité | Statut (Gratuit / Premium) | Notes d'implémentation |
| --- | --- | --- | --- |
| Templates | Bibliothèque de modèles pour réseaux sociaux, présentations, flyers, logos | Gratuit (base), Premium (modèles exclusifs) | Préparer un catalogue versionné avec filtrage par use-case |
| Éditeur graphique | Drag & drop, calques, manipulation d'objets | Gratuit | S'appuyer sur un moteur canvas (Fabric.js/Konva) |
| Assets Adobe Stock | Photos, icônes, arrière-plans | Gratuit (sélection limitée), Premium (Stock complet) | Intégrer un provider asset avec quotas par plan |
| Retouche image | Recadrage, redimensionnement intelligent, suppression d'arrière-plan | Gratuit (fonctionnalités de base), Premium (batch, haute résolution) | Workers pour traitement GPU ou intégration API IA |
| Génération IA (Firefly) | Texte → image, recoloration, styles typographiques | Premium (quotas élargis) | Service IA dédié + gouvernance prompts |
| Éditeur vidéo | Montage léger, transitions, musique libre de droits | Gratuit (durée limitée), Premium (bibliothèque audio élargie) | Pipeline FFmpeg + gestion droits audio |
| Outils PDF | Conversion, fusion, signature | Gratuit (fonctions de base), Premium (volumes illimités) | Microservice PDF + quotas |
| Brand Kit | Logos, palettes, typos enregistrés | Premium | Stockage dédié par organisation |
| Publication sociale | Planification, multi-comptes | Premium (multi-comptes), Gratuit (publication simple) | Connecteurs OAuth + scheduler |
| Bibliothèques cloud | Stockage d'actifs, réutilisation | Gratuit (quota réduit), Premium (quota augmenté) | CDN + stratégie de cache |
| Collaboration | Liens de partage, commentaires | Gratuit (commentaires), Premium (coédition temps réel) | WebSocket + système de rôles |
| Intégration Creative Cloud | Aller-retour avec Photoshop, Illustrator, Lightroom | Premium | Connecteurs CC + conversion formats |
| Export multi-formats | PNG, JPG, MP4, GIF, PDF | Gratuit (résolution standard), Premium (haute résolution, transparence avancée) | File d'attente export + scaling |
| Gestion multi-pages | Présentations, livrets | Gratuit | Support multi-canvas |
| Tutoriels contextuels | Guides pas-à-pas, onboarding | Gratuit | Découpage parcours utilisateur |
| Gestion des polices | Adobe Fonts, uploads | Gratuit (sélection), Premium (upload illimité) | Pipeline de conversion typographique |
| Historique/versioning | Duplication, restore | Gratuit | Journal des révisions |
| Support mobile | Apps iOS/Android synchronisées | Gratuit | API unifiée + notifications push |
| Automatisations | Redimensionnement auto, animations texte | Gratuit (sélection), Premium (automations avancées) | Scripting paramétrable |
| Marketplace Premium | Contenus réservés | Premium | Paiement, licence contenus |

### Bases pour un clone fonctionnel
- **Architecture** : front SPA (React/Next.js) + éditeur canvas, back micro-services (gestion projets, assets, IA, export, publication sociale).
- **Pipeline IA** : service Python (FastAPI) orchestrant génération image/texte (modèles diffusion + LLM) avec quotas.
- **Collaboration** : CRDT/OT via WebSocket, journalisation des actions, rôles multi-niveaux.
- **Exports & workers** : file asynchrone (RabbitMQ/Kafka) + workers FFmpeg/Sharp.
- **Plan de livraison** :
  1. MVP éditeur graphique + templates + export PNG.
  2. Assets cloud + retouche image basique.
  3. IA image + suppression arrière-plan.
  4. Vidéo courte + audio libre de droits.
  5. Brand kit + publication sociale.
  6. Collaboration temps réel + PDF avancé.
  7. Marketplace premium + analytics.

## Canva

### Inventaire des fonctionnalités

| Domaine | Fonctionnalité | Statut (Gratuit / Pro) | Notes d'implémentation |
| --- | --- | --- | --- |
| Templates | Modèles pour réseaux sociaux, présentations, documents | Gratuit (large catalogue), Pro (modèles exclusifs) | Gestion de catégories, moteur de recherche |
| Éditeur graphique | Drag & drop, calques, smart guides | Gratuit | Canvas + snapping précis |
| Assets | Photos, éléments graphiques, vidéos, audio | Gratuit (sélection), Pro (bibliothèque complète, premium stock) | Marketplace interne + suivi licences |
| Brand Kit | Logos, palettes, polices personnalisées | Pro | Espace marque multi-brand |
| Brand Control | Verrous de styles, workflows validation | Pro (Enterprise) | Gestion rôles + validation contenus |
| Background Remover | Suppression arrière-plan | Pro | Service IA payant |
| Magic Resize | Redimensionnement intelligent | Pro | Scripts automations |
| Magic Media (IA) | Texte → image, générateur vidéo | Pro | Intégration IA dédiée |
| Docs & Presentations | Mode docs collaboratif, présentations live | Gratuit (édition), Pro (templates premium, analytics) | Module simplifié type Notion/Slides |
| Whiteboards | Tableau blanc collaboratif | Gratuit | Gestion curseurs multiples |
| Vidéo & Animation | Montage vidéo, animations, transitions | Gratuit (basique), Pro (stock premium, export 4K) | Workers vidéo |
| Édition PDF | Import, export, annotation | Gratuit (limité), Pro (OCR, collaboration) | Service PDF |
| Planning social | Planification et publication | Pro | Scheduler + connecteurs réseaux |
| Collaboration temps réel | Coédition, commentaires, @mentions | Gratuit | WebSocket + notifications |
| Workflows d’approbation | Validation, tâches | Pro (Enterprise) | Module BPM léger |
| stockage cloud | 5 Go gratuits, 1 To Pro | Dépend du plan | Stockage objet + quotas |
| App Marketplace | Intégrations tierces (Google Drive, Slack, etc.) | Gratuit (sélection), Pro (connecteurs avancés) | SSO + API partenaires |
| Impression & livraison | Commande impressions physiques | Payant (service additionnel) | Intégration logistique |
| Présentations live | Mode présentateur, sondages | Gratuit (base), Pro (analytics avancés) | Temps réel + analytics |
| Sites web one-page | Publication de mini-sites | Gratuit (fonctionnalités limitées), Pro (domaine personnalisé) | Générateur statique |
| Gestion d’équipes | Espaces partagés, dossiers | Gratuit (équipe réduite), Pro (equipes avancées) | RBAC |
| Analytics | Statistiques d’usage contenue | Pro (Enterprise) | Collecte events + reporting |

### Bases pour un clone fonctionnel
- **Architecture** : similaire à Adobe Express mais en ajoutant modules docs/whiteboard/notion-like.
- **Écosystème apps** : prévoir une couche d’extensions (iframe/app SDK) pour intégrations tierces.
- **Automations pro** : pipelines de redimensionnement, exports multi-format, workflows d’approbation.
- **Roadmap suggérée** :
  1. Éditeur graphique + templates + stockage cloud.
  2. Collaboration temps réel + commentaires.
  3. Modules Docs/Presentations + whiteboard.
  4. Automations Pro (magic resize, background remover).
  5. App Marketplace + publication sociale.
  6. Impression & e-commerce.
  7. Analytics avancés + administration Enterprise.

## Adobe Illustrator (vectoriel)

| Domaine | Fonctionnalité | Statut (dans le projet : Gratuit) | Notes d'implémentation |
| --- | --- | --- | --- |
| Vector design | Plume, formes complexes, Pathfinder | Gratuit | Implémenter un moteur vectoriel (Paper.js, Rough.js) + CSG 2D |
| Gestion des calques | Verrous, masques, groupes | Gratuit | Gestion hiérarchique + scènes sérialisées |
| Symboles & motifs | Bibliothèque réutilisable | Gratuit | Stockage de symboles paramétriques |
| Typographie avancée | Variables, OpenType | Gratuit | Intégrer moteur typographique OpenType.js |
| Grilles & repères | Grille isométrique, alignement | Gratuit | Systèmes de guides configurables |
| Tracés dynamiques | Offset, blend, dégradés de forme | Gratuit | Algorithmes de morphing vectoriel |
| Export vectoriel | SVG, PDF, EPS | Gratuit | Pipeline de conversion vectorielle |

## Adobe Photoshop (raster)

| Domaine | Fonctionnalité | Statut (dans le projet : Gratuit) | Notes d'implémentation |
| --- | --- | --- | --- |
| Retouche photo | Courbes, niveaux, balance des couleurs | Gratuit | Moteur de traitement GPU/WebGL |
| Calques & masques | Fusion, modes de fusion, masques | Gratuit | Système de calques raster + blend modes |
| Sélections avancées | Sélection objet, plume raster | Gratuit | IA segmentation + outils manuels |
| Filtres & effets | Flou, netteté, liquify | Gratuit | Pipeline shaders + workers WASM |
| Brushes | Pinceaux dynamiques, textures | Gratuit | Moteur de brosses personnalisables |
| Contenu génératif | Remplissage IA | Gratuit | Modèle diffusion inpainting interne |
| HDR & Panorama | Fusion d'expositions | Gratuit | Algorithmes d'alignement + tonemapping |
| Export | Formats multiples, compression | Gratuit | Intégration Sharp/wasm | 

## Adobe InDesign (mise en page)

| Domaine | Fonctionnalité | Statut (dans le projet : Gratuit) | Notes d'implémentation |
| --- | --- | --- | --- |
| Mise en page multi-colonnes | Gabarits, règles, grilles modulaires | Gratuit | Moteur de layout typographique (Paged.js) |
| Chaînage de texte | Liens entre blocs | Gratuit | Gestion flows + pagination |
| Styles | Styles de paragraphe, caractère, objet | Gratuit | Système de styles hiérarchiques |
| Tableaux | Mise en forme avancée | Gratuit | Composant table éditable |
| Préparation impression | Repères, CMJN, surimpressions | Gratuit | Pipeline PDF/X + gestion couleurs |
| Livre & index | Table des matières, index | Gratuit | Génération automatique + scripts |
| Collaboration | Relecture, notes | Gratuit | Workflow commentaires sur pages |

## Figma (UI/UX collaboratif)

| Domaine | Fonctionnalité | Statut (dans le projet : Gratuit) | Notes d'implémentation |
| --- | --- | --- | --- |
| Design d'interfaces | Artboards responsives, Auto Layout | Gratuit | Moteur layout flex/grille avancé |
| Design system | Components, variantes, tokens | Gratuit | Stockage design tokens + synchronisation |
| Prototypage | Liens interactifs, transitions | Gratuit | Export prototypes web, interactions micro |
| Collaboration temps réel | Curseurs multiples, commentaires | Gratuit | CRDT/OT + WebSocket |
| Versioning | Branches, historique | Gratuit | Versioning documentaire + diff visuel |
| Plugins & widgets | API extensibilité | Gratuit | Sandbox plugins (iframe + API limitée) |
| Dev handoff | Code inspectable, exports | Gratuit | Génération specs CSS/React |

## Blender (3D & animation)

| Domaine | Fonctionnalité | Statut (dans le projet : Gratuit) | Notes d'implémentation |
| --- | --- | --- | --- |
| Modélisation | Polygones, subdivision, sculpt | Gratuit | Moteur 3D WebGPU/WebGL + lib type three.js |
| UV & shading | Dépliage UV, nodes matériaux | Gratuit | Éditeur nodal simplifié + presets |
| Animation | Rig, keyframes, courbes | Gratuit | Timeline + retargeting squelettique |
| Physiques | Collision, rigid body, cloth | Gratuit | Moteur physique (Ammo.js, Cannon.js) |
| Rendu | Path tracing, Eevee-like | Gratuit | Intégration WebGPU path tracing léger |
| Grease Pencil | Dessin 2D/3D | Gratuit | Outil stroke 2D projecté |
| Scripts | Automatisation (Python) | Gratuit | API scripting sandbox (JS/Python server) |

### Simplification & assistance 3D
- **Modes guidés** : assistants étape par étape (création objets primitifs → modificateurs → textures → éclairage → rendu).
- **Bibliothèques de scènes prêtes** : templates d’environnements, personnages riggés, matériaux photoréalistes.
- **Manipulation en langage naturel** : commandes LLM pour ajouter/transformer des objets ("ajoute une table en bois" → instanciation + ajustements).
- **Auto-rig & animation assistée** : IA pour générer rigs humains/animaux et proposer des animations par défaut.
- **Simplification UV & shading** : presets automatiques, assistant IA pour suggérer matériaux et configurer l’éclairage.
- **Export universel** : GLB/FBX/usdz optimisés pour web, AR, impression 3D.

## Synthèse unifiée des fonctionnalités cibles

| Domaine | Fonctionnalité clé | Statut (projet 100% gratuit) | API externe requise ?* | IA custom nécessaire ? | Exécution principale |
| --- | --- | --- | --- | --- | --- |
| Templates & suggestions | Catalogue de modèles, recommandations contextuelles | Gratuit (illimité) | Non (catalogue interne) | Optionnel (reco ML interne) | IA possible (génération catalogue, tags) |
| Vector design & illustration | Plume, Pathfinder, symboles, export SVG/EPS | Gratuit | Non | Non | IA pour outillage ; finalisation humaine |
| Raster photo editing | Calques, masques, filtres, HDR | Gratuit | Non | Oui (inpainting, amélioration) | IA + supervision retouche expert |
| Layout & publishing | Gabarits multi-colonnes, styles, PDF/X | Gratuit | Non | Optionnel (assistant mise en page) | IA assistante ; validation humaine |
| UI/UX & design system | Auto Layout, composants, dev handoff | Gratuit | Non | Optionnel (génération variantes) | IA pour suggestions ; designer valide |
| 3D modeling & rendering | Sculpt, matériaux, rendu temps réel/path tracing | Gratuit | Non (moteur interne) | Oui (auto-rig, prompts 3D) | Co-dev IA + équipe 3D |
| Animation & rigging | Timeline, courbes, retargeting | Gratuit | Non | Oui (auto-rig, motions) | IA génère base ; animateur ajuste |
| Physiques & simulation | Cloth, rigid body, fluides | Gratuit | Non | Non | Dev 3D + optimisations humaines |
| Gestion d’assets & stockage | Upload multi-format, tags, versions | Gratuit (quota généreux) | Intégrations cloud (S3/GCS) | Non | IA pour scripts infra; supervision humaine |
| Sélection & background remover | Sélection auto, matting haute qualité | Gratuit | Non si modèle interne ; oui sinon | Oui (segmentation) | IA entraîne ; humain QA |
| Génération IA multimédia | Texte→image/vidéo/audio, stylisation | Gratuit (quotas fair use) | Oui si API externe indispo => interne | Oui (diffusion, T2V) | Équipe IA + support dev |
| Vidéo & motion graphics | Montage, transitions, audio libre | Gratuit | Bibliothèques audio (licences libres) | Non | IA pipeline ; humain montage avancé |
| Brand management | Palettes, typos, verrous, tokens | Gratuit | Non | Optionnel (assistant charte) | IA propose ; Brand manager valide |
| Collaboration & workflows | Coédition temps réel, commentaires, approbation | Gratuit | Notifications/email (SendGrid, etc.) | Non | IA pour base ; Product ops humain |
| Publication & social scheduler | Export & planification multi-réseaux | Gratuit | Oui (APIs réseaux sociaux)* | Non | Dévs back ; fallback export manuel |
| PDF & documents | Import/export, annotation, signature | Gratuit | Oui (signature, OCR si externes) | Optionnel (OCR interne) | IA intégration ; légal humain |
| Marketplace & extensibilité | Plugins, apps tierces, impression | Gratuit | Optionnel (webhooks internes) | Non | Modération communauté |
| Tutoriels & assistance | Onboarding guidé, agents IA, checklists | Gratuit | Non | Oui (assistant copilot interne) | IA générative + UX mentor |

\*Sans API externe accessible, développer une solution maison (contenus open data ou internes uniquement). Tous les modules doivent fonctionner en mode "standalone" sans partenariat externe implicite.

## Plan d’implémentation unifié

### Architecture cible
- **Front-end** : TypeScript + React/Next.js pour le shell applicatif, avec modules spécialisés :
  - Moteur vectoriel (Paper.js/Rough.js + Canvas/WebGL).
  - Éditeur raster WebGL (Shaders + WebAssembly pour filtres lourds).
  - Layout/whiteboard (React Flow, Slate, Paged.js pour mise en page).
  - UI/UX & design tokens (Auto Layout custom, inspector code).
  - Module 3D (three.js + WebGPU pour rendu temps réel, contrôles orbitaux simplifiés).
  - CSS utilitaire (Tailwind/Vanilla Extract) pour prototypage rapide.
- **Back-end** :
  - **APIs principales** : Node.js (NestJS) ou Go (Fiber) pour la gestion des projets, des assets, des rôles et de la facturation.
  - **Collaboration temps réel** : service WebSocket dédié (Elixir/Phoenix Channels ou Node.js + Socket.io) avec CRDT/OT.
  - **Export & media** : microservices Go/Rust pour rendu vectoriel, raster, vidéo ; workers FFmpeg/Sharp/Lottie.
  - **Pipeline 3D** : service dédié (Rust ou Go) pour conversion/rendu batch (GLB/FBX) et baking matériaux.
- **Services IA** : Python (FastAPI) orchestrant modèles diffusion (images) et LLM (texte), segmentation (U-Net) pour background remover, auto-rig et motion ML ; stockage d’expériences (MLflow) et pipeline MLOps (Kubeflow).
- **Data layer** : PostgreSQL pour transactions (projets, comptes), DynamoDB ou Firestore pour états temps réel, Elasticsearch/OpenSearch pour recherche template.
- **Infra** : Kubernetes + autoscaling (GPU pour IA), CDN (CloudFront) pour assets, CI/CD GitHub Actions.

### API et intégrations à anticiper
- **Réseaux sociaux** : Facebook Graph, Instagram Basic Display, TikTok, LinkedIn. Sans accès → workflow d’export manuel + rappels utilisateurs pour publication.
- **Stock audio/vidéo** : constituer une bibliothèque interne à partir de contenus libres/open data ou créations originales (pas de licences propriétaires).
- **Signature & PDF avancé** : si absence d’API (Adobe Sign, DocuSign), développer un module de signature interne (PKI) et un OCR basé sur Tesseract + entraînement spécifique.
- **Impression/logistique** : privilégier l’export print-ready ; pour la production, développer un orchestrateur interne ou documenter un process DIY sans prestataire tiers.
- **Marketplace** : exposer un SDK/app store interne ; sans API tierce, proposer un système de webhooks/autohébergés contrôlés.
- **Bibliothèques 3D** : s’appuyer sur ressources open data (Poly Haven, Smithsonian, NASA) et développer des outils de conversion maison.
- **Fonts & typographie** : héberger des polices libres (Google Fonts) et fournir un processus d’upload sécurisé côté serveur.

### Workflows alternatifs « solution maison »
- **Publication réseaux sociaux** : générer un kit d’export (images, vidéos, description, hashtags) + checklist de publication manuelle par réseau ; option pour programmer des rappels (email/in-app) au moment optimal.
- **Impression** : générer un PDF/X + fiche technique (grammage, marges) ; fournir un guide pas-à-pas pour impression locale ou services d’impression open (type coopératives) sans intégration API.
- **Stock audio/vidéo** : bibliothèque interne nourrie par contenus libres (CC0) et contributions communautaires ; formulaire de soumission avec vérification licence et traçabilité.
- **Signature électronique** : module interne PKI : génération de certificat utilisateur, signature PDF via certificat local, journal d’événements auditable.
- **Marketplace/Plugins** : dépôt Git autohébergé ; processus de validation manuel par comité ; déploiement via webhooks internes ou instructions d’auto-hébergement par la communauté.
- **Support & helpdesk** : base de connaissances + forum communautaire, escalade vers modérateurs bénévoles ; IA interne pour réponse de premier niveau.

### Modules IA sur-mesure à développer

> **Statut** : en pause tant que le projet ne dispose pas de ressources GPU dédiées ou d'un réseau décentralisé ≥500 volontaires.

1. **Génération d’images** : fine-tuning d’un modèle diffusion (Stable Diffusion, SDXL) sur un dataset branding-safe ; gestion des prompts, modération, quotas.
2. **Recoloration & stylisation texte** : modèle de transfert de style sur assets vectoriels/typo.
3. **Background remover** : segmentation instance + matting haute résolution ; pipeline GPU.
4. **Recommandation de templates** : moteur ML (LightFM/Transformers) sur signaux d’usage.
5. **Automations vidéo** : génération de scènes à partir de scripts (LLM + template vidéo).
6. **Auto-rig & animation** : modèles ML pour rigging humain/animal et proposition de cycles d’animation.
7. **Génération d’objets 3D** : pipeline texte→mesh (DreamFusion/TripoSR) simplifié pour prototypes.
8. **Assistant mise en page** : LLM suggérant hiérarchies typographiques, gabarits et corrections d’accessibilité.

## Répartition des tâches (IA vs humain)

| Tâche | Description | Outil principal | IA autonome ? | Rôle humain |
| --- | --- | --- | --- | --- |
| Veille fonctionnelle continue | Surveiller évolutions produits concurrents | Recherche, synthèse | Oui (collecte & résumé), validation humaine | Trancher la pertinence, prioriser |
| Cadrage produit & UX | Définir personae, parcours, maquettes haute fidélité | Outils design (Figma) | Non (IA peut fournir brouillons) | Designer/PM pour décisions |
| Architecture logicielle | Diagrammes, choix techno, modélisation domaines | Modélisation (C4, ADR) | IA peut proposer un squelette | Architecte pour validation finale |
| Développement front-end | Implémentation éditeur, UI responsive | TypeScript/React | IA peut générer composants, nécessite revue | Dev front pour intégration fine |
| Développement back-end | API REST/GraphQL, sécurité, quotas | Node/Go | IA peut scaffolder, tests ; humain pour sûreté | Backend dev pour QA/ops |
| Moteurs vectoriel & raster | Performances, rendu temps réel, outils avancés | WebGL/WebGPU | IA pour snippets ; optimisation humaine obligatoire | Ingénieur graphique |
| Pipeline 3D & rendu | Moteur WebGPU, export GLB/FBX, physiques | three.js/WebGPU/Rust | IA peut prototyper ; équipe 3D doit consolider | Développeurs 3D + tech artist |
| Services IA custom | Training, évaluation, déploiement modèles | Python/ML | IA peut générer code expérimental | Data scientist/ML engineer pour entraînement réel |
| Intégrations externes | Réseaux sociaux, impression, services annexes | APIs tierces | IA peut rédiger adapters si docs publiques | Gestion comptes développeur, conformité réglementaire |
| Mise en place infra & DevOps | Kubernetes, CI/CD, observabilité | Terraform/Helm | IA peut proposer scripts initiaux | SRE/DevOps pour exécution et sécurité |
| Gouvernance juridique & licences | Contrats, RGPD, propriété intellectuelle | Légal/compliance | Non | Équipe juridique |
| Création & curation d'assets | Préparer templates, presets 3D, packs audio | Outils créatifs | IA peut générer brouillons | Équipe artistique pour qualité |
| QA cross-media | Contrôle qualité vectoriel/raster/3D/vidéo | Suites de tests + revues visuelles | IA pour détection anomalies | QA multimédia humain |
| Support & modération contenu | Revue de contenus, traitement signalements | Back-office | IA pour tri préliminaire | Équipe support pour cas sensibles |

> Rappel : toute proposition IA doit être revue et validée par un membre humain avant mise en production.

## Recommandations transverses
- **Modèle économique** : Service 100% gratuit financé par mécénat, contributions open-source, subventions et marketplace sans commission ; prévoir transparence budgétaire.
- **Infrastructure** : Kubernetes, autoscaling GPU pour IA/3D, CDN global, observabilité complète (logs, métriques, traces).
- **Sécurité & conformité** : ISO 27001, RGPD, audit accès, gestion des licences assets libres.
- **Onboarding** : tutoriels interactifs, agents IA contextualisés, parcours guidés par profil.
- **Qualité** : pipelines CI/CD avec lint/tests (front/back/IA/3D), QA visuelle automatique + revues humaines cross-media.

> Suivi : mettre à jour ce benchmark à chaque nouvelle exploration produit ou découverte de fonctionnalités premium. Documenter tout écart dans `CHANGELOG.md` (cf. protocole).