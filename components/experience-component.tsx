"use client"

import React from 'react'
import { motion } from "framer-motion";


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



const ExperienceComponent = () => {
  return (
    <motion.div
        className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
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
        <ExperienceContent />
      </motion.div>
  )
}

export default ExperienceComponent