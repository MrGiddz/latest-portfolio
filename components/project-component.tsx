"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import FallbackImage from "@/components/ui/fallback-image";

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
    title: "FMT Nigeria Limited – Commerce + Marketing Platform",
    image: "/FMT%20NIGERIA%20WEBSITE.png",
    desc: (
      <>
        Built the end-to-end digital platform for{" "}
        <Highlight>FMT Nigeria Limited</Highlight>, spanning a marketing site,
        product catalog, and a full admin operating system. The build includes{" "}
        <Highlight>multi-page content management</Highlight> for services,
        projects, testimonials, and blog posts, alongside a dedicated shop with{" "}
        <Highlight>products, packages, and discount promotions</Highlight>.
        <br />
        <br />
        The admin suite delivers <Highlight>order and customer management</Highlight>,
        marketing campaigns to subscribers/customers with unsubscribe flows,
        a configurable newsletter popup, and a <Highlight>site media manager</Highlight>
        with hero slides and Cloudinary uploads. Payments are wired via{" "}
        <Highlight>Paystack</Highlight>, with Cloudinary, SMTP, and WhatsApp Meta
        credentials managed from a settings dashboard (including diagnostics) for
        fast operations and audit-ready workflows.
      </>
    ),
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "MongoDB",
      "Mongoose",
      "Paystack API",
      "Cloudinary",
      "Nodemailer",
      "WhatsApp Meta API",
      "Termii",
    ],
    liveLink: "https://fmtlimited.ng",
    sourceLink: "https://shop.fmtlimited.ng",
  },
  {
    title: "ERPGo – All-in-One Business ERP Deployment",
    image: "/erpgo.png", // add a screenshot of the ERP dashboard to /public
    desc: (
      <>
        Deployed and hosted a full-featured enterprise ERP solution,
        <Highlight>ERPGo – All-in-One Business ERP</Highlight>, designed to
        support core business operations including{" "}
        <Highlight>Accounting</Highlight>,{" "}
        <Highlight>Project Management</Highlight>, <Highlight>HRM</Highlight>,{" "}
        <Highlight>CRM</Highlight>, and{" "}
        <Highlight>Point of Sale (POS)</Highlight>.
        <br />
        <br />
        My role focused on procurement, deployment, configuration, and
        production hosting of the system. I handled server setup, environment
        configuration, domain and SSL management, and ensured the application
        was production-ready, stable, and secure. This project demonstrates
        strong experience in{" "}
        <Highlight>enterprise software deployment</Highlight>,{" "}
        <Highlight>system administration</Highlight>, and{" "}
        <Highlight>hosting management</Highlight>.
      </>
    ),
    tech: [
      "Laravel (PHP)",
      "MySQL",
      "ERP System",
      "Linux Server",
      "Web Hosting",
      "Domain & SSL Configuration",
      "Production Deployment",
    ],
    liveLink:
      "http://modamaestros.com",
    sourceLink:
      "https://codecanyon.net/item/erpgo-all-in-one-business-erp-with-project-account-hrm-crm-pos/33263435",
  },
  {
    title: "KrestCore Hub - All-in-One Church Management System",
    image: "/rccg-client.png", // Replace with the actual path to your project image
    desc: (
      <>
        Developed a comprehensive, modular dashboard application,{" "}
        <Highlight>KrestCore Hub</Highlight>, from the ground up using Next.js
        and a modern tech stack. The system is designed as a powerful{" "}
        <Highlight>Church Management System</Highlight> for RCCG Ceaseless Joy
        Area HQ, automating administrative tasks and enhancing community
        engagement.
        <br />
        <br />
        Key contributions include building a complete{" "}
        <Highlight>Role-Based Access Control (RBAC)</Highlight> system, a
        dynamic <Highlight>form builder</Highlight> with submission management,
        and a rich content management system for sermons and news. I integrated
        multiple third-party services, including <Highlight>Paystack</Highlight>{" "}
        for online giving, <Highlight>Termii</Highlight> for SMS notifications,
        and <Highlight>Cloudinary</Highlight> for media asset management. The
        platform also features automated cron jobs for sending birthday and
        event reminders, a full-screen announcement system, and an inbox for
        direct communication with the public.
      </>
    ),
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "ShadCN UI",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
      "Google Genkit (for AI)",
      "Nodemailer",
      "Cloudinary API",
      "Paystack API",
      "Termii SMS API",
    ],
    liveLink: "https://admin.rccg-cjp-admin.vercel.app", // Replace with the live URL
    sourceLink: "https://admin.rccg-cjp-admin.vercel.app", // Replace with the source code URL
  },
  {
    title: "RCCG Ceaseless Joy Church - A Modern Church Website",
    image: "/rccg-admin.png",
    desc: (
      <>
        Developed a complete, production-ready website for a church
        organization,{" "}
        <Highlight color="text-purple-400">Beacon Church</Highlight>. The
        platform features a dynamic and engaging user experience built with a
        modern tech stack. The entire application is driven by a backend API,
        allowing for dynamic content management of pages, events, announcements,
        blog posts, and site configuration. Key features include a{" "}
        <Highlight>dynamic announcement system</Highlight> (supporting both
        banner and full-screen modal styles), a{" "}
        <Highlight>backend-driven form builder</Highlight> for creating various
        forms like membership and contact-us, and dedicated pages for
        ministries, events, and news.
      </>
    ),
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "Vercel",
      "CMS Integration",
    ],
    liveLink: "https://rccgceaselessjoy.com",
    sourceLink: "https://rccg-cjp-client.vercel.app/",
  },
  {
    title: "Bettor in Green & Sportsbook Casino Apps",
    image: "/big.png",
    desc: (
      <>
        Contributed to the development of{" "}
        <Highlight color="text-green-400">Bettor in Green</Highlight> and{" "}
        <Highlight color="text-green-400">Sportsbook Casino</Highlight> apps
        while working with{" "}
        <Highlight color="text-purple-400">
          RickbekaMedia, Stockholm Sweden
        </Highlight>
        . I was responsible for building and integrating{" "}
        <Highlight>personalized sportsbook promos</Highlight>, including{" "}
        <Highlight color="text-yellow-400">state-based filtering</Highlight>,
        user <Highlight color="text-cyan-400">onboarding flows</Highlight>,{" "}
        <Highlight color="text-cyan-400">signup status tracking</Highlight>, and
        dynamic affiliate link handling. I also optimized backend subscription
        logic with <Highlight>Stripe</Highlight> to manage user roles, plans,
        and upgrades in real time, ensuring seamless user experience.
      </>
    ),
    tech: [
      "Next.js",
      "React",
      "Material UI",
      "Prisma",
      "Stripe API",
      "Node.js",
      "Railway",
    ],
    liveLink: "https://app.bettoringreen.com/",
    sourceLink: "#",
  },
  {
    title: "Exampadi - E-Learning Ecosystem",
    image: "/1.png",
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
    liveLink:
      "https://play.google.com/store/apps/details?id=com.exampadi&pcampaignid=web_share",
    sourceLink: "https://exampadi.ng/",
  },
  {
    title: "OmololasTalksTv - A Cultural Storytelling Platform",
    image: "/omolola-client.png",
    desc: "Developed a complete, production-ready website for 'Yoruba Narratives', a platform dedicated to preserving and promoting African heritage through authentic storytelling. The entire application is driven by a backend API, allowing for dynamic content management of blog posts, videos, categories, team members, and the hero banner. Key features include a dynamic hero section with a carousel supporting both images and videos, a comprehensive blog with featured posts, recent articles, and category-based similar posts, an API-driven video library with an embedded YouTube player, and an interactive comment system with an admin approval workflow. The site also includes a robust contact form and basic analytics tracking.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "React Hook Form",
      "Zod",
      "Lucide React",
      "Embla Carousel",
      "CMS Integration",
    ],
    liveLink: "https://omololastalkstv.com",
    sourceLink: "#",
  },

  {
    title: "Omolola Talks TV Hub - Headless CMS & Content Dashboard",
    image: "/omolola-admin.png",
    desc: "Developed a full-featured, production-ready headless CMS and admin dashboard designed to manage a modern blog and its associated content. This powerful application provides a central hub for content creation, media management, user administration, and community engagement. The dashboard is built with a robust, API-driven architecture, enabling seamless integration with any front-end application. Key features include a comprehensive post management system with a rich text editor, dynamic categories, and tags; a complete media library with Cloudinary integration for image and video uploads; a full user and role-based access control (RBAC) system with email invitations; a content moderation queue for blog comments; an inbox for managing contact form submissions; integration with the YouTube API to fetch and manage channel videos; a complete newsletter and subscriber management system; and a customizable theming engine for appearance. The dashboard also includes a dedicated analytics section to track website traffic, top pages, referrers, and visitor geography.",
    tech: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "NextAuth.js",
      "MongoDB",
      "Mongoose",
      "Genkit (AI)",
      "Cloudinary",
      "Nodemailer",
      "Recharts",
      "Zod",
      "React Hook Form",
    ],
    liveLink: "#",
    sourceLink: "#",
  },
];

const ProjectCard = ({
  project,
  compact = false,
  isExpanded = false,
  onToggleExpanded,
}: {
  project: (typeof projectsData)[number];
  compact?: boolean;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}) => (
  <div className="space-y-4">
    <div className="group relative rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
      <div
        className={`overflow-hidden ${
          compact ? "h-52" : "h-56 md:h-64"
        }`}
      >
        <FallbackImage
          src={project.image}
          alt={`${project.title} screenshot`}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          fallbackSrc="/images/test-img.png"
          fallbackText="Project image unavailable"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></div>
    </div>

    <h3
      className={`text-slate-900 dark:text-white font-semibold ${
        compact ? "text-lg" : "text-xl pt-2"
      }`}
    >
      {project.title}
    </h3>
    {compact ? (
      <div className="rounded-xl border border-slate-300/70 dark:border-white/15 bg-white/40 dark:bg-white/5 p-3">
        <button
          type="button"
          onClick={onToggleExpanded}
          className="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Hide Project Details" : "About Project"}
        </button>
        {isExpanded ? (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.desc}
          </p>
        ) : null}
      </div>
    ) : (
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {project.desc}
      </p>
    )}
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
        className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-colors"
      >
        <LinkIcon size={16} />
        Live Demo
      </a>
      <a
        href={project.sourceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <FaGithub size={16} />
        Source Code
      </a>
    </div>
  </div>
);

const ProjectsContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null
  );
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  useEffect(() => {
    // Find the correct scroll container when the component mounts
    setScrollContainer(document.getElementById("page-content"));
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const toggleExpandedProject = (index: number) => {
    setExpandedProjects((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  return (
    <>
      <div className="md:hidden space-y-4">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="rounded-2xl border border-slate-200 dark:border-white/20 bg-slate-100/80 dark:bg-white/5 p-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
          >
            <ProjectCard
              project={project}
              compact
              isExpanded={expandedProjects.includes(index)}
              onToggleExpanded={() => toggleExpandedProject(index)}
            />
          </motion.div>
        ))}
      </div>

      <div ref={ref} className="relative hidden md:block">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 dark:bg-gray-700/50"></div>
        <motion.div
          className="absolute left-4 top-0 w-0.5 bg-sky-500 dark:bg-sky-400"
          style={{ height, opacity }}
        />

        <div className="space-y-12">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              className="relative pl-12"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const ProjectComponent = () => {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto bg-slate-100/90 dark:bg-slate-900/90 md:supports-[backdrop-filter]:bg-white/10 md:supports-[backdrop-filter]:backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl my-8 md:my-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center font-mono">
        Projects
      </h2>
      <ProjectsContent />
    </motion.div>
  );
};

export default ProjectComponent;
