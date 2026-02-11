import type { Metadata, Viewport } from "next";
import { Fira_Code, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import PortfolioLayout from "@/components/portfolio-layout";
import { ThemeProvider } from "@/components/theme-provider";
import {
  AUTHOR_NAME,
  AUTHOR_ROLE,
  AUTHOR_SOCIALS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

// Font Definitions (assuming you might use them later)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// --- METADATA ---
export const metadata: Metadata = {
  title: {
    default: "Olamide Olaniyi | Senior Software Engineer",
    template: "%s | Olamide Olaniyi",
  },
  description:
    "Explore the portfolio of Olaniyi Olamide, a multi-talented Senior Software Engineer building high-performance web apps, native mobile apps for Android & iOS, and robust backend systems with Node.js, React, and Java.",
  keywords: [
    "Olaniyi Olamide",
    "Gideon Olaniyi",
    "Senior Software Engineer",
    "Full Stack Developer Nigeria",
    "Mobile App Developer",
    "Android Developer",
    "iOS Developer",
    "Java Developer",
    "Backend Developer Lagos",
    "React Developer",
    "Node.js",
    "Nest.js",
    "MongoDB",
    "Next.js",
    "Software Engineer Portfolio",
    "AWS",
    "Docker",
    "TypeScript",
  ],
  authors: [{ name: "Olaniyi Gideon Olamide", url: "https://mideolaniyi.com" }],
  creator: "Olaniyi Gideon Olamide",
  applicationName: SITE_NAME,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Olamide Olaniyi - Senior Software Engineer",
    description:
      "Portfolio of a multi-talented software engineer building seamless digital experiences across web, mobile (Android/iOS), and backend with Node.js, React, and Java.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: new URL(DEFAULT_OG_IMAGE, SITE_URL).toString(),
        width: 1200,
        height: 630,
        alt: "Olamide Olaniyi - Senior Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olamide Olaniyi - Senior Software Engineer",
    description:
      "Explore the portfolio of a multi-talented software engineer building web apps, mobile apps, and backend systems with React, Node.js, and Java.",
    images: [new URL(DEFAULT_OG_IMAGE, SITE_URL).toString()],
    creator: "@mide_niyi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    jobTitle: AUTHOR_ROLE,
    url: SITE_URL,
    image: new URL("/profile.jpg", SITE_URL).toString(),
    sameAs: AUTHOR_SOCIALS,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: new URL("/favicon.png", SITE_URL).toString(),
    sameAs: AUTHOR_SOCIALS,
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceMono.variable} ${firaCode.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PortfolioLayout>{children}</PortfolioLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
