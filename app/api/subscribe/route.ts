import { subscribeToBeehiiv } from "@/lib/beehiiv";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MEDIUMS = new Set(["footer", "newsletter-page"]);

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const medium = typeof body.source === "string" && MEDIUMS.has(body.source) ? body.source : "site";
  const result = await subscribeToBeehiiv(email, medium);

  if (result === "ok") return Response.json({ ok: true });
  return Response.json({ ok: false }, { status: result === "not-configured" ? 503 : 502 });
}
