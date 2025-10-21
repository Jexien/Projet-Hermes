# Architecture haute-niveau (C4)

> Objectif : donner une vue rapide des composants majeurs et de leurs interactions pour le MVP étendu.
>
> **Décision 2025-10-03** : les services IA/MLOps restent inactifs tant que le projet ne dispose pas de ressources GPU adaptées ou d'un réseau décentralisé ≥500 volontaires.
>
> **Principe local-first** : privilégier l'exécution sur la machine hôte (CPU multi-coeurs, GPU local). Le serveur central ne doit servir qu'au partage d'assets et à la coordination minimale.

## Diagramme contexte (C1)
```mermaid
C4Context
    Person(user, "Utilisateur créatif", "Crée, édite et publie des projets multimédias.")
    Person(contributor, "Contributeur IA", "Apporte des datasets et lance des fine-tunings.")
    System(app, "Plateforme Créative Libre", "Éditeur 2D/3D, IA intégrée, collaboration.")
    System_Ext(storage, "Stockage objet compatible S3", "Héberge assets et exports.")
    System_Ext(opendata, "Sources open data", "Catalogues media libres (Poly Haven, Google Fonts...).")

    Rel(user, app, "Crée/édite/exporte")
    Rel(contributor, app, "Gère datasets, lance entraînements")
    Rel(app, storage, "Stocke assets")
    Rel(app, opendata, "Ingestion contenus libres")
```

## Diagramme conteneurs (C2)
```mermaid
C4Container
    Container_Boundary(app, "Plateforme Créative Libre") {
        Container(web, "App Web", "React/Next.js", "UI unifiée (vectoriel, raster, layout, 3D)")
        Container(api, "Core API", "Node.js/Go", "Projets, assets, quotas, exports")
        Container(identity, "Service Identité", "Keycloak/self-hosted", "Authentification & rôles (priorité minimale)")
        Container(collab, "Service Collaboration", "Elixir ou Node.js", "CRDT/OT, notifications")
        Container(media, "Service Média", "Go/Rust", "Rendu vectoriel/raster/vidéo")
    Container(ml, "Service IA", "Python/FastAPI", "Diffusion, segmentation, auto-rig, MLOps (en veille)")
    Container(pipeline3d, "Service 3D", "Rust/Go", "Conversion GLB/FBX, baking matériaux")
        Container(distrib, "Orchestrateur multi-hôtes", "Rust/Go", "Répartition optionnelle des tâches lourdes entre machines volontaires (priorité minimale)")
        Container(db, "PostgreSQL", "Données relationnelles")
        Container(kv, "DynamoDB/Firestore", "États temps réel & sessions")
        Container(search, "OpenSearch", "Recherche templates/assets")
        Container(queue, "Broker", "RabbitMQ/Kafka", "File d’attente exports & jobs IA")
        Container(mlops, "Pipeline MLOps", "Kubeflow/MLflow", "Orchestration fine-tuning, suivi métriques")
    }
    System_Ext(storage, "Stockage objet", "MinIO/S3", "Assets, exports, datasets")
    System_Ext(events, "Notification service", "Email/SMS open source", "Rappels workflows manuels")

    Rel(web, api, "REST/GraphQL")
    Rel(web, identity, "OAuth2/OpenID (quand activé)")
    Rel(web, collab, "WebSocket")
    Rel(api, db, "SQL")
    Rel(identity, db, "Stocke comptes & rôles")
    Rel(api, kv, "Lecture/écriture")
    Rel(api, search, "Indexation/requêtes")
    Rel(api, storage, "Upload/Download")
    Rel(api, queue, "Publie jobs")
    Rel(queue, media, "Consomme jobs d’export")
    Rel(queue, ml, "Consomme jobs IA")
    Rel(media, storage, "Stocke rendus")
    Rel(ml, mlops, "Orchestrations fine-tuning")
    Rel(mlops, storage, "Datasets & artefacts")
    Rel(mlops, events, "Notifications fin d’entraînement")
    Rel(collab, kv, "Synchronise documents temps réel")
    Rel(web, distrib, "Distribue tâches lourdes (quand activé)")
    Rel(distrib, api, "Coordination jobs locaux")
```

## Flux critiques
1. **Création projet** : App Web → Core API (création projet) → DB + Storage (initialisation asset).
2. **Export social sans API** : App Web génère kit d’export → Stockage objet → Notification service déclenche rappel manuel.
3. **Fine-tuning IA** *(en pause)* : Contributeur configure dataset → App Web → Service IA → Pipeline MLOps → GPU → retour métriques + modèle versionné.
4. **Édition 3D** : App Web (module three.js/WebGPU) → Service 3D pour baking/export → Stockage.
5. **Répartition locale optionnelle** *(priorité minimale)* : App Web → Orchestrateur multi-hôtes → Agents volontaires (GPU/CPU) → retour résultats → Core API.

## Gouvernance et observabilité
- Logging centralisé (ELK/OTEL), traces distribuées entre Core API, Media, IA.
- Feature flags pour activer progressivement 3D, orchestration multi-hôtes ou IA avancée.
- Tableaux de bord transparents sur les coûts (GPU, stockage) et la consommation locale pour la communauté.

## Prochaines étapes architecture
- Détailler les diagrammes C3/C4 pour les services Core API, Média et Collaboration.
- Produire des diagrammes de séquence pour les flux Export manuel, Collaboration temps réel et Orchestrateur multi-hôtes.
- Lister les dépendances techniques par composant (framework, runtime, stockage) dès que la pile cible est actée.

> Diagrammes C3/C4 détaillés seront ajoutés lors de la définition des modules critiques (export, IA, 3D).
