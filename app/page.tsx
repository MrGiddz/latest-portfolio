import HomeComponent from "@/components/home-component";
import { Metadata } from "next";
import React from "react";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Senior Software Engineer portfolio showcasing production-grade web, mobile, and backend systems built with React, Next.js, Node.js, and Java.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Olamide Olaniyi | Senior Software Engineer",
    description:
      "Explore featured projects, technical skills, and engineering experience across web, mobile, and backend.",
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
      "Explore featured projects, technical skills, and engineering experience across web, mobile, and backend.",
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
