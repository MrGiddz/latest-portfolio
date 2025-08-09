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
    "Explore the portfolio of Olaniyi Olamide, a multi-talented Senior Software Engineer building high-performance web apps, native mobile apps for Android & iOS, and robust backend systems with Node.js, React, and Java.",
  keywords: [
    "Olaniyi Olamide", "Gideon Olaniyi", "Senior Software Engineer", "Full Stack Developer Nigeria",
    "Mobile App Developer", "Android Developer", "iOS Developer", "Java Developer",
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
    description: "Portfolio of a multi-talented software engineer building seamless digital experiences across web, mobile (Android/iOS), and backend with Node.js, React, and Java.",
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
    description: "Explore the portfolio of a multi-talented software engineer building web apps, mobile apps, and backend systems with React, Node.js, and Java.",
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
