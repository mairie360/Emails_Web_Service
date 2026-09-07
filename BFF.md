# Contrat web service / BFF

Ce web service consomme **BFF_Email**. La copie [OpenAPI](contracts/openapi.json) définit les routes et les données échangées ; les [types TypeScript](src/contracts/bff.d.ts) sont générés depuis cette copie.

## Routes implémentées

Les chemins sont relatifs au BFF. Les proxies web conservent méthode, paramètres, contenu binaire, statuts et cookies. Les chemins `/api/auth/*` restent des adaptateurs de session vers BFF User ; les pages Next.js sont distinctes des routes de données.

| Méthode | Route | Réponse / schéma |
| --- | --- | --- |
| GET | `/health` | 200 OK |
| GET | `/check_apis` | 200 Services disponibles |
| GET | `/emails/bootstrap` | 200 EmailBootstrap |
| GET | `/emails/messages` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| POST | `/emails/messages` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| GET | `/emails/messages/{messageId}` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| DELETE | `/emails/messages/{messageId}` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| POST | `/emails/drafts` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| PATCH | `/emails/drafts/{messageId}` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| POST | `/emails/attachments` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| GET | `/emails/attachments/{attachmentId}` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |
| PATCH | `/emails/messages/{messageId}/state` | 200 Réponse de l’API propriétaire ; 201 Création confirmée ; 204 Opération confirmée |

## Mise à jour et validation

Dans le BFF associé, exécuter `npm run contracts:generate`. Dans ce web service, exécuter `npm run contracts:sync`, puis `npm run contracts:check` et `npm run test:contracts`. Les dépôts peuvent être voisins ; sinon `BFF_CONTRACT_DIR` indique le répertoire `contracts` du BFF. La CI vérifie que les types correspondent au document livré, même sans checkout du dépôt voisin.

Le générateur de types est fixé à `openapi-typescript@7.10.1`. Il est exécuté via npm ; aucun jeton privé ne figure dans les contrats.

## Disponibilité des API propriétaires

Le bootstrap et les mutations sont branchés sur les routes cibles documentées des API propriétaires, configurées par `CORE_API_URL` et `EMAIL_API_URL`. Les réponses bootstrap doivent respecter les schémas de ce contrat. Les dépôts API ne sont pas modifiés : ces routes cibles et la persistance restent à valider dans leur déploiement. Une route absente ou une erreur est remontée au client ; aucune donnée de démonstration ni sauvegarde locale ne remplace la réponse du serveur.
