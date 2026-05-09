"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Columns2,
  ExternalLink,
  Filter,
  Github,
  List,
  Link as LinkIcon,
  MonitorUp,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  projectCategories,
  projectsData,
} from "@/lib/projects-data";
import type {
  PortfolioProject,
  ProjectCategory,
  ProjectLink,
  ProjectStatus,
} from "@/lib/projects-data";
import LinkPreviewCard from "@/components/ui/link-preview-card";

type ProjectFilter = "All" | ProjectCategory;
type ProjectView = "list" | "columns";

const filters: ProjectFilter[] = ["All", ...projectCategories];
const projectViews: { value: ProjectView; label: string; icon: typeof List }[] = [
  { value: "list", label: "List", icon: List },
  { value: "columns", label: "Columns", icon: Columns2 },
];

const getTechColor = (tech: string): string => {
  switch (tech.toLowerCase()) {
    case "react":
    case "next.js":
    case "react native":
    case "electron":
      return "bg-blue-900/50 text-blue-300 border-blue-500/30";
    case "node.js":
    case "nestjs":
    case "mongodb":
    case "postgresql":
    case "express":
      return "bg-green-900/50 text-green-300 border-green-500/30";
    case "redis":
    case "rabbitmq":
    case "docker":
    case "nginx":
      return "bg-cyan-900/50 text-cyan-300 border-cyan-500/30";
    case "typescript":
      return "bg-sky-900/50 text-sky-300 border-sky-500/30";
    case "tailwind css":
    case "shadcn ui":
    case "material ui":
      return "bg-violet-900/50 text-violet-300 border-violet-500/30";
    default:
      return "bg-gray-800/50 text-gray-300 border-gray-600/30";
  }
};

const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case "Production":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "Completed":
      return "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300";
    case "In Progress":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "Prototype":
      return "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300";
  }
};

const getLinkIcon = (type: ProjectLink["type"]) => {
  switch (type) {
    case "GitHub":
      return Github;
    case "Case Study":
      return BookOpen;
    case "Admin":
      return MonitorUp;
    default:
      return LinkIcon;
  }
};

const isAdminPreview = (url: string) => {
  if (!/^https?:\/\//i.test(url || "")) {
    return false;
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const path = parsed.pathname.toLowerCase();

    return (
      host.startsWith("admin.") ||
      host.includes("admin") ||
      host.includes("dashboard") ||
      path.startsWith("/admin") ||
      path.includes("/dashboard")
    );
  } catch {
    return false;
  }
};

const ProjectCard = ({ project, index }: { project: PortfolioProject; index: number }) => {
  const previewLink = project.links?.find((link) => link.type === "Live Demo");

  return (
    <motion.article
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-900/10 dark:border-white/15 dark:bg-white/[0.055] dark:hover:border-sky-300/40 md:p-5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.025 }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300">
          {project.categories[0]}
        </span>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-950 dark:text-white">
        {project.name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {project.description}
      </p>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Key Features
        </p>
        <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-700 dark:text-slate-300">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-300" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={`rounded border px-2 py-1 text-[11px] font-mono ${getTechColor(
              tech
            )}`}
          >
            {tech}
          </span>
        ))}
      </div>

      {project.links?.length ? (
        <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
          {project.links.map((link) => {
            const Icon = getLinkIcon(link.type);

            return (
              <a
                key={`${project.name}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 transition-colors hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
              >
                <Icon size={15} />
                {link.label}
                <ExternalLink size={13} />
              </a>
            );
          })}
        </div>
      ) : null}

      {previewLink ? (
        <div className="mt-auto pt-4 opacity-0 max-h-0 overflow-hidden translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:translate-y-0">
          <LinkPreviewCard
            url={previewLink.href}
            label="Live Site Preview"
            disabled={isAdminPreview(previewLink.href)}
          />
        </div>
      ) : null}
    </motion.article>
  );
};

const ProjectsContent = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [projectView, setProjectView] = useState<ProjectView>("list");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projectsData;
    }

    return projectsData.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            <Filter size={14} />
            Featured Work
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            SaaS products, utility tools, education platforms, AI-assisted media
            tooling, church tech, HR systems, and mobile marketplace apps.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
            {filteredProjects.length} / {projectsData.length} projects
          </p>
          <div className="inline-flex w-fit rounded-full border border-slate-300 bg-white/60 p-1 dark:border-white/15 dark:bg-white/5">
            {projectViews.map((view) => {
              const isActive = projectView === view.value;
              const Icon = view.icon;

              return (
                <button
                  key={view.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setProjectView(view.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-sky-500/20 text-sky-800 dark:text-sky-100"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-sky-400 bg-sky-500/20 text-sky-800 dark:text-sky-100"
                  : "border-slate-300 bg-white/50 text-slate-600 hover:border-sky-400/60 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div
        className={`grid grid-cols-1 gap-4 ${
          projectView === "list"
            ? "mx-auto max-w-4xl"
            : "xl:grid-cols-2"
        }`}
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProjectComponent = () => {
  return (
    <motion.div
      className="my-8 w-full max-w-7xl rounded-2xl border border-slate-200 bg-slate-100/90 p-4 shadow-2xl dark:border-white/20 dark:bg-slate-900/90 md:my-16 md:rounded-3xl md:p-8 md:supports-[backdrop-filter]:bg-white/10 md:supports-[backdrop-filter]:backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      }}
    >
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Projects
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
          A curated view of full-stack systems, product builds, and platform
          work organized by domain.
        </p>
      </div>
      <ProjectsContent />
    </motion.div>
  );
};

export default ProjectComponent;
