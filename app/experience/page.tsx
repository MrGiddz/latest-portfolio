import ExperienceComponent from "@/components/experience-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Experience",
};


export default function ExperiencePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      {/* 2. Wrap the content card in a motion.div */}
     <ExperienceComponent/>
    </div>
  );
}