import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { getAllWork } from "@/lib/content";
import { videoSeries } from "@/data/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blueprints", "/newsletter", "/videos", "/about"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const workRoutes = getAllWork().map((entry) => ({
    url: `${siteConfig.url}/blueprints/${entry.slug}`,
    lastModified: new Date(entry.date),
  }));

  const videoSeriesRoutes = Object.keys(videoSeries).map((slug) => ({
    url: `${siteConfig.url}/videos/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workRoutes, ...videoSeriesRoutes];
}
