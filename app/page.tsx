import HomeComponent from "@/components/home-component";
import { Metadata } from "next";
import React from "react";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Senior Software Engineer Portfolio",
  description:
    "Senior software engineer for SaaS application development, end-to-end web/mobile/backend delivery, technical consulting, and SEO optimization.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Olamide Olaniyi | Senior Software Engineer",
    description:
      "Explore featured SaaS and product delivery projects, consulting expertise, and engineering execution across web, mobile, and backend.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "Olamide Olaniyi portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olamide Olaniyi | Senior Software Engineer",
    description:
      "Software engineer offering SaaS builds, end-to-end delivery, team-based execution, and SEO optimization.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeComponent />
    </>
  );
}
