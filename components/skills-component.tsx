"use client";

import React from "react";
import { motion } from "framer-motion"; // 1. Import motion

// --- Data for Skills ---
const frontendSkills = [
  "React",
  "React Native (Android/iOS)",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "Tailwind CSS",
  "SASS",
];
const backendSkills = [
  "Node.js",
  "Python",
  "PHP",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
];
const toolsSkills = ["Git", "Docker", "AWS", "Figma", "Adobe XD", "Linux"];

// --- Reusable Component for each skill category ---
interface SkillCategoryProps {
  title: string;
  skills: string[];
  colors: string;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  skills,
  colors,
}) => (
  <div>
    <h3 className="text-white font-semibold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <span
          key={skill}
          className={`px-3 py-1 rounded-full text-sm border ${colors}`}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const SkillsComponent = () => {
  return (
    <motion.div
      className="w-full max-w-3xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 pb-10 shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4, // 3. This delay is the key!
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
        Skills
      </h2>
      <div className="space-y-8">
        <SkillCategory
          title="Frontend"
          skills={frontendSkills}
          colors="bg-blue-500/20 text-blue-300 border-blue-400/30"
        />
        <SkillCategory
          title="Backend"
          skills={backendSkills}
          colors="bg-green-500/20 text-green-300 border-green-400/30"
        />
        <SkillCategory
          title="Tools & Others"
          skills={toolsSkills}
          colors="bg-purple-500/20 text-purple-300 border-purple-400/30"
        />
      </div>
    </motion.div>
  );
};

export default SkillsComponent;
