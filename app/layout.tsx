import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import PortfolioLayout from "@/components/portfolio-layout";



const firaCode = Fira_Code({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-fira-code',
});


export const metadata: Metadata = {
  title: {
    default: "Olamide's Portfolio | Full Stack Developer",
    template: "%s | Olamide's Portfolio",
  },
  description:
    "Explore the portfolio of Olaniyi Olamide, a Full Stack Developer specializing in scalable backend systems, modern frontend frameworks, and cloud-based solutions.",
  keywords: [
    "Olaniyi Olamide",
    "Gideon Olaniyi",
    "Full Stack Developer",
    "Backend Developer",
    "React Developer",
    "Node.js",
    "MongoDB",
    "Next.js",
    "Software Engineer",
    "Portfolio"
  ],
  metadataBase: new URL("https://mideolaniyi.com"),

  openGraph: {
    title: "Olaniyi Olamide - Full Stack Developer",
    description:
      "Building scalable software with Node.js, MongoDB, React, and cloud technologies.",
    url: "https://mideolaniyi.com", 
    siteName: "Olaniyi Olamide",
    images: [
      {
        url: "/olamide-profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Olaniyi Olamide Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Olaniyi Olamide - Full Stack Developer",
    description:
      "Explore Olaniyi Olamide's portfolio - building web apps with React, Node.js, MongoDB, and more.",
    images: ["/olamide-profile.jpeg"], 
    creator: "@mide_niyi", 
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable}`}>
      <body>
        {/* Wrap all pages with your PortfolioLayout here */}
        <PortfolioLayout>{children}</PortfolioLayout>
      </body>
    </html>
  );
}