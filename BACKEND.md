# E-mails — tables et routes backend

## Tables

| Table | Données utilisées par le front |
|---|---|
| `email_messages` | Expéditeur, sujet, aperçu, corps, date et état brouillon/envoyé |
| `email_recipients` | Destinataires principaux et copies |
| `email_attachments` | Nom, taille, type MIME et clé de stockage |
| `email_user_state` | Dossier, lu/non lu, favori, important et dossier d’origine |
| `users` | Nom et adresse de l’utilisateur connecté |

## Routes backend

| Méthode | Route backend | Tables |
|---|---|---|
| `GET` | `/api/v1/emails/messages` | `email_messages`, `email_recipients`, `email_user_state` |
| `GET` | `/api/v1/emails/messages/{messageId}` | `email_messages`, `email_recipients`, `email_attachments`, `email_user_state` |
| `POST` | `/api/v1/emails/messages` | `email_messages`, `email_recipients`, `email_attachments`, `email_user_state` |
| `POST` | `/api/v1/emails/drafts` | `email_messages`, `email_recipients`, `email_attachments` |
| `PATCH` | `/api/v1/emails/drafts/{messageId}` | `email_messages`, `email_recipients`, `email_attachments` |
| `POST` | `/api/v1/emails/attachments` | `email_attachments`, stockage objet |
| `GET` | `/api/v1/emails/attachments/{attachmentId}` | `email_attachments`, stockage objet |
| `PATCH` | `/api/v1/emails/messages/{messageId}/state` | `email_user_state` |
| `DELETE` | `/api/v1/emails/messages/{messageId}` | `email_messages`, `email_recipients`, `email_attachments`, `email_user_state` |
