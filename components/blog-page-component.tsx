"use client";

import React from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";




const BlogPageComponent = () => {
  return (
      <div className="min-h-screen w-full p-6 md:p-10">
      <motion.div
        className="w-full max-w-3xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-8 shadow-2xl my-24"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4,
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center font-mono">
          My Blog
        </h2>

        <div className="space-y-10">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} passHref>
              <motion.div
                className="group block"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-500 dark:text-blue-400 mt-4 font-semibold">
                  <span>Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default BlogPageComponent