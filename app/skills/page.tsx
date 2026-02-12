import SkillsComponent from "@/components/skills-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills across frontend, backend, mobile, cloud infrastructure, and software architecture.",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 md:pl-0 mb-5">
      <SkillsComponent />
    </div>
  );
}
