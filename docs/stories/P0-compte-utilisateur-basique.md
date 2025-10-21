# Story P0 - Compte Utilisateur Basique

## Contexte
Permettre à un utilisateur local de créer un compte minimal pour sauvegarder des projets et préférences.

## Rôle / Persona
Utilisateur standard (créateur individuel) sur machine locale.

## Valeur Métier
Réduction friction onboarding, base pour personnalisation et persistence multi-session.

## Critères d'Acceptation
- [ ] Création compte avec identifiant unique local (username) et mot de passe hashé (Argon2, paramètres par défaut). Pas d'email obligatoire (local-first).
- [ ] Validation forte username (longueur 3-32, alphanum + tiret, unicité).
- [ ] Feedback instantané sur règles non respectées.
- [ ] Stockage en base Postgres (table users) avec colonnes id (uuid), username, password_hash, created_at.
- [ ] Tentative de doublon username déclenche message clair.
- [ ] Authentification démarre une session (token signé en mémoire / Redis, expiration configurable >1h par défaut).
- [ ] Temps de réponse création < 300ms sur machine de dev standard.
- [ ] Log succès + échec (mauvaise validation) avec niveau info/warn.

## Détails Fonctionnels
Flux: Formulaire -> Validation locale -> POST /users -> Hash -> Insert -> Retour succès (user id) -> Session ouverte (token).
Pas de récupération de mot de passe (story ultérieure). Pas d'email. Pas de rôles avancés.

## Non Objectifs
- Gestion email / vérification.
- MFA, OAuth, SSO.
- Rôles complexes.
- Profil étendu (avatar, bio).

## Dépendances
- Service de hash (port domaine -> adaptateur infrastructure Argon2).
- Module Users (backend NestJS) + Repository.
- Configuration sécurité (cost paramètres Argon2).

## Sécurité / Conformité
- Hash Argon2id avec paramètres modérés (memoryCost > 64MB, iterations calibrées).
- Pas de stockage du mot de passe en clair ni logs contenant le mot de passe.
- Limiter brute force ultérieure (à prévoir story rate limiting).

## Observabilité
- Log création compte (user_id, username tronqué si nécessaire).
- Compteur métrique: users_created_total.

## Tâches Techniques
Backend:
- [ ] Créer module Users (controller, service, repository interface, entity).
- [ ] Implémenter port HashPassword + adaptateur Argon2.
- [ ] Endpoint POST /users (DTO validation, code 201, gestion conflit 409).
- [ ] Génération token session (placeholder simple, secret local).
Frontend:
- [ ] Formulaire création (username, password + validation dynamique).
- [ ] Appel API + gestion messages.
Tests:
- [ ] Unitaires service (validation + hash + repository mock).
- [ ] Intégration endpoint (création + conflit).
Documentation:
- [ ] ADR sur choix Argon2.

## Risques & Mitigations
- Paramètres Argon2 trop lourds -> calibrer via benchmark local.
- Conflits concurrence (rare local) -> utiliser contrainte unique DB.

## Post-Conditions
Système permet création et authentification basique d'un compte local.
