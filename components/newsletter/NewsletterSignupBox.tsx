"use client";

import { useState, type FormEvent } from "react";
import { newsletter } from "@/data/site-config";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignupBox({
  variant = "light",
  source = "footer",
}: {
  variant?: "light" | "dark";
  source?: "footer";
}) {
  const isDark = variant === "dark";
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          website: data.get("website"),
          source,
        }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className={`rounded-lg border p-6 ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"
      }`}
    >
      <p
        className={`flex items-center gap-2 font-heading text-lg font-semibold ${
          isDark ? "text-white" : "text-brand-slate"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-brand-amber"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        {newsletter.publicationName}
      </p>
      <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
        Notes on architecture, trade-offs, and agentic AI governance, straight to your inbox.
      </p>

      {status === "success" ? (
        <p role="status" className={`mt-4 text-sm font-medium ${isDark ? "text-white" : "text-brand-slate"}`}>
          Thanks! Check your inbox to confirm your subscription.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            aria-label="Email address"
            className={`min-w-0 flex-1 rounded-md border px-3 py-2 text-sm ${
              isDark
                ? "border-white/20 bg-transparent text-white placeholder:text-slate-400"
                : "border-slate-300 bg-white text-slate-900"
            }`}
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0 rounded-md bg-brand-amber px-4 py-2 text-sm font-semibold text-brand-slate transition hover:bg-brand-amber-dark hover:text-white disabled:opacity-60"
          >
            {status === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p role="alert" className={`mt-2 text-sm ${isDark ? "text-amber-300" : "text-red-700"}`}>
          Something went wrong. Please try again, or subscribe directly on{" "}
          <a
            href={newsletter.archiveUrl}
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Beehiiv
          </a>
          .
        </p>
      )}
    </div>
  );
}
