# E-mails — routes BFF

| Méthode | Route BFF | Besoin du front | État |
|---|---|---|---|
| `GET` | `/emails/bootstrap` | Utilisateur courant, dossiers, compteurs et première page de messages | À créer |
| `GET` | `/emails/messages` | Recherche et liste par dossier | À créer |
| `GET` | `/emails/messages/{messageId}` | Lecture d’un message et de ses pièces jointes | À créer |
| `POST` | `/emails/messages` | Nouveau message, réponse, réponse à tous ou transfert | À créer |
| `POST` | `/emails/drafts` | Enregistrement d’un brouillon | À créer |
| `PATCH` | `/emails/drafts/{messageId}` | Mise à jour d’un brouillon | À créer |
| `POST` | `/emails/attachments` | Téléversement d’une pièce jointe | À créer |
| `GET` | `/emails/attachments/{attachmentId}` | Ouverture ou téléchargement d’une pièce jointe | À créer |
| `PATCH` | `/emails/messages/{messageId}/state` | Lu, favori, important, archivé, corbeille ou restauré | À créer |
| `DELETE` | `/emails/messages/{messageId}` | Suppression définitive | À créer |
