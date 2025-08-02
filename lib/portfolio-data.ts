import {
  Wrench,
  LayoutGrid,
  GraduationCap,
  MessageSquare,
  Home,
} from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  // { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Wrench },
  { href: "/projects", label: "Projects", icon: LayoutGrid },
  { href: "/credentials", label: "Credentials", icon: GraduationCap },
  { href: "/contact", label: "Contact", icon: MessageSquare },
];

export const sectionBackgrounds: { [key: string]: string } = {
  "/": "linear-gradient(45deg, #0f172a, #1e293b)",
  // "/experience": "linear-gradient(45deg, #134e4a, #115e59)",
  "/skills": "linear-gradient(45deg, #2e102f, #4a044e)",
  "/projects": "linear-gradient(45deg, #0f172a, #1e40af)",
  "/credentials": "linear-gradient(45deg, #4c1111, #7f1d1d)",
  "/contact": "linear-gradient(45deg, #3f3f46, #1f2937)",
};

// In your portfolio-data.ts or wherever sectionThemes is defined

export const sectionThemes: {
  [key: string]: {
    text: string;
    border: string;
    hoverBg: string;
    hoverBgSolid: string;
    activeBg: string;
    activeBorder: string;
    // --- NEW: Add properties for the animated glow colors ---
    glowColorDark: string;
    glowColorLight: string;
  };
} = {
  "/": {
    text: "text-blue-400",
    border: "border-blue-500/30",
    hoverBg: "hover:bg-blue-500/10",
    hoverBgSolid: "hover:bg-blue-400/80",
    activeBg: "bg-blue-500/20",
    activeBorder: "border-blue-400",
    // New glow colors
    glowColorDark: "#3b82f6",
    glowColorLight: "#60a5fa",
  },
  "/skills": {
    text: "text-purple-400",
    border: "border-purple-500/30",
    hoverBg: "hover:bg-purple-500/10",
    hoverBgSolid: "hover:bg-purple-400/80",
    activeBg: "bg-purple-500/20",
    activeBorder: "border-purple-400",
    // New glow colors
    glowColorDark: "#8b5cf6", // purple-500
    glowColorLight: "#a78bfa", // purple-400
  },
  "/projects": {
    text: "text-sky-400",
    border: "border-sky-500/30",
    hoverBg: "hover:bg-sky-500/10",
    hoverBgSolid: "hover:bg-sky-400/80",
    activeBg: "bg-sky-500/20",
    activeBorder: "border-sky-400",
    // New glow colors
    glowColorDark: "#0ea5e9", // sky-500
    glowColorLight: "#38bdf8", // sky-400
  },
  "/credentials": {
    text: "text-red-400",
    border: "border-red-500/30",
    hoverBg: "hover:bg-red-500/10",
    hoverBgSolid: "hover:bg-red-400/80",
    activeBg: "bg-red-500/20",
    activeBorder: "border-red-400",
    // New glow colors
    glowColorDark: "#ef4444", // red-500
    glowColorLight: "#f87171", // red-400
  },
  "/contact": {
    text: "text-gray-400",
    border: "border-gray-500/30",
    hoverBg: "hover:bg-gray-500/10",
    hoverBgSolid: "hover:bg-gray-400/80",
    activeBg: "bg-gray-500/20",
    activeBorder: "border-gray-400",
    // New glow colors
    glowColorDark: "#6b7280", // gray-500
    glowColorLight: "#9ca3af", // gray-400
  },
};