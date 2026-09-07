# Emails_Web_Service — Module overview

[Technical documentation](technical.md) · [Français](../fr/module.md) · [README](../../README.md)

Display the mailbox and enable composing, organizing and deleting email. The interface supplies controlled data to the shared component from BFF Email.

## Audience and value

Staff using work email.

Business domain: Email.

## Available capabilities

- Browse mailbox messages and folders.
- Compose, reply, forward and save drafts with attachments.
- Organize and delete messages, then reload after server confirmation.

## Typical workflow

1. Load `/emails/bootstrap` to obtain messages and folders.
2. Compose email and upload attachments before sending or saving the draft.
3. Wait for the server response, then reload the mailbox.

## Role within Mairie360

Associated repositories: [BFF_Email](https://github.com/mairie360/BFF_Email).

This repository contains the browser interface and its Next.js adapters. The associated BFF supplies business data and coordinates its sources.

## Data and current state

Bootstrap combines Email API `/api/v1/emails/messages/`, `/api/v1/emails/folders/` and Core `/api/v1/user/me/`. Mutations are forwarded to Email API. The BFF keeps no local mailbox or fallback store; Zod schemas validate bootstrap and compose payloads.

## Scope and limitations

Target route availability and persistence depend on the Email API deployment. Missing routes or incompatible responses surface as errors. The contract alone does not guarantee SMTP delivery, incoming mail ingestion or durable attachment storage.

## Developing or operating this module

The [technical guide](technical.md) covers architecture, configuration, routes, session handling, persistence, tests and CI/CD. It describes sources of truth and contract synchronization with associated repositories.
