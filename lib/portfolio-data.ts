import {
  User,
  Briefcase,
  Wrench,
  LayoutGrid,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

export const navLinks = [
  { href: "/", label: "About", icon: User },
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