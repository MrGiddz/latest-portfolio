import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";
import { buildLlmsFullTxt } from "@/lib/llms";

export const runtime = "nodejs";

export async function GET() {
  const posts = await getAllBlogPosts();
  const postLines = posts
    .map((post) => `- ${new URL(`/blog/${post.slug}`, SITE_URL).toString()}`)
    .join("\n");

  return new NextResponse(buildLlmsFullTxt(postLines), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
