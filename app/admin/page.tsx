import type { Metadata } from "next";
import AdminBlogManager from "@/components/admin-blog-manager";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard for managing blog posts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminBlogManager />;
}
