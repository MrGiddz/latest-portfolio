import { Calendar, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  absoluteUrl,
  AUTHOR_EMAIL,
  AUTHOR_NAME,
  AUTHOR_ROLE,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import BlogShareActions from "@/components/blog-share-actions";
import FallbackImage from "@/components/ui/fallback-image";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const previewImage = post.heroImage || DEFAULT_OG_IMAGE;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteUrl(previewImage),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: toISODate(post.date),
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl(previewImage)],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const shareUrl = absoluteUrl(`/blog/${post.slug}`);
  const previewImage = post.heroImage || DEFAULT_OG_IMAGE;
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: toISODate(post.date),
    dateModified: toISODate(post.date),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Person",
      name: "Olaniyi Gideon Olamide",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Olaniyi Gideon Olamide",
      url: SITE_URL,
    },
    image: [absoluteUrl(previewImage)],
    ...(post.videoUrl
      ? {
          video: {
            "@type": "VideoObject",
            name: post.title,
            description: post.description,
            uploadDate: toISODate(post.date),
            embedUrl: normalizeVideoEmbed(post.videoUrl),
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: shareUrl,
      },
    ],
  };

  return (
    <div className="w-full p-4 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="w-full max-w-3xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-5 md:p-8 shadow-2xl my-16 md:my-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-blue-500 dark:text-blue-400 hover:underline mb-8"
        >
          <ChevronLeft size={16} />
          Back to Blog
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-mono">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>

        <div className="space-y-4 mb-8">
          {post.heroImage && (
            <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-slate-300 dark:border-white/20">
              <FallbackImage
                src={post.heroImage}
                alt={post.title}
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                fallbackSrc="/images/test-img.png"
                fallbackText="Hero image unavailable"
              />
            </div>
          )}

          {post.videoUrl && renderVideo(post.videoUrl)}

          {post.galleryImages && post.galleryImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {post.galleryImages.map((image, index) => (
                <div
                  key={`${post.slug}-gallery-${index}`}
                  className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-300 dark:border-white/20"
                >
                  <FallbackImage
                    src={image}
                    alt={`${post.title} image ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    fallbackSrc="/images/test-img.png"
                    fallbackText="Gallery image unavailable"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-slate-700 dark:text-gray-200 leading-relaxed space-y-4">
          {renderPostContent(post.content, post.slug)}
        </div>

        <div className="mt-10">
          <BlogShareActions title={post.title} url={shareUrl} />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-black/20 p-5">
          <p className="text-sm text-slate-600 dark:text-gray-300">Author</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
            {AUTHOR_NAME}
          </h3>
          <p className="text-slate-700 dark:text-gray-200">{AUTHOR_ROLE}</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-gray-200">
            Contact me:{" "}
            <a className="text-blue-500 hover:underline" href={`mailto:${AUTHOR_EMAIL}`}>
              {AUTHOR_EMAIL}
            </a>{" "}
            |{" "}
            <Link className="text-blue-500 hover:underline" href="/about">
              About the author
            </Link>
          </p>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Related Posts
            </h3>
            <div className="space-y-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block rounded-xl border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-black/20 p-4 hover:border-blue-400"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {related.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

function renderPostContent(content: string, slug: string) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let paragraphLines: string[] = [];
  let bulletItems: string[] = [];
  let numberedItems: string[] = [];
  let keyIndex = 0;

  const pushParagraph = () => {
    if (!paragraphLines.length) return;
    const text = paragraphLines.join(" ");
    blocks.push(
      <p key={`${slug}-p-${keyIndex++}`}>{renderInline(text, slug, keyIndex)}</p>
    );
    paragraphLines = [];
  };

  const pushBullets = () => {
    if (!bulletItems.length) return;
    blocks.push(
      <ul key={`${slug}-ul-${keyIndex++}`} className="list-disc pl-6 space-y-1">
        {bulletItems.map((item, index) => (
          <li key={`${slug}-ul-item-${keyIndex}-${index}`}>
            {renderInline(item, slug, keyIndex + index)}
          </li>
        ))}
      </ul>
    );
    bulletItems = [];
  };

  const pushNumbered = () => {
    if (!numberedItems.length) return;
    blocks.push(
      <ol key={`${slug}-ol-${keyIndex++}`} className="list-decimal pl-6 space-y-1">
        {numberedItems.map((item, index) => (
          <li key={`${slug}-ol-item-${keyIndex}-${index}`}>
            {renderInline(item, slug, keyIndex + index)}
          </li>
        ))}
      </ol>
    );
    numberedItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      pushParagraph();
      pushBullets();
      pushNumbered();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      pushParagraph();
      pushNumbered();
      bulletItems.push(trimmed.slice(2).trim());
      continue;
    }

    const numberedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberedMatch) {
      pushParagraph();
      pushBullets();
      numberedItems.push(numberedMatch[1].trim());
      continue;
    }

    pushBullets();
    pushNumbered();
    paragraphLines.push(trimmed);
  }

  pushParagraph();
  pushBullets();
  pushNumbered();

  return blocks.length
    ? blocks
    : [<p key={`${slug}-empty`}>No content provided.</p>];
}

function renderInline(text: string, slug: string, seed: number) {
  const regex =
    /(\{color:\s*([^}]+?)\s*\}([\s\S]*?)\{\\?\/color\}|\{size:\s*([^}]+?)\s*\}([\s\S]*?)\{\\?\/size\}|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let token = 0;
  let match: RegExpExecArray | null = regex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const color = sanitizeColor(match[2]);
      if (color) {
        nodes.push(
          <span key={`${slug}-color-${seed}-${token++}`} style={{ color }}>
            {renderInline(match[3], slug, seed + token + 1)}
          </span>
        );
      } else {
        nodes.push(renderInline(match[3], slug, seed + token + 1));
      }
    } else if (match[4] && match[5]) {
      const size = sanitizeFontSize(match[4]);
      if (size) {
        nodes.push(
          <span key={`${slug}-size-${seed}-${token++}`} style={{ fontSize: size }}>
            {renderInline(match[5], slug, seed + token + 1)}
          </span>
        );
      } else {
        nodes.push(renderInline(match[5], slug, seed + token + 1));
      }
    } else if (match[6] && match[7]) {
      nodes.push(
        <a
          key={`${slug}-link-${seed}-${token++}`}
          href={match[7]}
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {match[6]}
        </a>
      );
    } else if (match[8]) {
      nodes.push(
        <strong key={`${slug}-bold-${seed}-${token++}`}>{match[8]}</strong>
      );
    } else if (match[9]) {
      nodes.push(<u key={`${slug}-underline-${seed}-${token++}`}>{match[9]}</u>);
    } else if (match[10]) {
      nodes.push(<em key={`${slug}-italic-${seed}-${token++}`}>{match[10]}</em>);
    } else if (match[11]) {
      nodes.push(
        <code
          key={`${slug}-code-${seed}-${token++}`}
          className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/60 text-[0.95em]"
        >
          {match[11]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : text;
}

function sanitizeColor(value: string) {
  const trimmed = value.trim();
  const hexPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  return hexPattern.test(trimmed) ? trimmed : null;
}

function sanitizeFontSize(value: string) {
  const trimmed = value.trim().toLowerCase();
  const pxPattern = /^(\d{1,3})px$/;
  const match = trimmed.match(pxPattern);
  if (!match) return null;

  const size = Number(match[1]);
  if (Number.isNaN(size)) return null;
  if (size < 10 || size > 72) return null;
  return `${size}px`;
}

function toISODate(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? new Date().toISOString()
    : parsedDate.toISOString();
}

function normalizeVideoEmbed(videoUrl: string) {
  if (videoUrl.includes("youtube.com/watch")) {
    const url = new URL(videoUrl);
    const id = url.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : videoUrl;
  }

  if (videoUrl.includes("youtu.be/")) {
    const id = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : videoUrl;
  }

  if (videoUrl.includes("vimeo.com/")) {
    const id = videoUrl.split("vimeo.com/")[1]?.split("?")[0];
    return id ? `https://player.vimeo.com/video/${id}` : videoUrl;
  }

  return videoUrl;
}

function renderVideo(videoUrl: string) {
  const embedUrl = normalizeVideoEmbed(videoUrl);
  const isEmbeddable =
    embedUrl.includes("youtube.com/embed/") ||
    embedUrl.includes("player.vimeo.com/video/");

  if (isEmbeddable) {
    return (
      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-300 dark:border-white/20">
        <iframe
          src={embedUrl}
          title="Embedded video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video
      controls
      className="w-full rounded-2xl border border-slate-300 dark:border-white/20"
      src={videoUrl}
    />
  );
}
