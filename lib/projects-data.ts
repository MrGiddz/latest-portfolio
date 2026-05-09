export const projectCategories = [
  "SaaS",
  "AI Tools",
  "Utility Apps",
  "Mobile Apps",
  "EdTech",
  "Church Tech",
  "HR Tech",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "Production"
  | "Prototype";

export type ProjectLink = {
  label: string;
  href: string;
  type: "Live Demo" | "GitHub" | "Case Study" | "Admin" | "Store" | "Reference";
};

export type PortfolioProject = {
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  categories: ProjectCategory[];
  status: ProjectStatus;
  links?: ProjectLink[];
};

export const projectsData: PortfolioProject[] = [
  {
    name: "Workspace HR",
    description:
      "A full HR management platform for organizations that need structured people operations, company setup, approvals, payroll, and admin visibility.",
    features: [
      "Employee, department, branch, and region management",
      "Onboarding, offboarding, leave, payroll, and performance workflows",
      "Service desk, organization structure, and employee self-service",
      "Tenant/company management with custom roles and permissions",
      "Operational dashboards for HR teams and executives",
    ],
    techStack: ["React", "TypeScript", "TanStack", "NestJS", "PostgreSQL", "TypeORM", "RBAC"],
    categories: ["HR Tech", "SaaS"],
    status: "In Progress",
  },
  {
    name: "Convertify Pro",
    description:
      "A microservices-based media and file conversion platform with dedicated services for uploads, processing, notifications, and health monitoring.",
    features: [
      "API service for uploads, job submission, status, and downloads",
      "Worker service for image, PDF, audio, and video conversion queues",
      "Notification service with live conversion progress",
      "Redis/RabbitMQ-backed job dispatch and status tracking",
      "Scalable service layout with PostgreSQL records and admin monitoring",
    ],
    techStack: ["Node.js", "TypeScript", "Express", "Redis", "RabbitMQ", "PostgreSQL", "Prisma", "Socket.IO"],
    categories: ["SaaS", "Utility Apps"],
    status: "In Progress",
  },
  {
    name: "ChurchCast AI",
    description:
      "A desktop-first worship and media control tool for churches, built around Bible projection, sermon/media workflows, OBS output, and AI-assisted discovery.",
    features: [
      "Bible verse search, phrase matching, and live lower-third output",
      "Song lyric, program graphic, preview, and live control surfaces",
      "OBS browser-source output and native OBS plugin scaffold",
      "AI-assisted verse matching with ASR-ready desktop media tooling",
      "Electron packaging, output routing, and church media workflow automation",
    ],
    techStack: ["Electron", "React", "TypeScript", "Node.js", "Vite", "Zustand", "Vosk", "Sherpa-ONNX"],
    categories: ["AI Tools", "Church Tech"],
    status: "In Progress",
  },
  {
    name: "KrestCore Hub",
    description:
      "A modular church operations platform for managing people, ministries, communications, giving, media, and administrative workflows.",
    features: [
      "Member, family, attendance, department, and event management",
      "Giving/tithes, reports, media library, and communication workflows",
      "Forms, surveys, sermon administration, and child check-in tooling",
      "Role-based access control with configurable dashboard modules",
    ],
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "Mongoose", "NextAuth.js", "Cloudinary", "Paystack"],
    categories: ["Church Tech", "SaaS"],
    status: "Production",
    links: [
      {
        label: "Admin Preview",
        href: "https://admin.rccg-cjp-admin.vercel.app",
        type: "Admin",
      },
    ],
  },
  {
    name: "WordFinder / Word Game Tool",
    description:
      "A word utility and game companion for finding valid words, browsing dictionary entries, improving writing, and checking word scores.",
    features: [
      "Dictionary A-Z navigation with word lookup and browsing",
      "Scrabble-style scoring, anagram checks, and word suggestions",
      "Synonyms, antonyms, sentence writing, grammar cleanup, and tone tools",
      "Captions, word counter, writing utilities, and responsive layouts",
    ],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "API Integration", "TanStack Query"],
    categories: ["Utility Apps"],
    status: "Completed",
  },
  {
    name: "TakeUp LMS",
    description:
      "A learning management system for secondary school students with practical academic workflows and a polished student-friendly dashboard.",
    features: [
      "Login, student dashboard, course access, and assignment workflows",
      "Certificates, support, settings, and learning resources",
      "Backend-powered learning data and role-aware views",
      "Premium interface designed for realistic school usage",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Backend API", "Database", "Tailwind CSS"],
    categories: ["EdTech", "SaaS"],
    status: "Prototype",
  },
  {
    name: "Alaba Marketplace",
    description:
      "A mobile-first marketplace experience connecting buyers and sellers with product discovery, authentication, and native shopping flows.",
    features: [
      "React Native buyer and seller apps for iOS and Android",
      "Product listings, marketplace browsing, and product media flows",
      "Authentication, buyer onboarding, seller workflows, and order operations",
      "NestJS backend with PostgreSQL, JWT auth, Swagger, and notification support",
    ],
    techStack: ["React Native", "TypeScript", "Redux Toolkit", "Node.js", "NestJS", "PostgreSQL", "Mobile Authentication"],
    categories: ["Mobile Apps", "SaaS"],
    status: "Production",
  },
  {
    name: "Watermark App",
    description:
      "A mobile-friendly image utility for adding text and image watermarks with a clean preview/edit workflow and export-ready controls.",
    features: [
      "Text and image watermark support",
      "Font style selection, positioning, opacity, and edit controls",
      "Canvas-style preview workflow for accurate placement",
      "Responsive editor with export and download flows",
    ],
    techStack: ["React", "TypeScript", "TanStack Start", "Canvas/Image Processing", "Tailwind CSS", "Zustand"],
    categories: ["Utility Apps"],
    status: "Completed",
  },
  {
    name: "Podcast App",
    description:
      "A clean media-focused podcast platform for discovering shows, browsing episodes, and playing audio across curated categories.",
    features: [
      "Podcast discovery, featured shows, and category browsing",
      "Episode detail views with clean metadata presentation",
      "Audio playback interface designed for media consumption",
      "Responsive layouts for mobile and desktop listening",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    categories: ["SaaS"],
    status: "Prototype",
  },
  {
    name: "FMT Nigeria Limited Commerce Platform",
    description:
      "An end-to-end commerce and marketing platform combining a public website, product catalog, shop, admin tools, and customer operations.",
    features: [
      "Marketing pages, product catalog, packages, and promotions",
      "Order, customer, subscriber, and campaign management",
      "Cloudinary media handling, newsletter popup, and settings diagnostics",
      "Paystack checkout, WhatsApp Meta API, SMTP, and admin operations",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Paystack API", "Cloudinary"],
    categories: ["SaaS"],
    status: "Production",
    links: [
      { label: "Website", href: "https://fmtlimited.ng", type: "Live Demo" },
      { label: "Shop", href: "https://shop.fmtlimited.ng", type: "Live Demo" },
    ],
  },
  {
    name: "RCCG Ceaseless Joy Church Website",
    description:
      "A production church website powered by backend-managed content for pages, events, announcements, forms, ministries, and news.",
    features: [
      "Dynamic pages, announcements, events, ministries, and blog content",
      "Backend-driven form builder for contact and membership workflows",
      "Responsive church website experience with motion and CMS integration",
      "Dedicated public-facing experience for media, events, and community updates",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ShadCN UI", "Framer Motion", "CMS Integration"],
    categories: ["Church Tech"],
    status: "Production",
    links: [
      {
        label: "Website",
        href: "https://rccgceaselessjoy.com",
        type: "Live Demo",
      },
      {
        label: "Client Preview",
        href: "https://rccg-cjp-client.vercel.app/",
        type: "Live Demo",
      },
    ],
  },
  {
    name: "Exampadi E-Learning Ecosystem",
    description:
      "A multi-platform e-learning ecosystem spanning mobile, desktop, web, admin tools, backend services, and DevOps deployment.",
    features: [
      "React Native mobile app, Electron desktop app, and Next.js web app",
      "Admin panel for content and learning operations",
      "Docker, Nginx, PM2, and DigitalOcean deployment workflow",
      "Learning product architecture across multiple platforms",
    ],
    techStack: ["React Native", "Electron", "Next.js", "Node.js", "Docker", "Nginx", "PM2", "DigitalOcean"],
    categories: ["EdTech", "Mobile Apps"],
    status: "Production",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.exampadi&pcampaignid=web_share",
        type: "Store",
      },
      { label: "Website", href: "https://exampadi.ng/", type: "Live Demo" },
    ],
  },
  {
    name: "ERPGo Business ERP Deployment",
    description:
      "A hosted enterprise ERP deployment supporting accounting, project management, HRM, CRM, and point-of-sale operations.",
    features: [
      "Server setup, hosting, domain, SSL, and production configuration",
      "ERP modules for accounting, HRM, CRM, projects, and POS",
      "Environment configuration and production-readiness hardening",
      "Operational support for business management workflows",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Linux Server", "Web Hosting", "SSL Configuration"],
    categories: ["SaaS", "HR Tech"],
    status: "Production",
    links: [
      { label: "Website", href: "http://modamaestros.com", type: "Live Demo" },
      {
        label: "Product Reference",
        href: "https://codecanyon.net/item/erpgo-all-in-one-business-erp-with-project-account-hrm-crm-pos/33263435",
        type: "Reference",
      },
    ],
  },
  {
    name: "Bettor in Green & Sportsbook Casino Apps",
    description:
      "Sportsbook and casino app work focused on personalized promos, onboarding, affiliate routing, subscriptions, and backend billing behavior.",
    features: [
      "Personalized sportsbook promos with state-based filtering",
      "Signup status tracking, onboarding flows, and affiliate links",
      "Stripe subscription logic for roles, plans, and upgrades",
      "Frontend and backend improvements for production betting products",
    ],
    techStack: ["Next.js", "React", "Material UI", "Prisma", "Stripe API", "Node.js", "Railway"],
    categories: ["SaaS"],
    status: "Production",
    links: [
      {
        label: "Website",
        href: "https://app.bettoringreen.com/",
        type: "Live Demo",
      },
    ],
  },
  {
    name: "OmololasTalksTV Cultural Storytelling Platform",
    description:
      "A content-driven platform for African storytelling with dynamic blog posts, video content, team management, comments, and analytics.",
    features: [
      "Dynamic hero carousel with image and video support",
      "API-driven blog, video library, categories, and similar posts",
      "Embedded YouTube playback, comments, contact forms, and analytics",
      "Backend-managed storytelling and cultural media content",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ShadCN UI", "Zod", "CMS Integration"],
    categories: ["SaaS"],
    status: "Production",
    links: [
      {
        label: "Website",
        href: "https://omololastalkstv.com",
        type: "Live Demo",
      },
    ],
  },
  {
    name: "Omolola Talks TV Hub",
    description:
      "A headless CMS and content dashboard for managing posts, media, users, comments, newsletters, videos, analytics, and site theming.",
    features: [
      "Post editor, categories, tags, and Cloudinary media library",
      "RBAC, invitations, user administration, and moderation queues",
      "YouTube integration, newsletter management, and analytics",
      "Theme customization and API-driven content operations",
    ],
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "Mongoose", "NextAuth.js", "Cloudinary", "Recharts"],
    categories: ["SaaS"],
    status: "Production",
  },
];
