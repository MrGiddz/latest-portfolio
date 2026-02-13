"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { BlogPost } from "@/lib/blog-types";

type EditorState = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  status: "draft" | "published";
  heroImage: string;
  videoUrl: string;
  galleryImages: string;
};

type NoticeTone = "success" | "error" | "info";

type Notice = {
  message: string;
  tone: NoticeTone;
};

const initialEditor: EditorState = {
  slug: "",
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  content: "",
  status: "draft",
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
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [descriptionManuallyEdited, setDescriptionManuallyEdited] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [textColor, setTextColor] = useState("#2563eb");
  const [fontSize, setFontSize] = useState("16px");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const activePost = useMemo(
    () => posts.find((post) => post.slug === activeSlug),
    [activeSlug, posts]
  );

  useEffect(() => {
    const saved = localStorage.getItem("blog-admin-token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [notice]);

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

  function showNotice(message: string, tone: NoticeTone) {
    setNotice({ message, tone });
  }

  function startCreate() {
    setActiveSlug("");
    setEditor(initialEditor);
    setSlugManuallyEdited(false);
    setDescriptionManuallyEdited(false);
  }

  function startEdit(post: BlogPost) {
    setActiveSlug(post.slug);
    setSlugManuallyEdited(true);
    setDescriptionManuallyEdited(true);
    setEditor({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      content: post.content,
      status: post.status || "published",
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
      showNotice(
        isEditing
          ? "Post updated successfully."
          : editor.status === "draft"
            ? "Draft saved successfully."
            : "Post published successfully.",
        "success"
      );
      setActiveSlug(data.post.slug);
      await fetchPosts(token);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save post";
      setStatus(message);
      showNotice(message, "error");
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
      showNotice("Post deleted.", "info");
      if (activeSlug === slug) startCreate();
      await fetchPosts(token);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to delete post";
      setStatus(message);
      showNotice(message, "error");
    } finally {
      setLoading(false);
    }
  }

  function applyWrap(prefix: string, suffix = prefix, placeholder = "text") {
    const textarea = contentRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const selectedText = editor.content.slice(selectionStart, selectionEnd);
    const insertText = selectedText || placeholder;
    const nextValue =
      editor.content.slice(0, selectionStart) +
      prefix +
      insertText +
      suffix +
      editor.content.slice(selectionEnd);

    setEditor((state) => ({ ...state, content: nextValue }));

    requestAnimationFrame(() => {
      textarea.focus();
      const start = selectionStart + prefix.length;
      const end = start + insertText.length;
      textarea.setSelectionRange(start, end);
    });
  }

  function applyList(marker: "-" | "1.") {
    const textarea = contentRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const selectedText = editor.content.slice(selectionStart, selectionEnd);
    const lines = (selectedText || "List item")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const listText =
      marker === "-"
        ? lines.map((line) => `- ${line}`).join("\n")
        : lines.map((line, index) => `${index + 1}. ${line}`).join("\n");

    const nextValue =
      editor.content.slice(0, selectionStart) +
      listText +
      editor.content.slice(selectionEnd);

    setEditor((state) => ({ ...state, content: nextValue }));

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart, selectionStart + listText.length);
    });
  }

  function applyTextColor() {
    applyWrap(`{color:${textColor}}`, "{/color}");
  }

  function applyFontSize() {
    applyWrap(`{size:${fontSize}}`, "{/size}");
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const hasModifier = event.metaKey || event.ctrlKey;
    if (!hasModifier) return;

    const key = event.key.toLowerCase();

    // Keep native editing shortcuts intact.
    if (["c", "v", "x", "a", "z", "y"].includes(key)) {
      return;
    }

    if (key === "b") {
      event.preventDefault();
      applyWrap("**");
      return;
    }

    if (key === "i") {
      event.preventDefault();
      applyWrap("*");
      return;
    }

    if (key === "u") {
      event.preventDefault();
      applyWrap("__");
      return;
    }

    if (key === "k") {
      event.preventDefault();
      applyWrap("[", "](https://example.com)", "link text");
    }
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      {notice && (
        <div
          className={`fixed right-6 top-6 z-50 rounded-xl px-4 py-3 shadow-lg border text-sm ${
            notice.tone === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : notice.tone === "error"
                ? "bg-red-50 border-red-300 text-red-900"
                : "bg-blue-50 border-blue-300 text-blue-900"
          }`}
          role="status"
          aria-live="polite"
        >
          {notice.message}
        </div>
      )}
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-4 md:p-8 shadow-2xl my-16 md:my-24">
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
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">
                    {(post.status || "published").toUpperCase()}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <section className="lg:col-span-2 rounded-2xl border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-black/20 p-4 md:p-5 space-y-3">
            <input
              value={editor.title}
              onChange={(e) =>
                setEditor((state) => {
                  const nextTitle = e.target.value;
                  return {
                    ...state,
                    title: nextTitle,
                    slug: slugManuallyEdited
                      ? state.slug
                      : slugifyTitle(nextTitle),
                    description: descriptionManuallyEdited
                      ? state.description
                      : generateDescription(nextTitle, state.content),
                  };
                })
              }
              placeholder="Post title"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              value={editor.slug}
              onChange={(e) => {
                const value = e.target.value;
                setSlugManuallyEdited(Boolean(value.trim()));
                setEditor((state) => ({ ...state, slug: value }));
              }}
              placeholder="Slug (auto-generated from title, editable)"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              value={editor.description}
              onChange={(e) => {
                const value = e.target.value;
                const manual = Boolean(value.trim());
                setDescriptionManuallyEdited(manual);
                setEditor((state) => ({
                  ...state,
                  description: manual
                    ? value
                    : generateDescription(state.title, state.content),
                }));
              }}
              placeholder="Short description"
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <input
              type="date"
              value={editor.date}
              onChange={(e) => setEditor((s) => ({ ...s, date: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <select
              value={editor.status}
              onChange={(e) =>
                setEditor((state) => ({
                  ...state,
                  status: e.target.value as "draft" | "published",
                }))
              }
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            >
              <option value="draft">Draft (hidden from public blog)</option>
              <option value="published">Published (visible publicly)</option>
            </select>
            <textarea
              ref={contentRef}
              value={editor.content}
              onKeyDown={handleEditorKeyDown}
              onChange={(e) =>
                setEditor((state) => {
                  const nextContent = e.target.value;
                  return {
                    ...state,
                    content: nextContent,
                    description: descriptionManuallyEdited
                      ? state.description
                      : generateDescription(state.title, nextContent),
                  };
                })
              }
              rows={12}
              placeholder="Write your post content. Use blank lines for paragraphs and the toolbar for formatting."
              className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-black/20 px-4 py-3 text-slate-900 dark:text-white"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyWrap("**")}
                title="Bold: wraps selected text with **bold**"
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Bold
              </button>
              <button
                onClick={() => applyWrap("*")}
                title="Italic: wraps selected text with *italic*"
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Italic
              </button>
              <button
                onClick={() => applyWrap("__")}
                title="Underline: wraps selected text with __underline__"
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Underline
              </button>
              <button
                onClick={() => applyList("-")}
                title="Bullet list: turns selected lines into - list items"
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Bullet List
              </button>
              <button
                onClick={() => applyList("1.")}
                title="Numbered list: turns selected lines into 1. 2. 3."
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Numbered List
              </button>
              <button
                onClick={() => applyWrap("[", "](https://example.com)", "link text")}
                title="Link: wraps selected text as [text](https://...)"
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Link
              </button>
              <label className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 border border-slate-300 dark:border-white/20 text-sm text-slate-800 dark:text-white">
                Color
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-7 w-9 cursor-pointer rounded border border-slate-300 dark:border-white/20 bg-transparent"
                  aria-label="Select text color"
                  title="Select text color"
                />
              </label>
              <button
                onClick={applyTextColor}
                title="Text color: wraps selected text with {color:#2563eb}text{/color}"
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Apply Color
              </button>
              <label className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 border border-slate-300 dark:border-white/20 text-sm text-slate-800 dark:text-white">
                Size
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="rounded-md border border-slate-300 dark:border-white/20 bg-white/90 dark:bg-black/30 px-2 py-1 text-sm text-slate-900 dark:text-white"
                  aria-label="Select font size"
                  title="Select font size"
                >
                  {["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"].map(
                    (size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    )
                  )}
                </select>
              </label>
              <button
                onClick={applyFontSize}
                title="Font size: wraps selected text with {size:18px}text{/size}"
                className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
              >
                Apply Size
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-gray-300">
              Formatting: <code>**bold**</code>, <code>*italic*</code>, <code>__underline__</code>, <code>- list</code>, <code>1. list</code>, <code>[text](url)</code>, <code>{"{color:#2563eb}text{/color}"}</code>, <code>{"{size:18px}text{/size}"}</code>.
            </p>
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
                {activeSlug
                  ? editor.status === "draft"
                    ? "Update Draft"
                    : "Update & Publish"
                  : editor.status === "draft"
                    ? "Save Draft"
                    : "Publish Post"}
              </button>
              {activePost && (
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

function slugifyTitle(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function generateDescription(title: string, content: string) {
  const normalized = content
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/\{\/?(?:color|size)(?::[^}]+)?\}/g, " ")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const source = normalized || title.trim();
  if (!source) return "";
  if (source.length <= 160) return source;
  return `${source.slice(0, 157).trimEnd()}...`;
}
