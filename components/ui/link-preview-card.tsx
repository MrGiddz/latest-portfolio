"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import FallbackImage from "@/components/ui/fallback-image";

type LinkPreviewData = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  status: "ok" | "error";
  error?: string;
};

const isPreviewableUrl = (url: string) =>
  /^https?:\/\//i.test(url || "");

const formatHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const LinkPreviewCard = ({
  url,
  label = "Website Preview",
  disabled = false,
  className = "",
}: {
  url: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}) => {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">(
    "idle"
  );

  const hostname = useMemo(() => formatHost(url), [url]);
  const previewable = isPreviewableUrl(url);

  useEffect(() => {
    if (!previewable) {
      return;
    }

    let active = true;
    const controller = new AbortController();

    const loadPreview = async () => {
      setStatus("loading");
      try {
        const response = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`,
          { signal: controller.signal }
        );
        const payload = (await response.json()) as LinkPreviewData;
        if (!active) {
          return;
        }
        if (payload.status === "error") {
          setStatus("error");
          setData(payload);
          return;
        }
        setData(payload);
        setStatus("success");
      } catch {
        if (!active) {
          return;
        }
        setStatus("error");
      }
    };

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(loadPreview, { timeout: 1200 });
      return () => {
        active = false;
        controller.abort();
        window.cancelIdleCallback(handle);
      };
    }

    const timeout = window.setTimeout(loadPreview, 150);
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [previewable, url]);

  if (!previewable || disabled) {
    return null;
  }

  const title = data?.title || hostname;
  const description =
    data?.description || (status === "loading" ? "Loading preview..." : "Preview unavailable.");
  const imageUrl = data?.image;

  return (
    <div
      className={`rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 shadow-sm ${className}`}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-3 p-3 items-stretch"
        aria-busy={status === "loading"}
      >
        <div className="h-20 w-28 rounded-lg overflow-hidden border border-slate-200/70 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 flex items-center justify-center">
          {imageUrl ? (
            <FallbackImage
              src={imageUrl}
              alt={`${title} preview`}
              className="h-full w-full object-cover"
              fallbackText="No preview"
              loading="lazy"
            />
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {status === "loading" ? "Loading..." : "No image"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {label}
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
              {title}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug max-h-10 overflow-hidden">
              {description}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <ExternalLink size={12} />
            <span className="truncate">{hostname}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkPreviewCard;
