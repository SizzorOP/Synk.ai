"use client";

import {
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, type Socket } from "socket.io-client";

import {
  createChatMessage,
  createChatThread,
  fallbackDevPersonas,
  fetchChatMessages,
  fetchChatThreads,
  fetchDevPersonas,
  type AuthSession,
  type ChatMessage,
  type ChatThread,
  type DevPersona,
} from "../lib/api";
import { DEV_SESSION_EVENT_NAME, readStoredSession } from "../lib/dev-session";

const SOCKET_BASE_URL =
  process.env.NEXT_PUBLIC_API_SOCKET_URL ??
  (
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1"
  ).replace(/\/api\/v1\/?$/, "");

function sortThreads(threads: ChatThread[]) {
  return [...threads].sort((left, right) =>
    right.lastMessageAt.localeCompare(left.lastMessageAt),
  );
}

function upsertMessage(messages: ChatMessage[], nextMessage: ChatMessage) {
  if (messages.some((message) => message.id === nextMessage.id)) {
    return messages;
  }

  return [...messages, nextMessage].sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt),
  );
}

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function CollaborationHub() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [personas, setPersonas] = useState<DevPersona[]>(fallbackDevPersonas);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadType, setThreadType] = useState<"DIRECT" | "SUPPORT">("DIRECT");
  const [participantId, setParticipantId] = useState("");
  const [threadTitle, setThreadTitle] = useState("");
  const [draftMessage, setDraftMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoadingThreads, setIsLoadingThreads] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [socketReady, setSocketReady] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const selectedThreadIdRef = useRef<string | null>(null);

  const selectedThread =
    threads.find((thread) => thread.id === selectedThreadId) ?? null;
  const availablePersonas = personas.filter(
    (persona) => persona.id !== session?.user.id,
  );

  function applyIncomingMessage(message: ChatMessage) {
    setThreads((current) =>
      sortThreads(
        current.map((thread) =>
          thread.id === message.threadId
            ? {
                ...thread,
                lastMessageAt: message.createdAt,
                lastMessagePreview: message.body,
              }
            : thread,
        ),
      ),
    );

    if (message.threadId === selectedThreadIdRef.current) {
      setMessages((current) => upsertMessage(current, message));
    }
  }

  async function loadThreads(activeSession: AuthSession) {
    setIsLoadingThreads(true);

    try {
      const nextThreads = sortThreads(
        await fetchChatThreads(activeSession.accessToken),
      );
      setThreads(nextThreads);
      setSelectedThreadId((current) =>
        current && nextThreads.some((thread) => thread.id === current)
          ? current
          : nextThreads[0]?.id ?? null,
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Failed to load chat threads.",
      );
    } finally {
      setIsLoadingThreads(false);
    }
  }

  async function loadMessages(threadId: string, activeSession: AuthSession) {
    try {
      const nextMessages = await fetchChatMessages(
        threadId,
        activeSession.accessToken,
      );
      setMessages(nextMessages);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Failed to load thread messages.",
      );
    }
  }

  useEffect(() => {
    const syncSession = () => {
      setSession(readStoredSession());
    };

    syncSession();
    window.addEventListener(DEV_SESSION_EVENT_NAME, syncSession);
    return () => {
      window.removeEventListener(DEV_SESSION_EVENT_NAME, syncSession);
    };
  }, []);

  useEffect(() => {
    void fetchDevPersonas()
      .then((nextPersonas) => {
        if (nextPersonas.length > 0) {
          setPersonas(nextPersonas);
        }
      })
      .catch(() => {
        // Keep fallback personas when the API is offline.
      });
  }, []);

  useEffect(() => {
    if (!participantId && availablePersonas[0]?.id) {
      setParticipantId(availablePersonas[0].id);
    }
  }, [availablePersonas, participantId]);

  useEffect(() => {
    selectedThreadIdRef.current = selectedThreadId;
  }, [selectedThreadId]);

  useEffect(() => {
    if (!session) {
      setThreads([]);
      setMessages([]);
      setSelectedThreadId(null);
      return;
    }

    void loadThreads(session);
  }, [session]);

  useEffect(() => {
    if (!session) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocketReady(false);
      return;
    }

    const socket = io(`${SOCKET_BASE_URL}/collaboration`, {
      auth: {
        token: session.accessToken,
      },
      transports: ["websocket"],
    });

    socketRef.current = socket;
    socket.on("connect", () => {
      setSocketReady(true);
    });
    socket.on("disconnect", () => {
      setSocketReady(false);
    });
    socket.on("message:created", (message: ChatMessage) => {
      applyIncomingMessage(message);
    });

    return () => {
      socket.disconnect();
      if (socketRef.current === socket) {
        socketRef.current = null;
      }
      setSocketReady(false);
    };
  }, [session]);

  useEffect(() => {
    if (!session || !selectedThreadId) {
      setMessages([]);
      return;
    }

    socketRef.current?.emit("thread:join", {
      threadId: selectedThreadId,
    });
    void loadMessages(selectedThreadId, session);
  }, [selectedThreadId, session]);

  function handleCreateThread() {
    if (!session || !participantId) {
      setStatus("Select a participant after logging in.");
      return;
    }

    setStatus(null);
    startTransition(() => {
      void (async () => {
        try {
          const createdThread = await createChatThread(
            {
              type: threadType,
              participantIds: [participantId],
              title: threadTitle.trim() || undefined,
            },
            session.accessToken,
          );

          setThreads((current) => sortThreads([createdThread, ...current]));
          setSelectedThreadId(createdThread.id);
          setThreadTitle("");
          socketRef.current?.emit("thread:join", {
            threadId: createdThread.id,
          });
          setStatus(`Created thread ${createdThread.title}.`);
        } catch (error) {
          setStatus(
            error instanceof Error
              ? error.message
              : "Failed to create chat thread.",
          );
        }
      })();
    });
  }

  function handleSendMessage() {
    if (!session || !selectedThreadId || !draftMessage.trim()) {
      return;
    }

    const body = draftMessage.trim();
    setDraftMessage("");
    setIsSendingMessage(true);
    setStatus(null);

    if (socketRef.current?.connected) {
      socketRef.current.emit("message:send", {
        threadId: selectedThreadId,
        body,
      });
      setIsSendingMessage(false);
      return;
    }

    startTransition(() => {
      void (async () => {
        try {
          const createdMessage = await createChatMessage(
            selectedThreadId,
            { body },
            session.accessToken,
          );
          applyIncomingMessage(createdMessage);
        } catch (error) {
          setStatus(
            error instanceof Error
              ? error.message
              : "Failed to send chat message.",
          );
        } finally {
          setIsSendingMessage(false);
        }
      })();
    });
  }

  if (!session) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-panel">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Collaboration Hub
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
          Login to open your contract rooms and direct threads
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Use the header dev-session switcher first. The collaboration hub is fully authenticated and only shows threads that belong to the active localhost persona.
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Session
              </div>
              <h1 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
                Collaboration hub
              </h1>
            </div>
            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                socketReady
                  ? "bg-tide/15 text-tide"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {socketReady ? "Realtime live" : "REST fallback"}
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Active persona: {session.user.displayName} ({session.user.roles.join(", ")}).
          </p>
          {status ? (
            <div className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              {status}
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            New thread
          </div>
          <div className="mt-4 space-y-4">
            <select
              value={threadType}
              onChange={(event) =>
                setThreadType(event.target.value as "DIRECT" | "SUPPORT")
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            >
              <option value="DIRECT">Direct thread</option>
              <option value="SUPPORT">Support room</option>
            </select>
            <select
              value={participantId}
              onChange={(event) => setParticipantId(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            >
              {availablePersonas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.displayName} ({persona.roles.join(" / ")})
                </option>
              ))}
            </select>
            <input
              value={threadTitle}
              onChange={(event) => setThreadTitle(event.target.value)}
              placeholder="Optional room title"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            />
            <button
              type="button"
              onClick={handleCreateThread}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Create thread
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Threads
            </div>
            <div className="text-sm text-slate-500">
              {isLoadingThreads ? "Refreshing..." : `${threads.length} active`}
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {threads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setSelectedThreadId(thread.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  thread.id === selectedThreadId
                    ? "border-ember bg-ember/10"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-ink">{thread.title}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                      {thread.type.replace("_", " ")}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatTimestamp(thread.lastMessageAt)}
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-600">
                  {thread.lastMessagePreview}
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  {thread.participantNames.join(" • ")}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
        {selectedThread ? (
          <>
            <div className="border-b border-slate-200 pb-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Active room
              </div>
              <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
                {selectedThread.title}
              </h2>
              <div className="mt-3 text-sm text-slate-600">
                {selectedThread.participantNames.join(" • ")}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {messages.map((message) => {
                const isCurrentUser = message.senderUserId === session.user.id;
                return (
                  <div
                    key={message.id}
                    className={`rounded-3xl px-5 py-4 ${
                      isCurrentUser
                        ? "ml-auto max-w-[85%] bg-ink text-white"
                        : "max-w-[85%] bg-slate-100 text-slate-800"
                    }`}
                  >
                    <div
                      className={`text-xs uppercase tracking-[0.18em] ${
                        isCurrentUser ? "text-white/60" : "text-slate-500"
                      }`}
                    >
                      {message.senderName}
                    </div>
                    <div className="mt-2 text-sm leading-6">{message.body}</div>
                    <div
                      className={`mt-3 text-xs ${
                        isCurrentUser ? "text-white/60" : "text-slate-500"
                      }`}
                    >
                      {formatTimestamp(message.createdAt)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <textarea
                rows={4}
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                placeholder="Send a progress update, request, or deliverable note."
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-ember"
              />
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-sm text-slate-500">
                  {socketReady
                    ? "Messages are broadcasting over Socket.io."
                    : "Socket is offline, so sends fall back to the REST API."}
                </div>
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={isSendingMessage || !draftMessage.trim()}
                  className="rounded-full bg-tide px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSendingMessage ? "Sending..." : "Send message"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-slate-50 px-8 text-center text-sm leading-6 text-slate-600">
            Select a thread or create a new one to start the collaboration flow.
          </div>
        )}
      </section>
    </div>
  );
}
