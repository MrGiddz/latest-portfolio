"use client"

import React from "react";
import { motion } from "framer-motion";

// You can create a component for your card content to keep it clean
const AboutContent = () => (
  <div className="space-y-6">
    <p className="text-gray-300 leading-relaxed">
      Hey there, I&apos;m Olaniyi Gideon Olamide — a full-stack developer with a strong focus on backend architecture and system reliability. With over 5 years of experience, I specialize in building scalable web applications using technologies like Node.js, Express, MongoDB, React, and Next.js.
    </p>
    <p className="text-gray-300 leading-relaxed">
      I&apos;m passionate about turning complex ideas into functional digital products. Whether I&apos;m designing robust APIs, managing cloud deployments, or mentoring teams, I aim to deliver clean, maintainable code and long-term value. My work spans across industries like e-learning, event management, and SaaS platforms — always focused on performance, usability, and business impact.
    </p>
    <p className="text-gray-300 leading-relaxed">
      I enjoy collaborating with product teams, shipping features fast, and continuously learning. If I&apos;m not coding, you&apos;ll find me creating tech videos, exploring new frameworks, or simplifying systems that scale.
    </p>
  </div>
);


export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <motion.div
        className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
          About Me
        </h2>
        <AboutContent />
      </motion.div>
    </div>
  );
}
