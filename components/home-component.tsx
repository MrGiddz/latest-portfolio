"use client";

import { Metadata } from "next";
import React from "react";
import { motion } from "framer-motion";

// Helper component for syntax highlighting
const Highlight = ({
  children,
  color = "text-cyan-400",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return <span className={`${color} font-medium`}>{children}</span>;
};

// --- RESTRUCTURED AboutContent component with a more natural tone ---
const AboutContent = () => (
  <div className="space-y-6 text-gray-300 leading-relaxed">
    <p>
      Building things with code is my passion. For{" "}
      <Highlight>over 8 years</Highlight>, I&apos;ve been on a journey from
      writing my first lines of code to leading projects as a{" "}
      <Highlight>Senior Software Engineer</Highlight>, always focused on
      architecting high-performance, scalable digital solutions and creating
      seamless user experiences.
    </p>
    <p>
      I am proficient across the full stack, with a deep expertise in frontend
      development using <Highlight>React</Highlight>,{" "}
      <Highlight>Next.js</Highlight>, and <Highlight>TypeScript</Highlight> to
      build dynamic and responsive user interfaces. On the backend, I leverage{" "}
      <Highlight>Nest.js</Highlight>, <Highlight>Node.js</Highlight>, and{" "}
      <Highlight>Java</Highlight> to engineer secure REST APIs and real-time
      communication systems with Web Sockets. My experience also extends to
      native mobile development for both{" "}
      <Highlight color="text-purple-400">Android & iOS</Highlight>.
    </p>
    <p>
      A core part of my skill set involves deploying and managing applications
      on major cloud platforms like{" "}
      <Highlight color="text-yellow-400">AWS</Highlight> and{" "}
      <Highlight color="text-yellow-400">GCP</Highlight>. I have a strong
      command of DevOps practices, using tools like{" "}
      <Highlight>Docker</Highlight> and <Highlight>GitHub Actions</Highlight> to
      create and manage efficient CI/CD pipelines, ensuring smooth and rapid
      deployment cycles.
    </p>
  </div>
);

// --- Experience Data (no changes needed) ---
const experienceData = [
  {
    role: "Senior Full Stack Consultant",
    company: "Ribacka Media AB",
    location: "Stockholm, Sweden (Remote)",
    date: "Feb 2025 - Present",
    points: [
      <>
        Providing full-stack software development and automation expertise as a
        consultant.
      </>,
      <>
        Developing and maintaining scalable applications to meet client needs.
      </>,
      <>
        Collaborating with the client to define project scope and deliver
        high-quality software solutions.
      </>,
    ],
  },
  {
    role: "Full Stack Developer (Tech Lead)",
    company: "SkoolMedia Nigeria Limited",
    location: "Lagos, Nigeria",
    date: "Aug 2022 - Feb 2025",
    points: [
      <>
        Boosted monthly subscriptions by{" "}
        <Highlight color="text-green-400">150%</Highlight> by spearheading
        performance optimizations and rolling out high-demand features.
      </>,
      <>
        Cut feature deployment times by{" "}
        <Highlight color="text-green-400">40%</Highlight> by managing and
        optimizing CI/CD pipelines with GitHub Actions and Docker.
      </>,
      <>
        Accelerated content upload efficiency by{" "}
        <Highlight color="text-green-400">50%</Highlight> by engineering a
        custom admin dashboard.
      </>,
    ],
  },
  {
    role: "IT Manager",
    company: "University of Lagos Guest Houses",
    location: "Lagos, Nigeria",
    date: "Feb 2022 - Aug 2022",
    points: [
      <>
        Saved <Highlight color="text-green-400">2.5 million NGN</Highlight> in
        potential costs by repairing and upgrading a critical HPE ProLiant
        server.
      </>,
      <>
        Increased staff productivity by{" "}
        <Highlight color="text-green-400">20%</Highlight> and boosted online
        sales by <Highlight color="text-green-400">15%</Highlight> through a
        comprehensive IT infrastructure upgrade.
      </>,
    ],
  },
  {
    role: "Full Stack Software Engineer (Tech Lead)",
    company: "Ventech457 Limited",
    location: "Lagos, Nigeria",
    date: "July 2021 - Feb 2022",
    points: [
      <>
        Architected and led the frontend development of responsive, mobile-first
        web applications.
      </>,
      <>
        Engineered real-time data communication with hardware devices by
        building robust APIs and integrating Web Sockets.
      </>,
    ],
  },
  {
    role: "Full Stack Developer",
    company: "VochWave Technologies",
    location: "Abuja, Nigeria",
    date: "Oct 2020 - June 2021",
    points: [
      <>
        Developed scalable web applications and APIs for seamless data transfer
        and system integration.
      </>,
    ],
  },
];

const ExperienceContent = () => (
  <div className="space-y-8">
    {experienceData.map((job, index) => (
      <div key={index} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div>
            <h3 className="text-white font-semibold text-lg">{job.role}</h3>
            <p className="text-blue-300">{job.company}</p>
            <p className="text-gray-400 text-sm">{job.location}</p>
          </div>
          <span className="text-gray-400 text-sm mt-2 sm:mt-0 font-mono">
            {job.date}
          </span>
        </div>
        <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300 text-sm leading-relaxed">
          {job.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export const metadata: Metadata = {
  title: "About",
};

export default function HomePage() {
  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      <motion.div
        className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl my-24"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4,
        }}
      >
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
            About Me
          </h2>
          <AboutContent />
        </section>
        <hr className="my-12 border-gray-600/50" />
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
            Experience
          </h2>
          <ExperienceContent />
        </section>
      </motion.div>
    </div>
  );
}
