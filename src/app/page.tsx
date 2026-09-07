"use client";

import { EmailModule } from "@mairie360/lib-components";
import { useCallback, useEffect, useState } from "react";
import type { ComponentProps } from "react";
import type { components } from "@/contracts/bff";
import { requestBff } from "@/lib/bff-client";

type Bootstrap = components["schemas"]["EmailBootstrap"];
type Props = ComponentProps<typeof EmailModule>;
type Compose = Parameters<NonNullable<Props["onSend"]>>[0];
type Values = Parameters<NonNullable<Props["onSaveDraft"]>>[0];
type Message = components["schemas"]["EmailMessage"];
type Action = Parameters<NonNullable<Props["onMessageAction"]>>[1];

export default function EmailPage() {
  const [data, setData] = useState<Bootstrap | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [revision, setRevision] = useState(0);
  const load = useCallback(async (signal?: AbortSignal) => {
    setData(await requestBff<Bootstrap>("/emails/bootstrap", { signal }));
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal).catch((reason: Error) => { if (!controller.signal.aborted) setError(reason.message); });
    return () => controller.abort();
  }, [load]);

  async function mutate(operation: () => Promise<unknown>) {
    setPending(true); setError("");
    try { await operation(); await load(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "L’opération a échoué."); }
    finally { setRevision((value) => value + 1); setPending(false); }
  }
  async function composeBody(values: Values, mode?: Compose["mode"], sourceMessageId?: string) {
    const attachmentIds = await Promise.all(values.attachments.map(async (attachment) => {
      if (!attachment.file) return attachment.id;
      const body = new FormData(); body.set("file", attachment.file);
      const result = await requestBff<{ id: string }>("/emails/attachments", { method: "POST", body });
      return result.id;
    }));
    return { to: values.to.split(/[;,]/).map((email) => email.trim()).filter(Boolean), subject: values.subject, body: values.body, attachmentIds, mode, sourceMessageId } satisfies components["schemas"]["EmailCompose"];
  }
  function send(request: Compose) {
    void mutate(async () => requestBff("/emails/messages", { method: "POST", body: JSON.stringify(await composeBody(request.values, request.mode, request.sourceMessage?.id)) }));
  }
  function draft(values: Values) {
    void mutate(async () => requestBff("/emails/drafts", { method: "POST", body: JSON.stringify(await composeBody(values, "draft")) }));
  }
  function act(message: Message, action: Action) {
    const endpoint = `/emails/messages/${encodeURIComponent(message.id)}`;
    const state = action === "read" ? { unread: false }
      : action === "favorite" ? { isFavorite: !message.isFavorite }
      : action === "archive" ? { folder: "archived" }
      : action === "trash" ? { folder: "trash", originalFolder: message.folder }
      : { folder: message.originalFolder ?? "inbox" };
    void mutate(() => requestBff(action === "delete-permanently" ? endpoint : `${endpoint}/state`, {
      method: action === "delete-permanently" ? "DELETE" : "PATCH",
      ...(action !== "delete-permanently" ? { body: JSON.stringify(state) } : {}),
    }));
  }
  return (
    <main className="min-h-screen bg-[#f5f3f0] text-[#172033] px-4 py-6 sm:px-6 lg:px-8">
      {error && <p role="alert" className="mb-4 rounded border border-red-200 bg-white p-4 text-red-700">{error}</p>}
      {pending || !data ? <p role="status">{pending ? "Opération en cours…" : error ? "La boîte de messagerie est indisponible." : "Chargement des e-mails…"}</p> : (
        <EmailModule key={revision} className="mx-auto max-w-[1536px]" messages={data.messages} folders={data.folders} currentUserEmail={data.currentUserEmail}
          onSend={send} onSaveDraft={draft} onMessageAction={act}
          onOpenAttachment={(_message, attachment) => { window.location.href = `/emails/attachments/${encodeURIComponent(attachment.id)}`; }} />
      )}
    </main>
  );
}
