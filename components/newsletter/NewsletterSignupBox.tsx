import { newsletter } from "@/data/site-config";

export function NewsletterSignupBox({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

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
        Notes on architecture, trade-offs, and agentic AI governance — sent every other week.
      </p>
      {newsletter.embedSrc ? (
        <iframe
          src={newsletter.embedSrc}
          title={`Subscribe to ${newsletter.publicationName}`}
          className="mt-4 h-24 w-full border-0"
          scrolling="no"
        />
      ) : (
        <form
          action={newsletter.archiveUrl}
          method="get"
          target="_blank"
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
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
            className="shrink-0 rounded-md bg-brand-amber px-4 py-2 text-sm font-semibold text-brand-slate transition hover:bg-brand-amber-dark hover:text-white"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
