import "server-only";

import type { BlogPost } from "@/lib/blog-types";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";

type CustomBlogPostDoc = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  heroImage?: string;
  videoUrl?: string;
  galleryImages?: string[];
};

export const defaultBlogPosts: BlogPost[] = [
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks: A Deep Dive into useEffect",
    description:
      "Understand the intricacies of the useEffect hook and avoid common pitfalls to write cleaner, more efficient React components.",
    date: "2025-08-10",
    content:
      "The useEffect hook is one of the most powerful tools in a React developer's arsenal, but it's also one of the most misunderstood.\n\nThe dependency array controls when an effect runs. If you pass an empty array, the effect runs once after initial render. If omitted, it runs on every render.\n\nA good rule of thumb is to keep effects focused, cleanup subscriptions, and avoid mixing unrelated side effects in one hook.",
    heroImage: "/images/test-img.png",
    source: "default",
  },
  {
    slug: "devops-on-a-budget",
    title: "DevOps on a Budget: CI/CD with GitHub Actions and Docker",
    description:
      "Learn how to set up a robust, automated CI/CD pipeline for your projects for free using the powerful combination of Docker and GitHub Actions.",
    date: "2025-07-22",
    content:
      "Automating your deployment process does not need to be expensive. GitHub Actions can build, test, and deploy your applications on every push.\n\nDocker ensures builds and runtime behavior stay consistent from local development to production.\n\nStart with a simple pipeline, then add quality gates like linting, type checks, and tests.",
    heroImage: "/big.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    source: "default",
  },
];

function customPostsCollectionName() {
  return process.env.BLOG_POSTS_COLLECTION || "blog_posts_custom";
}

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const aDate = Date.parse(a.date);
    const bDate = Date.parse(b.date);
    const aTime = Number.isNaN(aDate) ? 0 : aDate;
    const bTime = Number.isNaN(bDate) ? 0 : bDate;
    return bTime - aTime;
  });
}

function normalizeCustomPost(post: Partial<CustomBlogPostDoc>): BlogPost {
  const galleryImages = Array.isArray(post.galleryImages)
    ? post.galleryImages.filter(Boolean)
    : [];

  return {
    slug: String(post.slug || "").trim(),
    title: String(post.title || "").trim(),
    description: String(post.description || "").trim(),
    date: String(post.date || "").trim(),
    content: String(post.content || "").trim(),
    heroImage: post.heroImage?.trim(),
    videoUrl: post.videoUrl?.trim(),
    galleryImages,
    source: "custom",
  };
}

async function getCustomPostsCollection() {
  const db = await getMongoDb();
  return db.collection<CustomBlogPostDoc>(customPostsCollectionName());
}

export async function getCustomBlogPosts(): Promise<BlogPost[]> {
  if (!isMongoConfigured()) return [];

  const collection = await getCustomPostsCollection();
  const docs = await collection.find({}).toArray();
  return docs.map(normalizeCustomPost);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const customPosts = await getCustomBlogPosts();
  const defaults = defaultBlogPosts.map((post) => ({
    ...post,
    source: "default" as const,
  }));

  const bySlug = new Map<string, BlogPost>();
  for (const post of defaults) bySlug.set(post.slug, post);
  for (const post of customPosts) bySlug.set(post.slug, post);

  return sortByDateDesc([...bySlug.values()]);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type UpsertPayload = {
  title: string;
  description: string;
  content: string;
  date?: string;
  slug?: string;
  heroImage?: string;
  videoUrl?: string;
  galleryImages?: string[] | string;
};

function sanitizePayload(payload: UpsertPayload) {
  const title = payload.title?.trim();
  const description = payload.description?.trim();
  const content = payload.content?.trim();
  const slugBase = payload.slug?.trim() || title;
  const slug = slugify(slugBase || "");
  const date = payload.date?.trim() || new Date().toISOString().slice(0, 10);
  const heroImage = payload.heroImage?.trim() || undefined;
  const videoUrl = payload.videoUrl?.trim() || undefined;
  const galleryRaw = Array.isArray(payload.galleryImages)
    ? payload.galleryImages
    : payload.galleryImages?.split("\n") ?? [];
  const galleryImages = galleryRaw.map((item) => item.trim()).filter(Boolean);

  if (!title || !description || !content || !slug) {
    throw new Error("title, description, and content are required");
  }

  return {
    title,
    description,
    content,
    slug,
    date,
    heroImage,
    videoUrl,
    galleryImages,
  };
}

function ensureMongoWritesEnabled() {
  if (!isMongoConfigured()) {
    throw new Error(
      "MongoDB is not configured. Set MONGODB_URI and optionally MONGODB_DB."
    );
  }
}

function toCustomDoc(post: ReturnType<typeof sanitizePayload>): CustomBlogPostDoc {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    content: post.content,
    heroImage: post.heroImage,
    videoUrl: post.videoUrl,
    galleryImages: post.galleryImages,
  };
}

export async function createCustomBlogPost(payload: UpsertPayload): Promise<BlogPost> {
  ensureMongoWritesEnabled();
  const clean = sanitizePayload(payload);
  const existing = await getAllBlogPosts();
  if (existing.some((post) => post.slug === clean.slug)) {
    throw new Error("A post with this slug already exists");
  }

  const collection = await getCustomPostsCollection();
  await collection.insertOne(toCustomDoc(clean));
  return { ...clean, source: "custom" };
}

export async function updateCustomBlogPost(
  slug: string,
  payload: UpsertPayload
): Promise<BlogPost> {
  ensureMongoWritesEnabled();
  const clean = sanitizePayload({ ...payload, slug: payload.slug || slug });
  const collection = await getCustomPostsCollection();

  const existing = await collection.findOne({ slug });
  if (!existing) {
    throw new Error("Only custom posts can be updated");
  }

  if (clean.slug !== slug) {
    const duplicateCustom = await collection.findOne({ slug: clean.slug });
    if (duplicateCustom) {
      throw new Error("A post with this slug already exists");
    }
    if (defaultBlogPosts.some((post) => post.slug === clean.slug)) {
      throw new Error("A default post already uses this slug");
    }
  }

  await collection.updateOne({ slug }, { $set: toCustomDoc(clean) });
  return { ...clean, source: "custom" };
}

export async function deleteCustomBlogPost(slug: string): Promise<void> {
  ensureMongoWritesEnabled();
  const collection = await getCustomPostsCollection();
  const result = await collection.deleteOne({ slug });
  if (!result.deletedCount) {
    throw new Error("Only custom posts can be deleted");
  }
}
