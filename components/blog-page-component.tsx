"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog-types";

type BlogPageComponentProps = {
  posts: BlogPost[];
};




const BlogPageComponent = ({ posts }: BlogPageComponentProps) => {
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

        <div className="mb-12 rounded-2xl border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-black/20 p-5 md:p-6">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/profile.jpg"
              alt="Olaniyi Olamide"
              width={52}
              height={52}
              className="rounded-full object-cover border border-slate-300 dark:border-white/20"
            />
            <Image
              src="/favicon.png"
              alt="Website logo"
              width={30}
              height={30}
              className="rounded-sm"
            />
          </div>
          <p className="text-slate-700 dark:text-gray-200 leading-relaxed">
            You are on{" "}
            <span className="font-semibold">Olamide Olaniyi&apos;s website</span>.
            This blog shares practical engineering insights from my real work in
            frontend, backend, mobile, and DevOps delivery.
          </p>
        </div>

        <div className="space-y-10">
          {posts.map((post) => (
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
