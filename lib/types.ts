export type WorkType = "build" | "case-study";

export type NewsletterPost = {
  id: string;
  title: string;
  subtitle?: string;
  previewText?: string;
  thumbnailUrl?: string;
  url: string;
  publishedAt: string;
  tags: string[];
};
