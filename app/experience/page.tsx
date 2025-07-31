import { Metadata } from "next";
import React from "react";

// You can define the data right here or import it from your data library
const experienceData = [
  {
    role: "Frontend/Full Stack Developer",
    company: "ShockMedia Nigeria Limited",
    location: "Ikoyi, Lagos, Nigeria",
    date: "Aug 2022 - Present",
  },
  {
    role: "IT Manager - University of Lagos",
    company: "Houses and Conference Centre",
    location: "Yaba, Lagos, Nigeria",
    date: "Feb 2022 - Aug 2022",
  },
  {
    role: "Full Stack Software Engineer",
    company: "Ventech457 Limited",
    location: "Maryland, Lagos State, Nigeria",
    date: "July 2021 - Jan 2022",
  },
  {
    role: "Full Stack Developer",
    company: "VochWave Technologies",
    location: "Maryland, Lagos State, Nigeria",
    date: "Oct 2020 - June 2021",
  },
];

export const metadata: Metadata = {
  title: "Experience",
};

// This sub-component keeps the main return statement clean
const ExperienceContent = () => (
  <div className="space-y-8">
    {experienceData.map((job, index) => (
      <div key={index} className="space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div>
            <h3 className="text-white font-semibold">{job.role}</h3>
            <p className="text-blue-300">{job.company}</p>
            <p className="text-gray-400 text-sm">{job.location}</p>
          </div>
          <span className="text-gray-400 text-sm mt-2 sm:mt-0">
            {job.date}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default function ExperiencePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-jetbrains">
          Experience
        </h2>
        <ExperienceContent />
      </div>
    </div>
  );
}