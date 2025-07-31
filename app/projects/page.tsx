import { Metadata } from "next";
import React from "react";

// --- Data for Projects ---
const projectsData = [
  {
    title: "E-Commerce Platform",
    desc: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB. Features include payment integration, inventory management, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "Task Management App",
    desc: "Developed a collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tech: ["Vue.js", "Socket.io", "PostgreSQL", "Docker"],
  },
  {
    title: "Analytics Dashboard",
    desc: "Created a comprehensive analytics dashboard for tracking business metrics with interactive charts and real-time data visualization.",
    tech: ["Next.js", "D3.js", "Python", "Redis"],
  },
];

export const metadata: Metadata = {
  title: "Projects",
};

// --- Sub-component for the main content ---
const ProjectsContent = () => (
  <div className="space-y-8">
    {projectsData.map((project, index) => (
      <div key={index} className="space-y-3">
        <h3 className="text-white font-semibold text-lg">{project.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-gray-700 text-gray-300 rounded text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// --- Main Page Component ---
export default function ProjectsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
          Projects
        </h2>
        <ProjectsContent />
      </div>
    </div>
  );
}
