"use client";

import { useEffect, useMemo, useState } from "react";
import type { BlogPost } from "@/lib/blog-types";

type EditorState = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  heroImage: string;
  videoUrl: string;
  galleryImages: string;
};

const initialEditor: EditorState = {
  slug: "",
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  content: "",
  heroImage: "",
  videoUrl: "",
  galleryImages: "",
};

export default function AdminBlogManager() {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [editor, setEditor] = useState<EditorState>(initialEditor);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const activePost = useMemo(
    () => posts.find((post) => post.slug === activeSlug),
    [activeSlug, posts]
  );

  useEffect(() => {
    const saved = localStorage.getItem("blog-admin-token");
    if (saved) setToken(saved);
  }, []);

  async function fetchPosts(adminToken: string) {
    setLoading(true);
    setStatus("Loading posts...");
    try {
      const res = await fetch("/api/admin/blog-posts", {
        headers: { "x-admin-token": adminToken },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts ?? []);
      setStatus("Posts loaded.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setActiveSlug("");
    setEditor(initialEditor);
  }

  function startEdit(post: BlogPost) {
    setActiveSlug(post.slug);
    setEditor({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      content: post.content,
      heroImage: post.heroImage || "",
      videoUrl: post.videoUrl || "",
      galleryImages: (post.galleryImages || []).join("\n"),
    });
  }

  async function savePost() {
    if (!token) {
      setStatus("Enter your admin token first.");
      return;
    }

    setLoading(true);
    setStatus("Saving post...");
    try {
      localStorage.setItem("blog-admin-token", token);

      const isEditing = Boolean(activeSlug);
      const url = isEditing
        ? `/api/admin/blog-posts/${encodeURIComponent(activeSlug)}`
        : "/api/admin/blog-posts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(editor),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to save post");

      setStatus(isEditing ? "Post updated." : "Post created.");
      setActiveSlug(data.post.slug);
      await fetchPosts(token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save post");
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(slug: string) {
    if (!token) {
      setStatus("Enter your admin token first.");
      return;
    }

    if (!window.confirm("Delete this post?")) return;

    setLoading(true);
    setStatus("Deleting post...");
    try {
      const res = await fetch(`/api/admin/blog-posts/${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to delete post");

      setStatus("Post deleted.");
      if (activeSlug === slug) startCreate();
      await fetchPosts(token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to delete post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl my-24">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-mono">
          Blog Admin
        </h1>
        <p className="mt-3 text-slate-700 dark:text-gray-200">
          Use your admin token to create and manage blog posts.
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <input
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
          />
          <button
            onClick={() => fetchPosts(token)}
            disabled={loading || !token}
            className="rounded-xl px-5 py-3 bg-blue-600 text-white disabled:opacity-50"
          >
            Load Posts
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-600 dark:text-gray-300">{status}</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1 rounded-2xl border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-black/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900 dark:text-white">Posts</h2>
              <button
                onClick={startCreate}
                className="text-sm rounded-lg px-3 py-1.5 bg-slate-800 text-white dark:bg-white dark:text-slate-900"
              >
                New
              </button>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto">
              {posts.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => startEdit(post)}
                  className={`w-full text-left rounded-lg px-3 py-2 border transition ${
                    activePost?.slug === post.slug
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-300 dark:border-white/20"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-gray-300">
                    {post.date} - {post.source}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <section className="lg:col-span-2 rounded-2xl border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-black/20 p-4 md:p-5 space-y-3">
            <input
              value={editor.title}
              onChange={(e) => setEditor((s) => ({ ...s, title: e.target.value }))}
              placeholder="Post title"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              value={editor.slug}
              onChange={(e) => setEditor((s) => ({ ...s, slug: e.target.value }))}
              placeholder="Slug (optional on create)"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              value={editor.description}
              onChange={(e) =>
                setEditor((s) => ({ ...s, description: e.target.value }))
              }
              placeholder="Short description"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              type="date"
              value={editor.date}
              onChange={(e) => setEditor((s) => ({ ...s, date: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <textarea
              value={editor.content}
              onChange={(e) => setEditor((s) => ({ ...s, content: e.target.value }))}
              rows={12}
              placeholder="Write your post content. Use blank lines to separate paragraphs."
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              value={editor.heroImage}
              onChange={(e) =>
                setEditor((s) => ({ ...s, heroImage: e.target.value }))
              }
              placeholder="Hero image URL (e.g. /images/post.jpg or https://...)"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              value={editor.videoUrl}
              onChange={(e) =>
                setEditor((s) => ({ ...s, videoUrl: e.target.value }))
              }
              placeholder="Video URL (YouTube, Vimeo, or direct .mp4)"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <textarea
              value={editor.galleryImages}
              onChange={(e) =>
                setEditor((s) => ({ ...s, galleryImages: e.target.value }))
              }
              rows={4}
              placeholder="Gallery image URLs (one per line)"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={savePost}
                disabled={loading}
                className="rounded-xl px-5 py-2.5 bg-blue-600 text-white disabled:opacity-50"
              >
                {activeSlug ? "Update Post" : "Create Post"}
              </button>
              {activePost?.source === "custom" && (
                <button
                  onClick={() => deletePost(activePost.slug)}
                  disabled={loading}
                  className="rounded-xl px-5 py-2.5 bg-red-600 text-white disabled:opacity-50"
                >
                  Delete Post
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
