"use client";

import React from "react";
import Image from "next/image";
import { Github, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

const Highlight = ({
  children,
  color = "text-yellow-400",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return <span className={`${color} font-medium`}>{children}</span>;
};

const getTechColor = (tech: string): string => {
  switch (tech.toLowerCase()) {
    case "react":
    case "next.js":
    case "react native":
      return "bg-blue-900/50 text-blue-300 border-blue-500/30";
    case "node.js":
    case "mongodb":
    case "express":
      return "bg-green-900/50 text-green-300 border-green-500/30";
    case "docker":
    case "nginx":
      return "bg-cyan-900/50 text-cyan-300 border-cyan-500/30";
    case "typescript":
      return "bg-sky-900/50 text-sky-300 border-sky-500/30";
    default:
      return "bg-gray-800/50 text-gray-300 border-gray-600/30";
  }
};

const projectsData = [
  {
    title: "Exampadi - E-Learning Platform",
    image:
      "https://images.unsplash.com/photo-1600195077072-83c7c51f27f3?auto=format&fit=crop&w=800&q=80",
    desc: (
      <>
        Led the development of a <Highlight>full-stack</Highlight> e-learning
        solution. Implemented features like{" "}
        <Highlight>HLS video streaming</Highlight>, real-time notifications, and
        a custom admin dashboard that boosted content upload efficiency by{" "}
        <Highlight color="text-green-400">50%</Highlight>.
      </>
    ),
    tech: ["Next.js", "Nest.js", "TypeScript", "MongoDB", "Docker"],
    liveLink: "#",
    sourceLink: "#",
  },
  {
    title: "Mobile Banking App",
    image:
      "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?auto=format&fit=crop&w=800&q=80",
    desc: (
      <>
        Developed a secure and intuitive{" "}
        <Highlight color="text-purple-400">cross-platform mobile app</Highlight>{" "}
        for personal finance management. Integrated with banking APIs for
        real-time transaction updates and balance tracking.
      </>
    ),
    tech: ["React Native", "TypeScript", "Node.js", "Express"],
    liveLink: "#",
    sourceLink: "#",
  },
  {
    title: "Real-Time IoT Dashboard",
    image:
      "https://images.unsplash.com/photo-1614064641938-eb7c7c3de3d6?auto=format&fit=crop&w=800&q=80",
    desc: (
      <>
        Engineered a dashboard for visualizing data from hardware devices in{" "}
        <Highlight>real-time</Highlight>. Built robust APIs and integrated{" "}
        <Highlight color="text-cyan-400">Web Sockets</Highlight> for seamless,
        low-latency communication.
      </>
    ),
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    liveLink: "#",
    sourceLink: "#",
  },
  {
    title: "SaaS Analytics Platform",
    image:
      "https://images.unsplash.com/photo-1634036607881-d6c7f8e3f417?auto=format&fit=crop&w=800&q=80",
    desc: (
      <>
        Created a comprehensive analytics dashboard for tracking{" "}
        <Highlight>business metrics</Highlight>. Features interactive charts and{" "}
        <Highlight>real-time data visualization</Highlight> to provide
        actionable insights for business growth.
      </>
    ),
    tech: ["Next.js", "D3.js", "Python", "Redis"],
    liveLink: "#",
    sourceLink: "#",
  },
  {
    title: "Cloud Infrastructure Automation",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?auto=format&fit=crop&w=800&q=80",
    desc: (
      <>
        Designed and implemented a complete{" "}
        <Highlight color="text-yellow-400">CI/CD pipeline</Highlight> for a
        microservices-based application. Utilized{" "}
        <Highlight color="text-cyan-400">Docker</Highlight> for containerization
        and automated deployments to{" "}
        <Highlight color="text-orange-400">AWS</Highlight>, reducing deployment
        times by <Highlight color="text-green-400">40%</Highlight>.
      </>
    ),
    tech: ["AWS", "Docker", "GitHub Actions", "Nginx"],
    liveLink: "#",
    sourceLink: "#",
  },
];
const ProjectsContent = () => (
  <div className="space-y-12">
    {projectsData.map((project, index) => (
      <div key={index} className="space-y-4">
        <div className="group relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/20 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-glow"></div>
          <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md transition duration-300 group-hover:scale-[1.01] group-hover:shadow-xl">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/800x450/111827/e2e8f0?text=Image+Not+Found";
              }}
            />
          </div>
        </div>

        <h3 className="text-white font-semibold text-xl pt-2">
          {project.title}
        </h3>
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
        <div className="flex items-center gap-4 pt-2">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <LinkIcon size={16} />
            Live Demo
          </a>
          <a
            href={project.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Github size={16} />
            Source Code
          </a>
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
        delay: 0.4,
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
