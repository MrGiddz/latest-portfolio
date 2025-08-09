"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { LayoutGrid, Link as LinkIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";

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

// Data for Projects with images and links

// Data for Projects with images and links
const projectsData = [
  {
    title: "Exampadi - E-Learning Ecosystem",
    image: "/images/project-elearning.png",
    desc: (
      <>
        Architected and developed a comprehensive e-learning ecosystem for{" "}
        <Highlight color="text-green-400">Edufirst Nigeria Limited</Highlight>.
        My contributions spanned the entire stack, including a{" "}
        <Highlight color="text-purple-400">React Native</Highlight> mobile app,
        a <Highlight>React & Electron</Highlight> desktop app, a{" "}
        <Highlight>Next.js</Highlight> web version, and a{" "}
        <Highlight>React & Ant Design</Highlight> admin panel. I also handled
        the full DevOps lifecycle, deploying the backend on{" "}
        <Highlight color="text-yellow-400">Digital Ocean VPS</Highlight> using{" "}
        <Highlight color="text-cyan-400">Nginx</Highlight>,{" "}
        <Highlight color="text-cyan-400">Docker</Highlight>, and{" "}
        <Highlight color="text-cyan-400">PM2</Highlight>.
      </>
    ),
    tech: [
      "React Native",
      "Electron",
      "Next.js",
      "Ant Design",
      "Styled-Components",
      "Node.js",
      "Docker",
      "Nginx",
      "PM2",
      "Digital Ocean",
    ],
    liveLink: "#",
    sourceLink: "#",
  },
  {
    title: "Mobile Banking App",
    image: "/images/project-banking.png",
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
    image: "/images/project-iot.png",
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
    image: "/images/project-analytics.png",
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
    image: "/images/project-cloud.png",
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

// --- UPDATED ProjectsContent component with animated timeline ---
const ProjectsContent = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* The static background timeline bar */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-700/50"></div>
      {/* The animated, colored timeline bar */}
      <motion.div
        className="absolute left-4 top-0 w-0.5 bg-sky-400"
        style={{ height, opacity }}
      />

      <div className="space-y-12">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="relative pl-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {/* The dot on the timeline */}
            <div className="absolute -left-0.5 top-1.5 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                <LayoutGrid className="w-4 h-4 text-sky-300" />
              </div>
            </div>

            {/* Project Content */}
            <div className="space-y-4">
              <div className="group relative rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/800x450/111827/e2e8f0?text=Image+Not+Found";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></div>
              </div>

              <h3 className="text-white font-semibold text-xl pt-2">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.desc}
              </p>
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
                  <FaGithub size={16} />
                  Source Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

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
