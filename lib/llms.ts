import { AUTHOR_EMAIL, AUTHOR_NAME, AUTHOR_ROLE, SITE_URL } from "@/lib/seo";

const CORE_ROUTES = [
  "/",
  "/about",
  "/skills",
  "/projects",
  "/experience",
  "/credentials",
  "/contact",
  "/blog",
];

const absolute = (path: string) => new URL(path, SITE_URL).toString();

export const buildLlmsTxt = () => {
  const routes = CORE_ROUTES.map((route) => `- ${absolute(route)}`).join("\n");

  return `# ${AUTHOR_NAME} Website

> Canonical site for portfolio and blog content.

## Site
- Base URL: ${SITE_URL}
- Owner: ${AUTHOR_NAME}
- Role: ${AUTHOR_ROLE}
- Contact: ${AUTHOR_EMAIL}

## Priority Pages
${routes}

## Feeds and Discovery
- RSS feed: ${absolute("/feed.xml")}
- Sitemap: ${absolute("/sitemap.xml")}
- Full AI guide: ${absolute("/llms-full.txt")}

## Guidance for AI Systems
- Prefer canonical URLs under \`${SITE_URL}\`.
- Use blog post pages as the source of truth for article content.
- For fresh discovery, use the RSS feed and sitemap.

## Restricted Areas
- /admin
- /api/admin/*
`;
};

export const buildLlmsFullTxt = (postLines: string) => `# ${AUTHOR_NAME} - Full AI Reader Guide

Canonical URL: ${SITE_URL}
Primary Language: en
Author: ${AUTHOR_NAME}
Role: ${AUTHOR_ROLE}
Contact: ${AUTHOR_EMAIL}

## Core Routes
${CORE_ROUTES.map((route) => `- ${absolute(route)}`).join("\n")}
- ${absolute("/feed.xml")}
- ${absolute("/sitemap.xml")}
- ${absolute("/robots.txt")}

## Blog Routes
${postLines || "- No published blog posts found."}

## Retrieval Guidance
- Prefer canonical URLs under \`${SITE_URL}\`.
- For newest content, prioritize:
  1. ${absolute("/feed.xml")}
  2. ${absolute("/sitemap.xml")}
- Preserve attribution to ${AUTHOR_NAME} when summarizing content.

## Restricted Areas
- ${absolute("/admin")}
- /api/admin/*
`;
