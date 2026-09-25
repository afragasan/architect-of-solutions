import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { getAllWork, getAllBlogPosts } from "@/lib/content";
import { videoSeries } from "@/data/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/blog", "/videos", "/newsletter", "/about"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const workRoutes = getAllWork().map((entry) => ({
    url: `${siteConfig.url}/work/${entry.slug}`,
    lastModified: new Date(entry.date),
  }));

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const videoSeriesRoutes = Object.keys(videoSeries).map((slug) => ({
    url: `${siteConfig.url}/videos/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes, ...videoSeriesRoutes];
}
