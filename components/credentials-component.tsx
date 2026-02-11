"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Lightbulb } from "lucide-react";
import { Metadata } from "next";

// Helper component for syntax highlighting
const Highlight = ({
  children,
  color = "text-yellow-500 dark:text-yellow-400", // Theme-aware default
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return <span className={`${color} font-medium`}>{children}</span>;
};

const CredentialsContent = () => (
  <div className="space-y-12">
    <section>
      <div className="flex items-center gap-4 mb-4">
        <GraduationCap className="w-8 h-8 text-blue-500 dark:text-blue-300" />
        <h3 className="text-slate-900 dark:text-white font-semibold text-xl">Formal Education</h3>
      </div>
      <div className="pl-12 border-l-2 border-blue-200 dark:border-blue-500/30 ml-4">
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          Bachelor of Science, Computer Science
        </p>
        <p className="text-blue-600 dark:text-blue-300">
          Osun State University, Osun State, Nigeria
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-mono mt-1">2014 - 2018</p>
      </div>
    </section>

    <section>
      <div className="flex items-center gap-4 mb-4">
        <Lightbulb className="w-8 h-8 text-purple-500 dark:text-purple-300" />
        <h3 className="text-slate-900 dark:text-white font-semibold text-xl">
          Continuous Learning
        </h3>
      </div>
      <div className="pl-12 border-l-2 border-purple-200 dark:border-purple-500/30 ml-4">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
          Beyond my formal degree, I am committed to lifelong learning to stay
          at the forefront of technology. My growth is driven by a passion for
          exploring{" "}
          <Highlight color="text-purple-500 dark:text-purple-400">new frameworks</Highlight>,
          actively contributing to{" "}
          <Highlight color="text-purple-500 dark:text-purple-400">personal projects</Highlight>, and
          consistently diving into{" "}
          <Highlight color="text-purple-500 dark:text-purple-400">technical documentation</Highlight>{" "}
          and industry publications.
        </p>
      </div>
    </section>
  </div>
);

const CredentialsMobileContent = () => (
  <div className="space-y-4">
    <section className="rounded-2xl border border-blue-300/40 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-900/10 p-4">
      <div className="mb-3 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        <h3 className="text-slate-900 dark:text-white text-base font-semibold">
          Formal Education
        </h3>
      </div>
      <p className="text-sm font-bold text-slate-900 dark:text-white">
        Bachelor of Science, Computer Science
      </p>
      <p className="text-sm text-blue-700 dark:text-blue-300">
        Osun State University, Osun State, Nigeria
      </p>
      <p className="mt-1 font-mono text-xs text-gray-600 dark:text-gray-400">
        2014 - 2018
      </p>
    </section>

    <section className="rounded-2xl border border-purple-300/40 dark:border-purple-500/30 bg-purple-50/60 dark:bg-purple-900/10 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-300" />
        <h3 className="text-slate-900 dark:text-white text-base font-semibold">
          Continuous Learning
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Beyond my formal degree, I am committed to lifelong learning to stay at
        the forefront of technology. My growth is driven by a passion for
        exploring{" "}
        <Highlight color="text-purple-600 dark:text-purple-400">
          new frameworks
        </Highlight>
        , actively contributing to{" "}
        <Highlight color="text-purple-600 dark:text-purple-400">
          personal projects
        </Highlight>
        , and consistently diving into{" "}
        <Highlight color="text-purple-600 dark:text-purple-400">
          technical documentation
        </Highlight>{" "}
        and industry publications.
      </p>
    </section>
  </div>
);

const CredentialsComponent = () => {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl my-8 md:my-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center font-mono">
        Credentials & Growth
      </h2>
      <div className="md:hidden">
        <CredentialsMobileContent />
      </div>
      <div className="hidden md:block">
        <CredentialsContent />
      </div>
    </motion.div>
  );
};

export const metadata: Metadata = {
    title: "Credentials",
};

export default function CredentialsPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10 pb-10 md:pb-0">
            <CredentialsComponent />
        </div>
    )
}
