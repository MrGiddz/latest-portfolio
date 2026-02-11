import BlogPageComponent from "@/components/blog-page-component";
import { Metadata } from "next";
import React from "react";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering articles on React, Next.js, Node.js, DevOps, and practical software delivery.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Engineering articles on React, Next.js, Node.js, DevOps, and practical software delivery.",
    type: "website",
    url: "/blog",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description:
      "Engineering articles on React, Next.js, Node.js, DevOps, and practical software delivery.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return <BlogPageComponent posts={posts} />;
}
