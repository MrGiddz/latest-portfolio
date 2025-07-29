import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});


const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-space-mono',
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
    // Apply the font variables to the entire app
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}