# Emails_Web_Service — Présentation du module

[Documentation technique](technical.md) · [English](../en/module.md) · [README](../../README.md)

Afficher la boîte de courrier et permettre de composer, classer et supprimer les e-mails. L’interface fournit des données contrôlées au composant partagé à partir de BFF Email.

## Public et utilité

Les agents utilisant la messagerie électronique professionnelle.

Domaine fonctionnel: Courrier électronique.

## Fonctions disponibles

- Consultation des messages et dossiers de la boîte.
- Composition, réponse, transfert et sauvegarde de brouillons avec pièces jointes.
- Actions de classement et suppression avec rechargement après confirmation serveur.

## Parcours type

1. Charger `/emails/bootstrap` pour obtenir messages et dossiers.
2. Composer un courrier et transférer ses pièces jointes avant l’envoi ou la sauvegarde du brouillon.
3. Attendre la réponse du serveur puis recharger la boîte.

## Place dans Mairie360

Dépôts associés: [BFF_Email](https://github.com/mairie360/BFF_Email).

Ce dépôt contient l’interface navigateur et ses adaptateurs Next.js. Le BFF associé fournit les données métier et coordonne leurs sources.

## Données et état actuel

Le bootstrap combine Email API `/api/v1/emails/messages/`, `/api/v1/emails/folders/` et Core `/api/v1/user/me/`. Les mutations sont transmises à Email API. Le BFF ne conserve ni boîte locale ni stockage de secours; les schémas Zod contrôlent le bootstrap et les compositions.

## Périmètre et limites

La disponibilité des routes cibles et leur persistance dépendent du déploiement Email API. Une route absente ou une réponse incompatible est remontée comme erreur. Le contrat ne garantit pas à lui seul la livraison SMTP, la réception de nouveaux messages ou la durabilité des pièces jointes.

## Pour développer ou exploiter ce module

Le [guide technique](technical.md) détaille architecture, configuration, routes, session, persistance, tests et CI/CD. Il décrit les sources de vérité et les étapes de synchronisation des contrats avec les dépôts associés.
