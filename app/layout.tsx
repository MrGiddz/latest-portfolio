import type { Metadata, Viewport } from "next";
import { Fira_Code, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import PortfolioLayout from "@/components/portfolio-layout";

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
  display: 'swap',
  variable: '--font-fira-code',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

// --- METADATA ---
export const metadata: Metadata = {
  title: {
    default: "Olamide Olaniyi | Senior Software Engineer",
    template: "%s | Olamide Olaniyi",
  },
  description:
    "Explore the portfolio of Olaniyi Olamide, a Senior Software Engineer based in Lagos, Nigeria, specializing in scalable backend systems with Node.js & Nest.js, and modern frontend frameworks like React & Next.js.",
  keywords: [
    "Olaniyi Olamide", "Gideon Olaniyi", "Senior Software Engineer", "Full Stack Developer Nigeria",
    "Backend Developer Lagos", "React Developer", "Node.js", "Nest.js", "MongoDB", "Next.js",
    "Software Engineer Portfolio", "AWS", "Docker", "TypeScript"
  ],
  authors: [{ name: "Olaniyi Gideon Olamide", url: "https://mideolaniyi.com" }],
  creator: "Olaniyi Gideon Olamide",
  manifest: "/site.webmanifest",
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL("https://mideolaniyi.com"),
  openGraph: {
    title: "Olamide Olaniyi - Senior Software Engineer",
    description: "Building scalable software with Node.js, Nest.js, React, and cloud technologies.",
    url: "https://mideolaniyi.com",
    siteName: "Olamide Olaniyi",
    images: [
      {
        url: "/og-image.jpg",
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
    description: "Explore Olamide Olaniyi's portfolio - building web apps with React, Node.js, and more.",
    images: ["/og-image.jpg"],
    creator: "@mide_niyi",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceMono.variable} ${firaCode.variable}`}>
      <body>
        <PortfolioLayout>{children}</PortfolioLayout>
      </body>
    </html>
  );
}
