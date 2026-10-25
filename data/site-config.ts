export const siteConfig = {
  name: "Alejandro Fraga",
  title: "Alejandro Fraga — Solutions Architect",
  description:
    "Solutions Architect turning compliance, resilience, and agentic AI problems into shipped systems — with the trade-offs shown, not just the diagram.",
  url: "https://alejandrofraga.com",
};

export const social = {
  x: "https://x.com/AlejandroFraga",
  linkedin: "https://www.linkedin.com/in/alejandrofraga/",
  youtube: "https://www.youtube.com/@alejandrofragasantos",
  github: "https://github.com/afragasan",
};

// Placeholder — replace with the real Google Drive direct-download link.
// Format: https://drive.google.com/uc?export=download&id=FILE_ID
export const resumeUrl = "https://drive.google.com/uc?export=download&id=REPLACE_WITH_FILE_ID";

export const bookingUrl = "https://cal.com/alejandrofraga";

export const newsletter = {
  publicationName: "The Architect's Notes",
  archiveUrl: "https://alejandrofraga.beehiiv.com",
  embedSrc: process.env.NEXT_PUBLIC_BEEHIIV_EMBED_ID
    ? `https://embeds.beehiiv.com/${process.env.NEXT_PUBLIC_BEEHIIV_EMBED_ID}`
    : undefined,
};
