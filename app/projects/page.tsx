import ProjectComponent from "@/components/project-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects",
};

// Main Page Component
export default function ProjectsPage() {
  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      <ProjectComponent />
    </div>
  );
}
