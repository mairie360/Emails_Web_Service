# BFF — E-mails

Référentiel de besoins harmonisé le 5 septembre 2026. Documentation uniquement : aucune route ni migration n'est créée par ces fichiers. Les chemins BFF sont relatifs au service indiqué, pas au préfixe des proxies Next.js ; les chemins backend conservent leurs préfixes réels.

EmailModule utilise encore des messages de démonstration. Le client BFF Email installé ne décrit que les routes techniques health/check_apis ; aucun endpoint métier ni schéma SQL Email local ne permet de confirmer une implémentation. Les contrats ci-dessous sont proposés.

Tables et routes propriétaires : [BACKEND.md](BACKEND.md).

`Existant` : déclaré dans les sources locales ; `Partiel` : route présente mais données manquantes, SQL direct ou mémoire ; `Client généré` : chemin observé dans le client installé, déploiement non vérifié ; `Proposé` : contrat cible à implémenter/valider. Pour les tables, `SQL observé` ne prouve pas qu'une migration est déployée.

## Routes communes

Les identifiants renvoyés par un domaine restent ceux de son backend, même lorsqu'un BFF les sérialise en chaîne. `phone` côté Core/DTO correspond à `users.phone_number` en SQL ; `name`/`fullName` est composé à partir du prénom et du nom, sans découpage automatique inverse. Les rôles d'affichage sont adaptés par chaque front à partir de `roles`, sans nouvelle table de rôles par module. Le profil s'édite dans **Paramètres > Profil** ; les anciennes pages `/profile` ne définissent pas un stockage distinct.

| Méthode | Service et route BFF | Route backend / source | Données nécessaires au front | État |
| --- | --- | --- | --- | --- |
| GET | BFF User `/me` (alias `/session/me`) | Core `GET /api/v1/user/me/` + `GET /api/v1/groups/` | Identité, rôles et groupes communs ; réponse actuelle `{user, groups, roles}` ; enrichir avec identifiant, avatar, service, poste et dernière connexion | Partiel |
| POST | BFF User `/auth/logout` | Actuel : suppression du cookie ; cible : Core `POST /api/v1/sessions/revoke` avec le refresh token de la session courante | Déconnexion ; révocation serveur à brancher, pas une suppression de toutes les sessions | Partiel |
| GET | BFF User `/notifications` | Core `GET /api/v1/user/me/notifications/` | Notifications du bandeau et compteur non lu ; ne pas utiliser la constante de démonstration 3 | Proposé |
| PATCH | BFF User `/notifications/{notificationId}/read` | Core `PATCH /api/v1/user/me/notifications/{notificationId}/read` | Marquage lu et compteur actualisé pour l'utilisateur connecté | Proposé |

## Routes du module

| Méthode | Service et route BFF | Route backend / source | Données nécessaires au front | État |
| --- | --- | --- | --- | --- |
| GET | BFF Email `/emails/bootstrap` | Email `GET /api/v1/emails/messages/` + `GET /api/v1/emails/folders/` | messages, folders, currentUserEmail issu du profil ; compteurs inbox/sent/drafts/archived/trash ; favoris et important sont des filtres | Proposé |
| GET | BFF Email `/emails/messages` | Email `GET /api/v1/emails/messages/` | folder, q, favorite, important, pagination ; expéditeur, objet, aperçu, date, non lu, pièces jointes | Proposé |
| GET | BFF Email `/emails/messages/{messageId}` | Email `GET /api/v1/emails/messages/{messageId}/` | Corps, expéditeur, destinataires/CC, pièces jointes, états propres à l'utilisateur | Proposé |
| POST | BFF Email `/emails/messages` | Email `POST /api/v1/emails/messages/` | Envoyer nouveau/réponse/réponse à tous/transfert ; destinataires, objet, corps, pièces jointes, message parent | Proposé ; retour d'état d'envoi réel |
| POST | BFF Email `/emails/drafts` | Email `POST /api/v1/emails/drafts/` | Créer un brouillon incomplet sans envoi | Proposé |
| PATCH | BFF Email `/emails/drafts/{messageId}` | Email `PATCH /api/v1/emails/drafts/{messageId}/` | Enregistrer et reprendre un brouillon | Proposé |
| POST | BFF Email `/emails/attachments` | Email `POST /api/v1/emails/attachments/` → Files `POST /api/v1/files/` | Upload multipart ; id, nom, taille, MIME, propriétaire | Proposé |
| GET | BFF Email `/emails/attachments/{attachmentId}` | Email `GET /api/v1/emails/attachments/{attachmentId}/content` → Files contenu | Télécharger une pièce jointe autorisée | Proposé |
| PATCH | BFF Email `/emails/messages/{messageId}/state` | Email `PATCH /api/v1/emails/messages/{messageId}/state` | Lu/non lu, favori/important, archive/corbeille/restauration ; originalFolder conservé pour restauration | Proposé |
| DELETE | BFF Email `/emails/messages/{messageId}` | Email `DELETE /api/v1/emails/messages/{messageId}/` | Suppression définitive confirmée ; ne pas supprimer la copie d'un autre destinataire | Proposé |

## Points d'alignement

| Sujet | Contrat / écart |
| --- | --- |
| États | Favoris/Important ne sont pas des dossiers exclusifs. Répondre à tous s'appuie sur les destinataires et CC ; l'aperçu et les libellés de date sont calculés, pas des tables supplémentaires. |
| Suppression | Mise à la corbeille via PATCH state ; DELETE réservé à la suppression définitive du périmètre utilisateur, avec politique de purge du contenu partagé à définir. |

## Sources

| Périmètre | Référence |
| --- | --- |
| Front inspecté | [src/app/page.tsx](src/app/page.tsx) |
| Identité / sessions / groupes | [Core_API 9904624](https://github.com/mairie360/Core_API/tree/99046240dd9742217d2a2c3d282721b785cacca0/src) ; [BFF_user b7c3477](https://github.com/mairie360/BFF_user/tree/b7c3477f858073aa846ba0129cbb29152528e6d2/src) |
| Données des composants partagés | [lib-components 88b339b](https://github.com/mairie360/lib-components/tree/88b339b77d06670b14b5f2f3d1f3d10ed471bb03/src/components/email) |
