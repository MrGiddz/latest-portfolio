import { readFile } from "node:fs/promises";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "latest_portfolio";
const collectionName = process.env.BLOG_POSTS_COLLECTION || "blog_posts_custom";

if (!uri) {
  console.error("Missing MONGODB_URI.");
  process.exit(1);
}

async function run() {
  const raw = await readFile("data/blog-posts.json", "utf8").catch(() => "[]");
  const json = JSON.parse(raw);
  const posts = Array.isArray(json) ? json : [];

  if (!posts.length) {
    console.log("No JSON posts found in data/blog-posts.json");
    return;
  }

  const client = new MongoClient(uri);
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);

  let inserted = 0;
  let updated = 0;

  for (const post of posts) {
    const payload = {
      slug: String(post.slug || "").trim(),
      title: String(post.title || "").trim(),
      description: String(post.description || "").trim(),
      date: String(post.date || "").trim(),
      content: String(post.content || "").trim(),
      heroImage: post.heroImage ? String(post.heroImage).trim() : undefined,
      videoUrl: post.videoUrl ? String(post.videoUrl).trim() : undefined,
      galleryImages: Array.isArray(post.galleryImages)
        ? post.galleryImages.map((v) => String(v).trim()).filter(Boolean)
        : [],
    };

    if (!payload.slug || !payload.title || !payload.description || !payload.content) {
      console.warn(`Skipping invalid post payload for slug "${payload.slug}"`);
      continue;
    }

    const result = await collection.updateOne(
      { slug: payload.slug },
      { $set: payload },
      { upsert: true }
    );

    if (result.upsertedCount) inserted += 1;
    else if (result.modifiedCount) updated += 1;
  }

  await client.close();
  console.log(`Migration complete. inserted=${inserted}, updated=${updated}`);
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
