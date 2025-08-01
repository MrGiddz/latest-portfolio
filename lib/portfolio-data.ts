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

export const sectionThemes: { [key: string]: { text: string; border: string; hoverBg: string; activeBg: string; activeBorder: string; } } = {
  "/": {
    text: "text-blue-400",
    border: "border-blue-500/30",
    hoverBg: "hover:bg-blue-500/10",
    activeBg: "bg-blue-500/20",
    activeBorder: "border-blue-400",
  },
  "/skills": {
    text: "text-purple-400",
    border: "border-purple-500/30",
    hoverBg: "hover:bg-purple-500/10",
    activeBg: "bg-purple-500/20",
    activeBorder: "border-purple-400",
  },
  "/projects": {
    text: "text-sky-400",
    border: "border-sky-500/30",
    hoverBg: "hover:bg-sky-500/10",
    activeBg: "bg-sky-500/20",
    activeBorder: "border-sky-400",
  },
  "/credentials": {
    text: "text-red-400",
    border: "border-red-500/30",
    hoverBg: "hover:bg-red-500/10",
    activeBg: "bg-red-500/20",
    activeBorder: "border-red-400",
  },
  "/contact": {
    text: "text-gray-400",
    border: "border-gray-500/30",
    hoverBg: "hover:bg-gray-500/10",
    activeBg: "bg-gray-500/20",
    activeBorder: "border-gray-400",
  },
};