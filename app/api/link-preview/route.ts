import { NextRequest, NextResponse } from "next/server";

type LinkPreviewResponse = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  status: "ok" | "error";
  error?: string;
};

const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const REQUEST_TIMEOUT_MS = 8000;
const MAX_HTML_BYTES = 1024 * 1024; // 1MB
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const cache = new Map<string, { expiresAt: number; data: LinkPreviewResponse }>();

const BLOCKED_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
const PRIVATE_IP_PATTERNS = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^0\./,
];

const attrRegex = /([a-zA-Z_:.-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^"\s>]+))/g;

export const runtime = "nodejs";
export const revalidate = 3600;

const sanitizeText = (value?: string) =>
  value ? value.replace(/\s+/g, " ").trim() : undefined;

const isPrivateHostname = (hostname: string) => {
  if (BLOCKED_HOSTS.has(hostname)) {
    return true;
  }
  if (hostname.endsWith(".local")) {
    return true;
  }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    return PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(hostname));
  }
  return false;
};

const parseAttributes = (tag: string) => {
  const attrs: Record<string, string> = {};
  for (const match of tag.matchAll(attrRegex)) {
    const key = match[1]?.toLowerCase();
    const value = match[3] ?? match[4] ?? match[5] ?? "";
    if (key) {
      attrs[key] = value;
    }
  }
  return attrs;
};

const extractMeta = (html: string) => {
  const meta: Record<string, string> = {};
  const links: Record<string, string[]> = {};

  const metaTags = html.match(/<meta\s+[^>]*>/gi) || [];
  for (const tag of metaTags) {
    const attrs = parseAttributes(tag);
    const key = (attrs.property || attrs.name || "").toLowerCase();
    if (!key || !attrs.content) {
      continue;
    }
    meta[key] = attrs.content;
  }

  const linkTags = html.match(/<link\s+[^>]*>/gi) || [];
  for (const tag of linkTags) {
    const attrs = parseAttributes(tag);
    const rel = (attrs.rel || "").toLowerCase();
    const href = attrs.href;
    if (!rel || !href) {
      continue;
    }
    if (!links[rel]) {
      links[rel] = [];
    }
    links[rel].push(href);
  }

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : undefined;

  return { meta, links, title };
};

const toAbsoluteUrl = (value: string | undefined, baseUrl: URL) => {
  if (!value) {
    return undefined;
  }
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return undefined;
  }
};

const pickFavicon = (links: Record<string, string[]>, baseUrl: URL) => {
  const iconRels = ["icon", "shortcut icon", "apple-touch-icon"];
  for (const rel of iconRels) {
    const candidates = links[rel];
    if (candidates && candidates.length) {
      return toAbsoluteUrl(candidates[0], baseUrl);
    }
  }
  return undefined;
};

const fetchHtml = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    throw new Error("Unsupported content type");
  }

  const text = await response.text();
  return text.slice(0, MAX_HTML_BYTES);
};

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get("url");
  if (!urlParam) {
    return NextResponse.json(
      { status: "error", error: "Missing url parameter" },
      { status: 400 }
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(urlParam);
  } catch {
    return NextResponse.json(
      { status: "error", error: "Invalid url" },
      { status: 400 }
    );
  }

  if (!["http:", "https:"].includes(targetUrl.protocol)) {
    return NextResponse.json(
      { status: "error", error: "Unsupported protocol" },
      { status: 400 }
    );
  }

  if (isPrivateHostname(targetUrl.hostname)) {
    return NextResponse.json(
      { status: "error", error: "Blocked host" },
      { status: 400 }
    );
  }

  const cacheKey = targetUrl.toString();
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.data, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const html = await fetchHtml(cacheKey, controller.signal);
    const { meta, links, title } = extractMeta(html);

    const preview: LinkPreviewResponse = {
      status: "ok",
      url: cacheKey,
      title: sanitizeText(meta["og:title"] || meta["twitter:title"] || title),
      description: sanitizeText(
        meta["og:description"] ||
          meta["description"] ||
          meta["twitter:description"]
      ),
      image: toAbsoluteUrl(
        meta["og:image"] || meta["twitter:image"],
        targetUrl
      ),
      siteName: sanitizeText(meta["og:site_name"] || targetUrl.hostname),
      favicon: pickFavicon(links, targetUrl),
    };

    cache.set(cacheKey, {
      data: preview,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return NextResponse.json(preview, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch preview";
    const response: LinkPreviewResponse = {
      status: "error",
      url: cacheKey,
      error: message,
    };
    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=600",
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}
