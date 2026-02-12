import ProjectComponent from "@/components/project-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software projects with implementation details, architecture decisions, and delivered outcomes.",
  alternates: {
    canonical: "/projects",
  },
};

// Main Page Component
export default function ProjectsPage() {
  return (
    <div className="w-full flex flex-col items-center p-4 md:p-10 md:pl-0 mb-5">
      <ProjectComponent />
    </div>
  );
}
