"use client"

import React from 'react'
import { motion } from "framer-motion";


const experienceData = [
  {
    role: "Mobile Developer",
    company: "Alabamarketplace.ng",
    location: "Nigeria (Remote)",
    date: "Feb 2026 - Present",
  },
  {
    role: "Full Stack Developer",
    company: "RickbekaMedia",
    location: "Dofollow Media AB, Victor Balcks Väg 187, Stockholm",
    date: "Feb 2025 - Sept 2025",
  },
  {
    role: "Frontend/Full Stack Developer",
    company: "SkoolMedia Nigeria Limited",
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


const ExperienceDesktopContent = () => (
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

const ExperienceMobileContent = () => (
  <div className="space-y-4">
    {experienceData.map((job, index) => (
      <div
        key={index}
        className="rounded-2xl border border-white/15 bg-black/20 p-3.5 sm:p-4 backdrop-blur-sm"
      >
        <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-200">
          {job.date}
        </p>
        <h3 className="mt-3 text-base font-semibold text-white">{job.role}</h3>
        <p className="text-sm text-blue-300">{job.company}</p>
        <p className="mt-1 text-xs text-gray-300">{job.location}</p>
      </div>
    ))}
  </div>
);



const ExperienceComponent = () => {
  return (
    <motion.div
        className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4, // 3. The delay ensures the page slides in first
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
          Experience
        </h2>
        <div className="md:hidden">
          <ExperienceMobileContent />
        </div>
        <div className="hidden md:block">
          <ExperienceDesktopContent />
        </div>
      </motion.div>
  )
}

export default ExperienceComponent
