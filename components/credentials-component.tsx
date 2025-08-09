"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Lightbulb } from "lucide-react";

const Highlight = ({
  children,
  color = "text-yellow-400",
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
        <GraduationCap className="w-8 h-8 text-blue-300" />
        <h3 className="text-white font-semibold text-xl">Formal Education</h3>
      </div>
      <div className="pl-12 border-l-2 border-blue-500/30 ml-4">
        <p className="text-lg font-bold text-white">
          Bachelor of Science, Computer Science
        </p>
        <p className="text-blue-300">
          Osun State University, Osun State, Nigeria
        </p>
        <p className="text-gray-400 text-sm font-mono mt-1">2014 - 2018</p>
      </div>
    </section>

    <section>
      <div className="flex items-center gap-4 mb-4">
        <Lightbulb className="w-8 h-8 text-purple-300" />
        <h3 className="text-white font-semibold text-xl">
          Continuous Learning
        </h3>
      </div>
      <div className="pl-8 border-l-2 border-purple-500/30 ml-4">
        <p className="text-gray-300 leading-relaxed text-sm">
          Beyond my formal degree, I am committed to lifelong learning to stay
          at the forefront of technology. My growth is driven by a passion for
          exploring{" "}
          <Highlight color="text-purple-400">new frameworks</Highlight>,
          actively contributing to{" "}
          <Highlight color="text-purple-400">personal projects</Highlight>, and
          consistently diving into{" "}
          <Highlight color="text-purple-400">technical documentation</Highlight>{" "}
          and industry publications.
        </p>
      </div>
    </section>
  </div>
);

const CredentialsComponent = () => {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl my-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center font-mono">
        Credentials & Growth
      </h2>
      <CredentialsContent />
    </motion.div>
  );
};

export default CredentialsComponent;
