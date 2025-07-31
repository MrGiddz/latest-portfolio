import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import PortfolioLayout from "@/components/portfolio-layout";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Olamide's Portfolio",
  description: "A Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceMono.variable}`}>
      <body>
        {/* Wrap all pages with your PortfolioLayout here */}
        <PortfolioLayout>{children}</PortfolioLayout>
      </body>
    </html>
  );
}