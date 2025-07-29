"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  User,
  Briefcase,
  Wrench,
  LayoutGrid,
  GraduationCap,
} from "lucide-react";
import { SiGithub, SiFacebook, SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

const containerRef = useRef<HTMLDivElement>(null);

  // We only initialize scroll hooks if it's a desktop view
  const { scrollYProgress } = useScroll({
    container: isDesktop ? containerRef : undefined,
  });

  // Parallax transforms for desktop
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const sections = useMemo(
    () => [
      {
        id: "about",
        title: "About Me",
        icon: User,
        content: (
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              Hey there, I&apos;m Olaniyi Gideon Olamide, but most folks just
              call me Olamide. Back in 2016, I kicked off my journey in software
              development, diving headfirst into a world filled with endless
              possibilities. Since then, I&apos;ve been wearing many hats, from
              freelancing gigs to teaming up with agencies and startups.
              I&apos;ve got my hands dirty in all sorts of tech stuff, like
              frontend and backend development, tinkering with network setups,
              and even taking the lead on some projects.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I thrive on turning complex ideas into real-world solutions,
              whether it&apos;s tweaking lines of code or crafting seamless user
              experiences. For me, it&apos;s not just about the tech; it&apos;s
              about making a meaningful impact in this ever-changing tech
              landscape.
            </p>
          </div>
        ),
      },
      {
        id: "experience",
        title: "Experience",
        icon: Briefcase,
        content: (
          <div className="space-y-8">
            {/* Experience Items - Using a map for cleaner code */}
            {[
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
            ].map((job, index) => (
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
        ),
      },
      {
        id: "skills",
        title: "Skills",
        icon: Wrench,
        content: (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Next.js",
                  "Vue.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "SASS",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Backend</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Node.js",
                  "Python",
                  "PHP",
                  "MongoDB",
                  "PostgreSQL",
                  "MySQL",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-400/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Tools & Others</h3>
              <div className="flex flex-wrap gap-3">
                {["Git", "Docker", "AWS", "Figma", "Adobe XD", "Linux"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "projects",
        title: "Projects",
        icon: LayoutGrid,
        content: (
          <div className="space-y-8">
            {[
              {
                title: "E-Commerce Platform",
                desc: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB. Features include payment integration, inventory management, and admin dashboard.",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
              },
              {
                title: "Task Management App",
                desc: "Developed a collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
                tech: ["Vue.js", "Socket.io", "PostgreSQL", "Docker"],
              },
              {
                title: "Analytics Dashboard",
                desc: "Created a comprehensive analytics dashboard for tracking business metrics with interactive charts and real-time data visualization.",
                tech: ["Next.js", "D3.js", "Python", "Redis"],
              },
            ].map((project, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-white font-semibold">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "credentials",
        title: "Credentials",
        icon: GraduationCap,
        content: (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold">
                BSc. Computer Science
              </h3>
              <p className="text-blue-300">
                Osun State University, Osun State, Nigeria
              </p>
              <p className="text-gray-400 text-sm">2015 - 2019</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-semibold mb-4">Certifications</h3>
              <div className="space-y-3">
                {[
                  {
                    title: "AWS Certified Solutions Architect",
                    issuer: "Amazon Web Services - 2023",
                  },
                  {
                    title: "Google Cloud Professional Developer",
                    issuer: "Google Cloud - 2022",
                  },
                  {
                    title: "MongoDB Certified Developer",
                    issuer: "MongoDB University - 2021",
                  },
                ].map((cert, index) => (
                  <div key={index}>
                    <p className="text-blue-300">{cert.title}</p>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const sectionBackgrounds = [
    // 0: About (The original, default dark slate)
    "linear-gradient(45deg, #0f172a, #1e293b)",

    // 1: Experience (A deep, professional teal)
    "linear-gradient(45deg, #134e4a, #115e59)",

    // 2: Skills (A rich, muted plum/violet)
    "linear-gradient(45deg, #2e102f, #4a044e)",

    // 3: Projects (A focused, deep blue that complements the base)
    "linear-gradient(45deg, #0f172a, #1e40af)",

    // 4: Credentials (A distinguished, deep maroon)
    "linear-gradient(45deg, #4c1111, #7f1d1d)",
  ];

  const cardVariants = {
    inactive: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
      transition: { duration: 0.5 },
    },
    active: {
      borderColor: "rgba(255, 255, 255, 0.5)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
      transition: {
        duration: 0.5,
        // This will make the glow pulse gently
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  useEffect(() => {
    const checkScreenSize = () => {
      // lg breakpoint in Tailwind is 1024px
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle scroll for desktop's snap effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isDesktop) return;

      const container = containerRef.current as HTMLElement;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const sectionIndex = Math.round(scrollTop / containerHeight);

      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    const container = containerRef.current as HTMLElement | null;
    if (container && isDesktop) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [isDesktop, sections.length]);

  useEffect(() => {
    if (isDesktop) return; // Only run this logic on mobile

    const handleMobileScroll = () => {
      let activeIndex = 0;
      // Find which section is closest to the top of the viewport
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // A section is considered active if its top is in the upper half of the screen
          if (rect.top <= window.innerHeight / 2) {
            activeIndex = i;
            break; // Exit the loop once the active section is found
          }
        }
      }
      setCurrentSection(activeIndex);
    };

    // Add the event listener for mobile
    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    // Call it once on load to set the initial section
    handleMobileScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, [isDesktop, sections]);

   const scrollToSection = useCallback((index: number) => {
      if (!sections[index]) return;
      const { id } = sections[index];

      if (isDesktop && containerRef.current) {
            (containerRef.current as HTMLDivElement).scrollTo({
          top: index * containerRef.current.clientHeight,
          behavior: "smooth",
        });
      } else {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, [isDesktop, sections]
  );

// Effect to sync URL hash on scroll (using replaceState)
  useEffect(() => {
    const timer = setTimeout(() => {
      const newHash = `#${sections[currentSection].id}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [currentSection, sections]);

  // Effect to handle initial load from URL and back/forward buttons
  useEffect(() => {
    const handlePageLoadAndHistory = () => {
      const sectionId = window.location.hash.substring(1);
      const targetIndex = sections.findIndex((sec) => sec.id === sectionId);
      if (targetIndex !== -1) {
        scrollToSection(targetIndex);
      } else {
        // Optional: scroll to the top if hash is invalid or not present
        scrollToSection(0);
      }
    };
    
    // Handle initial page load
    const loadTimer = setTimeout(handlePageLoadAndHistory, 100);
    
    // Handle back/forward browser buttons
    window.addEventListener("popstate", handlePageLoadAndHistory);
    
    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener("popstate", handlePageLoadAndHistory);
    };
  }, [sections, scrollToSection]);

  const handleNavClick = (index: number, id: string) => {
    if (isDesktop && containerRef.current) {
      // Desktop scroll behavior
      (containerRef.current as HTMLDivElement).scrollTo({
        top: index * containerRef.current.clientHeight,
        behavior: "smooth",
      });
    } else {
      // Mobile scroll behavior
      const element = document.getElementById(id);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - remains fixed */}

      <div className="fixed inset-0 -z-10">
        {/* Layer 1: Thematic Base Color (Driven by section change) */}
        <motion.div
          className="absolute inset-0"
          animate={{ background: sectionBackgrounds[currentSection] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Layer 2: NEW! Continuously moving light blobs */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)",
              "radial-gradient(ellipse at 30% 80%, rgba(255,255,255,0.12) 0%, transparent 35%)",
              "radial-gradient(ellipse at 80% 90%, rgba(255,255,255,0.10) 0%, transparent 40%)",
              "radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.18) 0%, transparent 35%)",
              "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)",
            ],
          }}
          transition={{
            duration: 25, // Very slow and subtle
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Layer 3: Subtle "breathing" texture (from before) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* --- Left Side (Profile) --- */}
        {/* Becomes the top section on mobile. Fixed on desktop. */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:fixed lg:top-0 lg:left-0 flex flex-col justify-center items-center p-8 lg:p-12 min-h-screen">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/olamide-profile.jpeg" // The path to your image in the public folder
                alt="Olaniyi Olamide's profile picture"
                width={128} // Corresponds to w-32 (32 * 4px = 128px)
                height={128} // Corresponds to h-32
                className="h-full w-full object-cover" // Ensures the image fills the circle without distortion
                priority // Tells Next.js to load this image first
              />
            </motion.div>

            <div className="space-y-2">
              <TypeAnimation
                sequence={["Hello, I'm Olamide!"]}
                wrapper="h1"
                speed={50}
                cursor={false} // No cursor on the first line
                className="text-gray-300 text-xl md:text-2xl"
              />

              <TypeAnimation
                sequence={[
                  1200, // Wait 1.2s after the first line is typed
                  "A Full Stack Developer.",
                  2000, // Keep the text for 2s
                  "A Problem Solver.",
                  2000,
                  "A Tech Enthusiast.",
                  2000,
                ]}
                wrapper="h2"
                speed={50}
                cursor={true}
                repeat={Infinity}
                className="text-white text-4xl md:text-5xl font-bold leading-tight font-mono"
              />
            </div>
            <motion.div
              className="flex flex-wrap gap-4 justify-center font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {["About", "Experience", "Skills", "Projects", "Credentials"].map(
                (btn, index) => (
                  <motion.button
                    key={btn}
                    className="px-5 py-2 border border-gray-500 text-gray-300 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm text-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(index, sections[index].id)}
                  >
                    {btn}
                  </motion.button>
                )
              )}
            </motion.div>

            <motion.div
              className="flex justify-center gap-6 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[SiGithub, FaTwitter, SiFacebook, SiInstagram, Mail].map(
                (Icon, index) => (
                  <motion.div
                    key={index}
                    className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5 text-gray-300" />
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* This button is part of the left pane but positioned absolute */}
          <motion.button
            className="absolute top-6 right-6 lg:top-8 lg:right-8 px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all backdrop-blur-sm font-mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            Let&apos;s work
          </motion.button>
        </div>

        {/* --- Right Side (Content) --- */}
        {/* Offset on desktop. Renders conditionally based on screen size. */}
        <div className="w-full lg:w-1/2 lg:ml-[50%]">
          {isDesktop ? (
            // --- DESKTOP VIEW: Scroll Snap Container ---
            <div
              ref={containerRef}
              className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="min-h-screen snap-start flex items-center justify-center p-8 lg:p-12"
                  style={{ y: index === 0 ? y1 : index === 1 ? y2 : y3 }}
                >
                  <motion.div
                    className="w-full max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
                    variants={cardVariants}
                    initial="inactive"
                    animate={currentSection === index ? "active" : "inactive"}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
                      {section.title}
                    </h2>
                    <div>{section.content}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            // --- MOBILE VIEW: Standard Flowing Content ---
            <div className="w-full">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  // This wrapper for each section is now full-screen height and centers its content.
                  className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10"
                >
                  <motion.div
                    className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
                    variants={cardVariants}
                    initial="inactive"
                    animate={currentSection === index ? "active" : "inactive"}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
                      {section.title}
                    </h2>
                    <div>{section.content}</div>
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section Indicators - Only show on desktop */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-4 z-10 hidden lg:block">
          {sections.map((section, index) => {
            // Get the icon component from the section object
            const Icon = section.icon;

            return (
              // Use a 'group' for the hover tooltip effect
              <div
                key={`indicator-${section.id}`}
                className="relative group flex items-center"
              >
                {/* Tooltip that appears on the left */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {section.title}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>

                {/* The Icon Button */}
                <motion.div
                  className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${
                    currentSection === index
                      ? "bg-white/20" // A subtle background for the active icon
                      : "bg-transparent"
                  }`}
                  whileHover={{
                    scale: 1.2,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  onClick={() => handleNavClick(index, section.id)}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      currentSection === index
                        ? "text-white" // Active icon is bright white
                        : "text-white/60 group-hover:text-white" // Inactive icon becomes bright on hover
                    }`}
                    strokeWidth={currentSection === index ? 2.5 : 2}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* --- Mobile Bottom Navigation Bar --- */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-900/50 backdrop-blur-md block lg:hidden">
          <div className="flex justify-around items-center p-2">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = currentSection === index;
              return (
                <div
                  key={`mobile-indicator-${section.id}`}
                  className="flex flex-col items-center justify-center gap-1 cursor-pointer w-16 h-14 rounded-lg"
                  onClick={() => handleNavClick(index, section.id)}
                >
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  />
                  <span
                    className={`text-xs transition-all duration-300 ${
                      isActive ? "text-white font-bold" : "text-white/60"
                    }`}
                  >
                    {/* We use just the first word of the title for a cleaner look */}
                    {section.title.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
