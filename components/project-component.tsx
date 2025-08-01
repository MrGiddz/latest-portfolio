"use client";

import React from "react";
import { motion } from "framer-motion";

// Helper component for syntax highlighting within paragraphs
const Highlight = ({
  children,
  color = "text-yellow-400",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return <span className={`${color} font-medium`}>{children}</span>;
};

// Helper function to give tech tags different colors
const getTechColor = (tech: string): string => {
  switch (tech.toLowerCase()) {
    case "react":
    case "next.js":
    case "postgresql":
      return "bg-blue-900/50 text-blue-300 border-blue-500/30";
    case "node.js":
    case "mongodb":
    case "vue.js":
      return "bg-green-900/50 text-green-300 border-green-500/30";
    case "docker":
    case "socket.io":
      return "bg-cyan-900/50 text-cyan-300 border-cyan-500/30";
    case "python":
    case "d3.js":
      return "bg-yellow-900/50 text-yellow-300 border-yellow-500/30";
    default:
      return "bg-gray-800/50 text-gray-300 border-gray-600/30";
  }
};

// Data for Projects with JSX descriptions
const projectsData = [
  {
    title: "E-Commerce Platform",
    desc: (
      <>
        Built a <Highlight>full-stack</Highlight> e-commerce solution with{" "}
        <Highlight color="text-blue-300">React</Highlight>,{" "}
        <Highlight color="text-green-300">Node.js</Highlight>, and{" "}
        <Highlight color="text-green-400">MongoDB</Highlight>. Features include{" "}
        <Highlight>payment integration</Highlight>, inventory management, and an
        admin dashboard.
      </>
    ),
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "Task Management App",
    desc: (
      <>
        Developed a <Highlight>collaborative</Highlight> task management
        application with <Highlight>real-time updates</Highlight>, drag-and-drop
        functionality, and team collaboration features.
      </>
    ),
    tech: ["Vue.js", "Socket.io", "PostgreSQL", "Docker"],
  },
  {
    title: "Analytics Dashboard",
    desc: (
      <>
        Created a comprehensive analytics dashboard for tracking{" "}
        <Highlight>business metrics</Highlight> with interactive charts and{" "}
        <Highlight>real-time data visualization</Highlight>.
      </>
    ),
    tech: ["Next.js", "D3.js", "Python", "Redis"],
  },
];

// Sub-component for the main content
const ProjectsContent = () => (
  <div className="space-y-8">
    {projectsData.map((project, index) => (
      <div key={index} className="space-y-4">
        <h3 className="text-white font-semibold text-lg">{project.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`px-2.5 py-1 rounded text-xs font-mono border ${getTechColor(
                tech
              )}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ProjectComponent = () => {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl my-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4, // 3. The delay ensures the page slides in first
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
        Projects
      </h2>
      <ProjectsContent />
    </motion.div>
  );
};

export default ProjectComponent;
