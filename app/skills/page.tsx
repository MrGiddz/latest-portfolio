import SkillsComponent from "@/components/skills-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <SkillsComponent />
    </div>
  );
}
