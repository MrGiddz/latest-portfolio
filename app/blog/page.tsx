import React from "react";
import { Metadata } from "next";
import BlogComponent from "@/components/blog-page-component";

const BlogPage = () => {
  return <BlogComponent />;
};

export const metadata: Metadata = {
  title: "Blog",
};

export default BlogPage;
