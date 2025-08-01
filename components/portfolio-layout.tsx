"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import { SiGithub, SiFacebook, SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { navLinks, sectionBackgrounds } from "@/lib/portfolio-data";
import NavigationLoader from "./navigation-loader";
import ScrollNotification from "./scroll-notification";

const socialLinks = [
  { Icon: SiGithub, href: "https://github.com/your-username" },
  { Icon: FaTwitter, href: "https://twitter.com/your-username" },
  { Icon: SiFacebook, href: "https://facebook.com/your-username" },
  { Icon: SiInstagram, href: "https://instagram.com/your-username" },
  { Icon: Mail, href: "mailto:your.email@example.com" },
];

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const contentRef = useRef<HTMLElement>(null);

  const navState = useRef({
    isPrimed: false,
    targetHref: "",
    scrollAccumulator: 0,
    debounceTimeout: null as NodeJS.Timeout | null,
  });

  const [navNotification, setNavNotification] = useState<{
    visible: boolean;
    direction: "up" | "down";
    pageName: string;
  }>({ visible: false, direction: "down", pageName: "" });

  useEffect(() => {
    setShowScrollIndicator(pathname === "/");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  //   const pageVariants = {
  //     initial: { opacity: 0, x: "-100vw" },
  //     animate: { opacity: 1, x: 0 },
  //     exit: { opacity: 0, x: "100vw" },
  //   };

  useEffect(() => {
    const SCROLL_THRESHOLD = 150;
    const DEBOUNCE_DELAY = 250;

    const resetNavState = () => {
      if (navState.current.debounceTimeout)
        clearTimeout(navState.current.debounceTimeout);
      navState.current.isPrimed = false;
      navState.current.targetHref = "";
      navState.current.scrollAccumulator = 0;
      setNavNotification({ visible: false, direction: "down", pageName: "" });
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating) return;

      if (navState.current.debounceTimeout)
        clearTimeout(navState.current.debounceTimeout);

      const scrollContainer = isDesktop ? contentRef.current : window;
      const contentBody = isDesktop
        ? contentRef.current
        : document.documentElement;
      if (!scrollContainer || !contentBody) return;

      const scrollTop = isDesktop
        ? (scrollContainer as HTMLElement).scrollTop
        : window.scrollY;
      const clientHeight = isDesktop
        ? (scrollContainer as HTMLElement).clientHeight
        : window.innerHeight;
      const scrollHeight = contentBody.scrollHeight;

      const isAtBottom = clientHeight + scrollTop >= scrollHeight - 5;
      const isAtTop = scrollTop <= 0;
      const currentIndex = navLinks.findIndex((link) => link.href === pathname);
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (navState.current.isPrimed) {
        if (
          (isScrollingDown && navNotification.direction === "up") ||
          (isScrollingUp && navNotification.direction === "down")
        ) {
          resetNavState();
          return;
        }
      }

      let shouldPrime = false;

      if (isScrollingDown && isAtBottom && currentIndex < navLinks.length - 1) {
        navState.current.scrollAccumulator += e.deltaY;
        if (navState.current.scrollAccumulator > SCROLL_THRESHOLD) {
          shouldPrime = true;
          if (!navState.current.isPrimed) {
            navState.current.isPrimed = true;
            const nextPage = navLinks[currentIndex + 1];
            navState.current.targetHref = nextPage.href;
            setNavNotification({
              visible: true,
              direction: "down",
              pageName: nextPage.label,
            });
          }
        }
      } else if (isScrollingUp && isAtTop && currentIndex > 0) {
        navState.current.scrollAccumulator += e.deltaY;
        if (navState.current.scrollAccumulator < -SCROLL_THRESHOLD) {
          shouldPrime = true;
          if (!navState.current.isPrimed) {
            navState.current.isPrimed = true;
            const prevPage = navLinks[currentIndex - 1];
            navState.current.targetHref = prevPage.href;
            setNavNotification({
              visible: true,
              direction: "up",
              pageName: prevPage.label,
            });
          }
        }
      } else {
        resetNavState();
      }

      if (shouldPrime) {
        navState.current.debounceTimeout = setTimeout(() => {
          if (navState.current.isPrimed) {
            setIsNavigating(true);
            router.push(navState.current.targetHref);
          }
          resetNavState();
        }, DEBOUNCE_DELAY);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (navState.current.debounceTimeout)
        clearTimeout(navState.current.debounceTimeout);
    };
  }, [pathname, router, isNavigating, isDesktop, navNotification.direction]);

  // Effect to reset navigation lock after page changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    // We only want this behavior on mobile devices, and not for the homepage
    if (!isDesktop && pathname !== "/") {
      // Wait a brief moment for the page transition to start
      const timer = setTimeout(() => {
        const content = document.getElementById("page-content");
        if (content) {
          content.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200); // 200ms delay to ensure a smooth transition

      return () => clearTimeout(timer);
    }
  }, [pathname, isDesktop]);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100%", // next page moves in from the left
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: "100%", // current page moves out to the right
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.7,
  };

  return (
    <div className="min-h-screen relative font-mono">
      {/* Animated Background */}

      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: "#111827",
          backgroundImage: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%),linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 2rem 2rem, 2rem 2rem",
        }}
      >
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundColor: "#111827",
            backgroundImage: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%),linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 2rem 2rem, 2rem 2rem",
          }}
        />
        {/* Layer 1: Thematic Base Color (Driven by section change) */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: sectionBackgrounds[pathname] || sectionBackgrounds["/"],
          }}
          style={{ opacity: 0.4 }}
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

        {/* Layer 3: Subtle "breathing" texture*/}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
          animate={{ opacity: [0.1, 0.8, 0.1] }}
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
        <div className="w-full lg:w-1/2 lg:h-screen lg:fixed lg:top-0 lg:left-0 flex flex-col justify-center items-center p-8 lg:p-12 min-h-screen">
          <motion.div
            className="text-center space-y-6"
            key={pathname}
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
                src="/profile.jpg" // The path to your image in the public folder
                alt="Olaniyi Olamide's profile picture"
                width={128} // Corresponds to w-32 (32 * 4px = 128px)
                height={128} // Corresponds to h-32
                className="h-full w-full object-cover" // Ensures the image fills the circle without distortion
                priority // Tells Next.js to load this image first
              />
            </motion.div>

            <div className="space-y-2">
              <Typewriter
                options={{
                  loop: true,
                  delay: 50,
                  cursorClassName: "text-blue-400",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(200)
                    .typeString(
                      "<span style='color: #60a5fa;'>Hello, </span> I'm <span style='color: #facc15;'>Olamide!.</span>"
                    )
                    .pauseFor(5000)
                    .start();
                }}
              />

              <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight font-code h-28 lg:h-auto">
                <Typewriter
                  options={{
                    loop: true,
                    delay: 50,
                    cursorClassName: "text-blue-400",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(1200)
                      .typeString(
                        'Building with <span style="color: #60a5fa;">React</span> & <span style="color: #ffffff;">Next.js</span>.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Scalable APIs in <span style="color: #84cc16;">Node.js</span>.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Managing <span style="color: #4ade80;">MongoDB</span> & <span style="color: #3b82f6;">PostgreSQL</span>.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Writing Type-Safe <span style="color: #3178c6;">TypeScript</span>.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Deploying on <span style="color: #f59e0b;">AWS</span> & <span style="color: #06b6d4;">Docker</span>.'
                      )
                      .pauseFor(2500)
                      .start();
                  }}
                />
              </h2>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} passHref>
                    <motion.button
                      className={`px-5 py-2 border rounded-full transition-colors duration-300 backdrop-blur-sm text-sm ${
                        isActive
                          ? "border-white bg-white/20 text-white"
                          : "border-gray-500 text-gray-300 hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.button>
                  </Link>
                );
              })}
            </motion.div>

            {/* --- CTA Buttons --- */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              {/* "Let's Work" Button (links to contact page) */}
              <Link href="/contact" passHref>
                <motion.button
                  className="px-6 py-3 bg-white/10 border border-white/30 text-white rounded-full transition-colors duration-300 backdrop-blur-sm hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s Work
                </motion.button>
              </Link>

              {/* "Download Resume" Button */}
              <motion.a
                href="/Olamide-Resume.pdf" // Make sure this matches your file name in /public
                download="Olamide-Gideon-Resume.pdf" // This is the name the file will have when downloaded
                className="px-6 py-3 border border-gray-500 text-gray-300 rounded-full transition-colors duration-300 backdrop-blur-sm hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </motion.div>

            <motion.div
              className="flex justify-center gap-6 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {/* {[SiGithub, FaTwitter, SiFacebook, SiInstagram, Mail].map(
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
              )} */}

              {socialLinks.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={
                    href.includes("mailto") ? "Send an email" : "Visit profile"
                  }
                >
                  <Icon className="w-5 h-5 text-gray-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* --- Right Side (Page Content) --- */}
        <main
          ref={contentRef}
          id="page-content"
          className="w-full lg:w-1/2 lg:ml-[50%] pb-24 lg:pb-0 relative"
        >
          <AnimatePresence>
            <motion.main
              key={pathname}
              className="absolute inset-0"
              variants={pageVariants}
              transition={{
                type: "tween",
                ease: "anticipate",
                duration: 0.7,
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </main>
      </div>
      {/* --- ADDITION 1: Desktop Section Indicators --- */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-4 z-10 hidden lg:flex flex-col">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link key={`indicator-${link.href}`} href={link.href} passHref>
              <div
                className="relative group flex items-center"
                title={link.label}
              >
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {link.label}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
                <motion.div
                  className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${
                    isActive ? "bg-white/20" : "bg-transparent"
                  }`}
                  whileHover={{
                    scale: 1.2,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/60 group-hover:text-white"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* --- ADDITION 2: Mobile Bottom Navigation Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-900/50 backdrop-blur-md block lg:hidden">
        <div className="flex justify-around items-center p-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={`mobile-indicator-${link.href}`}
                href={link.href}
                passHref
              >
                <div className="flex flex-col items-center justify-center gap-1 cursor-pointer w-16 h-14 rounded-lg">
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
                    {link.label.split(" ")[0]}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }} // Bouncing animation
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="w-8 h-8 text-white/50" />
            </motion.div>
            <span className="mt-2 text-xs text-white/50">Scroll Down</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {navNotification.visible && (
          <ScrollNotification
            direction={navNotification.direction}
            pageName={navNotification.pageName}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{isNavigating && <NavigationLoader />}</AnimatePresence>
    </div>
  );
}
