export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  heroImage?: string;
  videoUrl?: string;
  galleryImages?: string[];
  source?: "default" | "custom";
};
