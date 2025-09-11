import React from "react";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import BlogContent from "./blog-content";

// 1. Define an explicit type for the page's props
type Props = {
  params: { slug: string };
};


export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full p-6 md:p-10 flex items-center justify-center">
      <BlogContent post={post} />
    </div>
  );
}

// You can also apply the type here for consistency, though it's optional
export async function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Not Found" };
  }
  return {
    title: post.title,
    description: post.description,
  };
}