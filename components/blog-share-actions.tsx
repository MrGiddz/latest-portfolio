"use client";

import { useMemo, useState } from "react";

type BlogShareActionsProps = {
  title: string;
  url: string;
};

export default function BlogShareActions({ title, url }: BlogShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const links = useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    return {
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    };
  }, [title, url]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-black/20 p-4">
      <p className="text-sm text-slate-700 dark:text-gray-200 mb-3">Share this post</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-1.5 text-sm bg-slate-800 text-white"
        >
          Share on X
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-1.5 text-sm bg-blue-700 text-white"
        >
          LinkedIn
        </a>
        <a
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-1.5 text-sm bg-blue-600 text-white"
        >
          Facebook
        </a>
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-1.5 text-sm bg-green-600 text-white"
        >
          WhatsApp
        </a>
        <button
          onClick={copyLink}
          className="rounded-lg px-3 py-1.5 text-sm bg-slate-200 text-slate-900 dark:bg-white/20 dark:text-white"
        >
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
