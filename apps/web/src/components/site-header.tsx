"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import {
  devLogin,
  fallbackDevPersonas,
  fetchCurrentUser,
  fetchDevPersonas,
  type AuthSession,
  type DevPersona,
} from "../lib/api";
import {
  clearStoredSession,
  DEV_SESSION_EVENT_NAME,
  readStoredSession,
  writeStoredSession,
} from "../lib/dev-session";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/matching-studio", label: "Matching Studio" },
  { href: "/launchpad", label: "Launchpad" },
  { href: "/deal-desk", label: "Deal Desk" },
  { href: "/collaboration-hub", label: "Collaboration Hub" },
];

function formatRoles(roles: string[]) {
  return roles.join(" / ");
}

export function SiteHeader() {
  const [personas, setPersonas] = useState<DevPersona[]>(fallbackDevPersonas);
  const [selectedEmail, setSelectedEmail] = useState(
    fallbackDevPersonas[0]?.email ?? "",
  );
  const [session, setSession] = useState<AuthSession | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;

    const syncSession = () => {
      const nextSession = readStoredSession();
      if (!active) {
        return;
      }

      setSession(nextSession);
      if (nextSession) {
        setSelectedEmail(nextSession.user.email);
      }
    };

    syncSession();

    void fetchDevPersonas()
      .then((nextPersonas) => {
        if (!active || nextPersonas.length === 0) {
          return;
        }

        setPersonas(nextPersonas);
        setSelectedEmail((current) => current || nextPersonas[0].email);
      })
      .catch(() => {
        // Keep local fallback personas when the API is not available.
      });

    const existingSession = readStoredSession();
    if (existingSession) {
      void fetchCurrentUser(existingSession.accessToken)
        .then((response) => {
          if (!active) {
            return;
          }

          const nextSession = {
            ...existingSession,
            user: response.user,
          };
          writeStoredSession(nextSession);
          setSession(nextSession);
        })
        .catch(() => {
          // Leave the local session intact if the API is offline.
        });
    }

    window.addEventListener(DEV_SESSION_EVENT_NAME, syncSession);
    return () => {
      active = false;
      window.removeEventListener(DEV_SESSION_EVENT_NAME, syncSession);
    };
  }, []);

  function handleLogin() {
    if (!selectedEmail) {
      setMessage("Select a localhost persona first.");
      return;
    }

    setMessage(null);
    startTransition(() => {
      void (async () => {
        try {
          const nextSession = await devLogin(selectedEmail);
          writeStoredSession(nextSession);
          setSession(nextSession);
          setMessage(`Active session: ${nextSession.user.displayName}.`);
        } catch (error) {
          setMessage(
            error instanceof Error ? error.message : "Dev login failed.",
          );
        }
      })();
    });
  }

  function handleLogout() {
    clearStoredSession();
    setSession(null);
    setMessage("Session cleared.");
  }

  return (
    <header className="sticky top-0 z-30 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-black/10 bg-white/80 px-5 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
          PL
        </div>
        <div>
          <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-ink">
            Prooflane
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
            localhost product shell
          </div>
        </div>
      </div>

      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex min-w-[280px] flex-1 items-center justify-end gap-3">
        <div className="hidden min-w-[320px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 lg:block">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Dev session
          </div>
          <div className="mt-2 flex items-center gap-2">
            <select
              value={selectedEmail}
              onChange={(event) => setSelectedEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-ember"
            >
              {personas.map((persona) => (
                <option key={persona.email} value={persona.email}>
                  {persona.displayName} ({formatRoles(persona.roles)})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleLogin}
              disabled={isPending}
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Loading..." : session ? "Switch" : "Login"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {session
              ? `${session.user.displayName} is active with ${formatRoles(session.user.roles)} access.`
              : "Use a seeded persona to unlock protected localhost workflows."}
          </div>
          {message ? (
            <div className="mt-2 text-xs text-ember">{message}</div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
