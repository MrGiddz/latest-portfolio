import { NextRequest, NextResponse } from "next/server";
import { createCustomBlogPost, getAllBlogPosts } from "@/lib/blog";
import { revalidatePath } from "next/cache";

function validateAdminToken(request: NextRequest) {
  const expected = process.env.BLOG_ADMIN_TOKEN;
  const provided = request.headers.get("x-admin-token");

  if (!expected) {
    return NextResponse.json(
      { error: "BLOG_ADMIN_TOKEN is not configured on the server." },
      { status: 500 }
    );
  }

  if (!provided || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET(request: NextRequest) {
  const authError = validateAdminToken(request);
  if (authError) return authError;

  const posts = await getAllBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const authError = validateAdminToken(request);
  if (authError) return authError;

  try {
    const payload = await request.json();
    const post = await createCustomBlogPost(payload);
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create blog post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
