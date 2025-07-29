import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const containerRef = useRef(null);

  // We only initialize scroll hooks if it's a desktop view
  const { scrollYProgress } = useScroll({
    container: isDesktop ? containerRef : undefined,
  });

  // Parallax transforms for desktop
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const sections = [
    {
      id: 'about',
      title: 'About Me',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Hey there, I'm Olaniyi Gideon Olamide, but most folks just call me Olamide. Back in 2016, I kicked off my journey in software development, diving headfirst into a world filled with endless possibilities. Since then, I've been wearing many hats, from freelancing gigs to teaming up with agencies and startups. I've got my hands dirty in all sorts of tech stuff, like frontend and backend development, tinkering with network setups, and even taking the lead on some projects.
          </p>
          <p className="text-gray-300 leading-relaxed">
            I thrive on turning complex ideas into real-world solutions, whether it's tweaking lines of code or crafting seamless user experiences. For me, it's not just about the tech; it's about making a meaningful impact in this ever-changing tech landscape.
          </p>
        </div>
      )
    },
    {
      id: 'experience',
      title: 'Experience',
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
                        <span className="text-gray-400 text-sm mt-2 sm:mt-0">{job.date}</span>
                    </div>
                </div>
            ))}
        </div>
      )
    },
    {
      id: 'skills',
      title: 'Skills',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Frontend</h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'SASS'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Backend</h3>
            <div className="flex flex-wrap gap-3">
              {['Node.js', 'Python', 'PHP', 'MongoDB', 'PostgreSQL', 'MySQL'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-400/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Tools & Others</h3>
            <div className="flex flex-wrap gap-3">
              {['Git', 'Docker', 'AWS', 'Figma', 'Adobe XD', 'Linux'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'projects',
      title: 'Projects',
      content: (
        <div className="space-y-8">
          {[
            {
              title: "E-Commerce Platform",
              desc: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB. Features include payment integration, inventory management, and admin dashboard.",
              tech: ['React', 'Node.js', 'MongoDB', 'Stripe']
            },
            {
              title: "Task Management App",
              desc: "Developed a collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
              tech: ['Vue.js', 'Socket.io', 'PostgreSQL', 'Docker']
            },
            {
              title: "Analytics Dashboard",
              desc: "Created a comprehensive analytics dashboard for tracking business metrics with interactive charts and real-time data visualization.",
              tech: ['Next.js', 'D3.js', 'Python', 'Redis']
            }
          ].map((project, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-white font-semibold">{project.title}</h3>
              <p className="text-gray-300 text-sm">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'credentials',
      title: 'Credentials',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-semibold">BSc. Computer Science</h3>
            <p className="text-blue-300">Osun State University, Osun State, Nigeria</p>
            <p className="text-gray-400 text-sm">2015 - 2019</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4">Certifications</h3>
            <div className="space-y-3">
              {[
                { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services - 2023" },
                { title: "Google Cloud Professional Developer", issuer: "Google Cloud - 2022" },
                { title: "MongoDB Certified Developer", issuer: "MongoDB University - 2021" }
              ].map((cert, index) => (
                <div key={index}>
                  <p className="text-blue-300">{cert.title}</p>
                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      // lg breakpoint in Tailwind is 1024px
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle scroll for desktop's snap effect
  useEffect(() => {
    const handleScroll = () => {
        if (!containerRef.current || !isDesktop) return;
        
        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const sectionIndex = Math.round(scrollTop / containerHeight);
        
        setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    const container = containerRef.current;
    if (container && isDesktop) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isDesktop, sections.length]);

  const handleNavClick = (index, id) => {
    if (isDesktop && containerRef.current) {
        // Desktop scroll behavior
        containerRef.current.scrollTo({
            top: index * containerRef.current.clientHeight,
            behavior: 'smooth'
        });
    } else {
        // Mobile scroll behavior
        const element = document.getElementById(id);
        element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - remains fixed */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          animate={{ background: ['linear-gradient(45deg, #0f172a, #1e293b, #334155)', 'linear-gradient(45deg, #1e293b, #334155, #475569)', 'linear-gradient(45deg, #334155, #475569, #64748b)', 'linear-gradient(45deg, #475569, #334155, #1e293b)', 'linear-gradient(45deg, #0f172a, #1e293b, #334155)'], scale: [1, 1.05, 1, 0.95, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">O</span>
              </div>
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                className="text-gray-300 text-xl md:text-2xl"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                Hello there, I'm Olamide!
              </motion.h1>
              <motion.h2
                className="text-white text-4xl md:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              >
                A Full Stack<br />Developer.
              </motion.h2>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            >
              {['About', 'Experience', 'Skills', 'Projects', 'Credentials'].map((btn, index) => (
                <motion.button
                  key={btn}
                  className="px-5 py-2 border border-gray-500 text-gray-300 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(index, sections[index].id)}
                >
                  {btn}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              className="flex justify-center gap-6 pt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            >
              {[Github, Twitter, Facebook, Instagram, Mail].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5 text-gray-300" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* This button is part of the left pane but positioned absolute */}
          <motion.button
            className="absolute top-6 right-6 lg:top-8 lg:right-8 px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            Let's work
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
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="min-h-screen snap-start flex items-center justify-center p-8 lg:p-12"
                  style={{ y: index === 0 ? y1 : index === 1 ? y2 : y3 }}
                >
                  <motion.div
                    className="w-full max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">{section.title}</h2>
                    <div>{section.content}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            // --- MOBILE VIEW: Standard Flowing Content ---
            <div className="p-6 md:p-10 space-y-16">
              {sections.map((section, index) => (
                <div key={section.id} id={section.id} >
                    <motion.div
                      className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">{section.title}</h2>
                      <div>{section.content}</div>
                    </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Section Indicators - Only show on desktop */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-3 z-10 hidden lg:block">
          {sections.map((section, index) => (
            <motion.div
              key={`indicator-${index}`}
              className={`w-2 h-8 rounded-full cursor-pointer transition-all ${currentSection === index ? 'bg-white' : 'bg-white/30'}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleNavClick(index, section.id)}
            />
          ))}
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