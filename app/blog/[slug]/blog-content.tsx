"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

// Define the type for the post prop
interface Post {
  title: string;
  date: string;
  content: React.ReactNode;
}

export default function BlogContent({ post }: { post: Post }) {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-8 shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center font-mono">
        {post.title}
      </h1>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-12">
        <Calendar size={14} />
        <span>{post.date}</span>
      </div>

      {/* Blog content is rendered here */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {post.content}
      </div>
    </motion.div>
  );
}