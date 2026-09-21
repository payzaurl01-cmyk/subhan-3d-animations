import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";

const SITE_URL = "https://www.interiorblindsandshutters.com.au";
const STATIC_LAST_MODIFIED = new Date("2026-09-05T18:45:17+00:00");

const staticPages = [
  { path: "", priority: 1 },
  { path: "/about-us", priority: 0.8 },
  { path: "/products", priority: 0.8 },
  { path: "/project", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/contact-us", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.5 },
  { path: "/terms-of-service", priority: 0.5 },
] as const;

const featuredProducts = [
  "roller-blinds",
  "blockout-curtains",
  "pvc-plantation-shutters",
  "curvers",
  "vertical-blinds",
  "flyscreens",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticPages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));

  const blogPosts: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const products: MetadataRoute.Sitemap = featuredProducts.map((product) => ({
    url: `${SITE_URL}/products?product=${product}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...blogPosts, ...products];
}
