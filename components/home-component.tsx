"use client";

import { Metadata } from "next";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

// Helper component for syntax highlighting
const Highlight = ({
  children,
  color = "text-cyan-500 dark:text-cyan-400",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return <span className={`${color} font-medium`}>{children}</span>;
};

// --- About Me Section Content ---
const AboutContent = () => (
  <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
    <p>
      Building things with code is my passion. For{" "}
      <Highlight color="text-purple-500 dark:text-purple-400">
        over 8 years
      </Highlight>
      , I&apos;ve been on a journey from writing my first lines of code to
      leading projects as a <Highlight>Senior Software Engineer</Highlight>,
      always focused on architecting high-performance, scalable digital
      solutions and creating seamless user experiences.
    </p>
    <p>
      I am proficient across the full stack, with a deep expertise in frontend
      development using <Highlight>React</Highlight>,{" "}
      <Highlight>Next.js</Highlight>, and <Highlight>TypeScript</Highlight> to
      build dynamic and responsive user interfaces. On the backend, I leverage{" "}
      <Highlight>Nest.js</Highlight>, <Highlight>Node.js</Highlight>, and{" "}
      <Highlight color="text-orange-500 dark:text-orange-400">Java</Highlight>{" "}
      to engineer secure REST APIs and real-time communication systems with Web
      Sockets. My experience also extends to native mobile development for both{" "}
      <Highlight color="text-purple-500 dark:text-purple-400">
        Android & iOS
      </Highlight>
      .
    </p>
    <p>
      I work with several programming languages, including{" "}
      <Highlight>TypeScript</Highlight>, <Highlight>JavaScript</Highlight>,{" "}
      <Highlight>Java</Highlight> and <Highlight>PHP</Highlight>, and I am
      currently learning <Highlight>Python</Highlight>. I constantly keep
      learning new tools and best practices to stay up to date with modern
      software engineering standards.
    </p>
    <div className="rounded-2xl border border-slate-300/70 dark:border-white/20 bg-slate-50/80 dark:bg-white/5 p-4">
      <p className="text-sm uppercase tracking-wide font-semibold text-slate-700 dark:text-gray-200 mb-3">
        Core Languages
      </p>
      <div className="flex flex-wrap gap-2">
        {["TypeScript", "JavaScript", "Java", "PHP", "Python"].map((language) => (
          <span
            key={language}
            className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-xs font-mono text-slate-800 dark:text-gray-200"
          >
            {language}
          </span>
        ))}
      </div>
    </div>
    <p>
      A core part of my skill set involves deploying and managing applications
      on major cloud platforms like{" "}
      <Highlight color="text-yellow-500 dark:text-yellow-400">AWS</Highlight>{" "}
      and{" "}
      <Highlight color="text-yellow-500 dark:text-yellow-400">GCP</Highlight>. I
      have a strong command of DevOps practices, using tools like{" "}
      <Highlight>Docker</Highlight> and <Highlight>GitHub Actions</Highlight> to
      create and manage efficient CI/CD pipelines, ensuring smooth and rapid
      deployment cycles.
    </p>
    <p>
      I also work as a <Highlight>freelance engineer and consultant</Highlight>,
      building <Highlight>SaaS applications</Highlight>, leading software
      projects from <Highlight>discovery to launch and scale</Highlight>, and
      delivering with a <Highlight>trusted cross-functional team</Highlight>{" "}
      when scope requires it. I also help teams with{" "}
      <Highlight>SEO optimization</Highlight>, technical SEO, website
      performance improvements, and architecture reviews.
    </p>
  </div>
);

// --- Experience Data ---
const experienceData = [
  {
    role: "Mobile Developer",
    company: "Alabamarketplace.ng",
    location: "Nigeria (Remote)",
    date: "Feb 2026 - Present",
    points: [
      <>
        Building and maintaining the mobile buyer app with a focus on smooth
        onboarding, checkout reliability, and performance.
      </>,
      <>
        Developing the seller app workflows for product management, order
        handling, and marketplace operations.
      </>,
      <>
        Collaborating with product and engineering stakeholders to ship
        production-ready mobile features across both apps.
      </>,
    ],
  },
  {
    role: "Senior Full Stack Consultant",
    company: "RickbekaMedia",
    location: "Stockholm, Sweden (Remote)",
    date: "Feb 2025 - Sept 2025",
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
    role: "Full Stack Developer <span class='font-bold'>(Tech Lead)</span>",
    company: "Edufirst Nigeria Limited",
    location: "Lagos, Nigeria",
    date: "Aug 2022 - Feb 2025",
    points: [
      <>
        Boosted monthly subscriptions by{" "}
        <Highlight color="text-green-600 dark:text-green-400">150%</Highlight>{" "}
        by spearheading performance optimizations and rolling out high-demand
        features.
      </>,
      <>
        Cut feature deployment times by{" "}
        <Highlight color="text-green-600 dark:text-green-400">40%</Highlight> by
        managing and optimizing CI/CD pipelines with GitHub Actions and Docker.
      </>,
      <>
        Accelerated content upload efficiency by{" "}
        <Highlight color="text-green-600 dark:text-green-400">50%</Highlight> by
        engineering a custom admin dashboard.
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
        Saved{" "}
        <Highlight color="text-green-600 dark:text-green-400">
          2.5 million NGN
        </Highlight>{" "}
        in potential costs by repairing and upgrading a critical HPE ProLiant
        server.
      </>,
      <>
        Increased staff productivity by{" "}
        <Highlight color="text-green-600 dark:text-green-400">20%</Highlight>{" "}
        and boosted online sales by{" "}
        <Highlight color="text-green-600 dark:text-green-400">15%</Highlight>{" "}
        through a comprehensive IT infrastructure upgrade.
      </>,
    ],
  },
  {
    role: "Full Stack Software Engineer <span class='font-bold'>(Tech Lead)</span>",
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

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ExperienceContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Find the correct scroll container when the component mounts
    containerRef.current = document.getElementById("page-content");

    const setViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    setViewport();
    window.addEventListener("resize", setViewport);

    return () => window.removeEventListener("resize", setViewport);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <>
      {isMobileView ? (
        <div className="space-y-4">
          {experienceData.map((job, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-300/70 dark:border-white/20 bg-slate-50/70 dark:bg-white/5 p-4"
            >
              <p className="inline-flex rounded-full border border-blue-300/60 dark:border-blue-400/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-200">
                {job.date}
              </p>
              <h3
                className="mt-3 text-slate-900 dark:text-white font-semibold text-base"
                dangerouslySetInnerHTML={{ __html: job.role }}
              ></h3>
              <p className="text-blue-600 dark:text-blue-300 text-sm">
                {job.company}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                {job.location}
              </p>
              <ul className="list-disc list-inside space-y-1.5 pt-2 text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                {job.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div ref={ref} className="relative">
        {/* The static background timeline bar */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 dark:bg-gray-700/50"></div>
        {/* The animated, colored timeline bar */}
        <motion.div
          className="absolute left-4 top-0 w-0.5 bg-blue-500 dark:bg-blue-400"
          style={{ height, opacity }}
        />

        <div className="space-y-12">
          {experienceData.map((job, index) => (
            <motion.div
              key={index}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              // Tell the animation to use the correct scroll container as its viewport
              viewport={{ root: containerRef, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              {/* The dot on the timeline */}
              {/* <div className="absolute -left-0.5 top-1.5 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-200 dark:border-gray-700">
                  <Briefcase className="w-4 h-4 text-blue-500 dark:text-blue-300" />
                </div>
              </div> */}

              {/* Job Content */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div>
                    <h3
                      className="text-slate-900 dark:text-white font-semibold text-lg"
                      dangerouslySetInnerHTML={{ __html: job.role }}
                    ></h3>
                    <p className="text-blue-600 dark:text-blue-300">
                      {job.company}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {job.location}
                    </p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm mt-2 sm:mt-0 font-mono">
                    {job.date}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 pt-2 pl-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {job.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      )}
    </>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen w-full p-4 md:p-10 md:pl-0 pb-10 md:pb-0">
      <motion.div
        className="w-full max-w-3xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-6 shadow-2xl my-24"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4,
        }}
      >
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center font-mono">
            About Me
          </h2>
          <AboutContent />
        </section>
        <hr className="my-12 border-gray-300 dark:border-gray-600/50" />
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center font-mono">
            Experience
          </h2>
          <ExperienceContent />
        </section>
        {/* <hr className="my-12 border-gray-300 dark:border-gray-600/50" /> */}
        {/* <section className="">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center font-mono">
            Testimonials
          </h2>
          <AnimatedTestimonials testimonials={testimonials} />
        </section> */}
      </motion.div>
    </div>
  );
}
