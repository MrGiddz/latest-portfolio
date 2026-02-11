import { NextRequest, NextResponse } from "next/server";
import { deleteCustomBlogPost, updateCustomBlogPost } from "@/lib/blog";
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

type Params = {
  params: Promise<{ slug: string }>;
};

export async function PUT(request: NextRequest, { params }: Params) {
  const authError = validateAdminToken(request);
  if (authError) return authError;

  try {
    const { slug } = await params;
    const payload = await request.json();
    const post = await updateCustomBlogPost(slug, payload);
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
    return NextResponse.json({ post });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update blog post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const authError = validateAdminToken(request);
  if (authError) return authError;

  try {
    const { slug } = await params;
    await deleteCustomBlogPost(slug);
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete blog post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
