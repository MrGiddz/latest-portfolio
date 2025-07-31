import React from "react";

// --- Content for About Section ---
const AboutContent = () => (
  <div className="space-y-6">
    <p className="text-gray-300 leading-relaxed">
      Hey there, I&apos;m Olaniyi Gideon Olamide — a full-stack developer with a strong focus on backend architecture and system reliability. With over 5 years of experience, I specialize in building scalable web applications using technologies like Node.js, Express, MongoDB, React, and Next.js.
    </p>
    <p className="text-gray-300 leading-relaxed">
      I&apos;m passionate about turning complex ideas into functional digital products. Whether I&apos;m designing robust APIs, managing cloud deployments, or mentoring teams, I aim to deliver clean, maintainable code and long-term value. My work spans across industries like e-learning, event management, and SaaS platforms — always focused on performance, usability, and business impact.
    </p>
    <p className="text-gray-300 leading-relaxed">
      I enjoy collaborating with product teams, shipping features fast, and continuously learning. If I&apos;m not coding, you&apos;ll find me creating tech videos, exploring new frameworks, or simplifying systems that scale.
    </p>
  </div>
);

// --- Content for Experience Section (Moved from the old file) ---
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


export default function HomePage() {
  return (
    // The min-h-screen here allows the content to be taller than the viewport
    <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl my-24">
        {/* About Me Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
            About Me
          </h2>
          <AboutContent />
        </section>

        {/* Divider */}
        <hr className="my-12 border-gray-600/50" />

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
            Experience
          </h2>
          <ExperienceContent />
        </section>
      </div>
    </div>
  );
}