import type { AuthSession } from "./api";

export const DEV_SESSION_EVENT_NAME = "prooflane:session-changed";

const DEV_SESSION_STORAGE_KEY = "prooflane.dev.auth-session";

export function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(DEV_SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    window.localStorage.removeItem(DEV_SESSION_STORAGE_KEY);
    return null;
  }
}

export function writeStoredSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DEV_SESSION_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(DEV_SESSION_EVENT_NAME));
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(DEV_SESSION_STORAGE_KEY);
  window.dispatchEvent(new Event(DEV_SESSION_EVENT_NAME));
}
