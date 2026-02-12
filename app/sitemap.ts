import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/skills",
    "/projects",
    "/experience",
    "/credentials",
    "/blog",
    "/contact",
    "/about",
    "/feed.xml",
    "/robots.txt",
    "/llms.txt",
    "/llms-full.txt",
  ];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/blog" ? 0.9 : 0.7,
  }));

  const posts = await getAllBlogPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...postEntries];
}
