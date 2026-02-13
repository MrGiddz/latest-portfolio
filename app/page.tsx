import HomeComponent from "@/components/home-component";
import { Metadata } from "next";
import React from "react";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Olamide Olaniyi | Product-Focused Software Consultant",
  description:
    "I help founders and teams turn ideas into reliable digital products that grow revenue and improve customer experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Olamide Olaniyi | Product-Focused Software Consultant",
    description:
      "Explore how I help businesses launch and improve web and mobile products with clear strategy, strong execution, and measurable outcomes.",
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
    title: "Olamide Olaniyi | Product-Focused Software Consultant",
    description:
      "Software consultant helping businesses ship better products, faster.",
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
