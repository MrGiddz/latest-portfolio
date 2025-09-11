/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  navLinks,
  sectionBackgrounds,
  sectionThemes,
} from "@/lib/portfolio-data";
import NavigationLoader from "./navigation-loader";
import ScrollNotification from "./scroll-notification";
import CustomCursor from "./custom-cursor";
import { FaPhone } from "react-icons/fa6";
import NavigationHint from "./navigation-hint";
import { FlipWords } from "./ui/flip-words";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { FloatingDock } from "./ui/floating-dock";
import { ThemeSwitcher } from "./theme-switcher";
import NavigationButton from "./bottom-navigation";

const socialLinks = [
  {
    title: "GitHub",
    icon: <SiGithub className="w-5 h-5 text-gray-300" />,
    href: "https://github.com/mrgiddz",
  },
  {
    title: "Twitter",
    icon: <FaTwitter className="w-5 h-5 text-gray-300" />,
    href: "https://twitter.com/mide_niyi",
  },
  {
    title: "Facebook",
    icon: <SiFacebook className="w-5 h-5 text-gray-300" />,
    href: "https://facebook.com/midelaniyi",
  },
  {
    title: "Instagram",
    icon: <SiInstagram className="w-5 h-5 text-gray-300" />,
    href: "https://www.instagram.com/mide_niyi",
  },
  {
    title: "Phone",
    icon: <FaPhone className="w-5 h-5 text-gray-300" />,
    href: "tel:+2348026406566",
  },
  {
    title: "Email",
    icon: <Mail className="w-5 h-5 text-gray-300" />,
    href: "mailto:mideolaniyi@outlook.com",
  },
];

interface NavPromptProps {
  visible: boolean;
  direction: "up" | "down";
  href: string;
  pageName: string;
}

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
  const contentRef = useRef<HTMLElement>(null);
  const [scrollHint, setScrollHint] = useState<"up" | "down" | null>(null);
  const [tappedButton, setTappedButton] = useState<string | null>(null);

  const [showNavHint, setShowNavHint] = useState(false);

  const navState = useRef({
    isPrimed: false,
    targetHref: "",
    scrollAccumulator: 0,
    debounceTimeout: null as NodeJS.Timeout | null,
    holdTimeout: null as NodeJS.Timeout | null,
    overscroll: 0,
  });

  const [navPrompt, setNavPrompt] = useState<NavPromptProps>({ visible: false, direction: "down", href: "", pageName: "" });

  const [navNotification, setNavNotification] = useState<{
    visible: boolean;
    direction: "up" | "down";
    pageName: string;
  }>({ visible: false, direction: "down", pageName: "" });

  const currentTheme = sectionThemes[pathname] || sectionThemes["/"];

  const handleNavClick = (href: string) => {
    if (isNavigating) return;

    // Show the loader and apply the glowing class immediately
    setIsNavigating(true);
    setTappedButton(href);

    // Delay the actual navigation to let the animation be seen
    setTimeout(() => {
      router.push(href);
    }, 400); // 400ms delay
  };

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
    const handleScroll = () => {
      if (isNavigating) return;

      const scrollContainer = isDesktop
        ? contentRef.current
        : document.documentElement;
      if (!scrollContainer) return;

      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;

      // Use a small buffer for floating point inaccuracies
      const isAtBottom = clientHeight + scrollTop >= scrollHeight - 5;
      const isAtTop = scrollTop <= 5;
      const currentIndex = navLinks.findIndex((link) => link.href === pathname);

      let newPromptState: NavPromptProps = {
        visible: false,
        direction: "down",
        href: "",
        pageName: "",
      };

      if (isAtBottom && currentIndex < navLinks.length - 1) {
        const nextPage = navLinks[currentIndex + 1];
        newPromptState = {
          visible: true,
          direction: "down",
          href: nextPage.href,
          pageName: nextPage.label,
        };
      } else if (isAtTop && currentIndex > 0) {
        const prevPage = navLinks[currentIndex - 1];
        newPromptState = {
          visible: true,
          direction: "up",
          href: prevPage.href,
          pageName: prevPage.label,
        };
      }

      setNavPrompt(newPromptState);
    };

    const scrollEl = isDesktop ? contentRef.current : window;
    // scrollEl?.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check on page load to see if it's already at the top/bottom
    // const timer = setTimeout(handleScroll, 500);

    return () => {
      // scrollEl?.removeEventListener("scroll", handleScroll);
      // clearTimeout(timer);
    };
  }, [pathname, isNavigating, isDesktop]);

  // Effect to reset navigation lock after page changes
  useEffect(() => {
    setIsNavigating(false);
    setTappedButton(null);
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

  useEffect(() => {
    const isCurrentlyDesktop = window.innerWidth >= 1024;
    const hasSeenHint = sessionStorage.getItem("hasSeenNavHint");

    if (hasSeenHint || !isCurrentlyDesktop) {
      return;
    }

    console.log("Hint conditions met. Setting timer...");

    const showHintTimer = setTimeout(() => {
      setShowNavHint(true);
    }, 2000);

    return () => clearTimeout(showHintTimer);
  }, []);

  const handleDismissHint = () => {
    setShowNavHint(false);
    sessionStorage.setItem("hasSeenNavHint", "true");
  };

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

  const words = [
    "Building React & React Native Apps.",
    "Robust Backends in Node.js & Nest.js.",
    "Automated CI/CD with Docker & GitHub Actions.",
    "Managing VPS Servers & Nginx.",
    "Cloud-Native Deployments on AWS & GCP.",
  ];

  const typewriterWords = [
    {
      text: "Hello,",
    },
    {
      text: "I'm",
    },
    {
      text: "Olaniyi",
    },
    {
      text: "Olamide",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const FooterContent = () => (
    <>
      <p className="mb-2">
        Built with{" "}
        <span className="text-gray-600 dark:text-gray-300">Next.js</span>,{" "}
        <span className="text-gray-600 dark:text-gray-300">Tailwind CSS</span>,
        and{" "}
        <span className="text-gray-600 dark:text-gray-300">Framer Motion</span>.
      </p>
      <p>
        Design inspired by{" "}
        <a
          href="https://www.behance.net/oyinkanogundel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white underline"
        >
          Ogundele Oyinkansola
        </a>
      </p>
      <p className="mt-2">
        © {new Date().getFullYear()} Olaniyi Olamide. All Rights Reserved.
      </p>
    </>
  );

  return (
    <div className="min-h-screen relative font-mono overflow-x-hidden">
      {/* Animated Background */}

      <CustomCursor />

      <div className="fixed top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      <div
        className="fixed inset-0 -z-10 dark:bg-neutral-950"
        style={{
          // backgroundColor: "#111827",
          backgroundImage: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%),linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 2rem 2rem, 2rem 2rem",
        }}
      >
        <div
          className="fixed inset-0 -z-10 dark:bg-neutral-950"
          style={{
            // backgroundColor: "#111827",
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
                width={150}
                height={150}
                className="h-full w-full object-cover" // Ensures the image fills the circle without distortion
                priority // Tells Next.js to load this image first
              />
            </motion.div>

            <div className="space-y-2">
              <div className="text-gray-300 text-xl md:text-2xl h-8">
                {/* <Typewriter
                  options={{
                    loop: true,
                    delay: 50,
                    cursorClassName: "text-blue-400",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(200)
                      .typeString(
                        "<span style='color: #60a5fa;'>Hello,</span><span style='color: #d1d5db;'> I'm </span><span style='color: #facc15;'>Olamide!</span>"
                      )
                      .pauseFor(5000)
                      .start();
                  }}
                /> */}
                <TypewriterEffectSmooth
                  words={typewriterWords}
                  key={pathname}
                />
              </div>

              <div className="flex justify-center items-center">
                <h2 className="text-white text-center  text-2xl md:text-3xl font-bold leading-tight font-code h-28 lg:h-auto">
                  {/* <Typewriter
                  options={{
                    loop: true,
                    delay: 50,
                    cursorClassName: "text-blue-400",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(1200)
                      .typeString(
                        'Building <span style="color: #60a5fa;">React</span> & <span style="color: #a78bfa;">React Native</span> Apps.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Robust Backends in <span style="color: #84cc16;">Node.js</span> & <span style="color: #e11d48;">Nest.js</span>.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Automated CI/CD with <span style="color: #06b6d4;">Docker</span> & <span style="color: #ffffff;">GitHub Actions</span>.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Managing <span style="color: #f59e0b;">VPS Servers</span> & <span style="color: #4ade80;">Nginx</span>.'
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString(
                        'Cloud-Native Deployments on <span style="color: #f59e0b;">AWS</span> & <span style="color: #3b82f6;">GCP</span>.'
                      )
                      .pauseFor(2500)
                      .start();
                  }}
                /> */}
                  <FlipWords words={words} />
                </h2>
              </div>
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
                      onClick={() => {
                        handleNavClick(link.href);
                      }}
                      className={`animated-border-button relative transition-all duration-500 ${
                        tappedButton === link.href ? "is-tapped" : ""
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={
                        {
                          "--glow-color-dark": currentTheme.glowColorDark,

                          "--glow-color-light": currentTheme.glowColorLight,
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className={`absolute inset-1 rounded-full z-[9] ${
                          !isActive
                            ? `${currentTheme.hoverBgSolid} active:bg-black hover:bg-black`
                            : `${currentTheme.activeBg} active:bg-black hover:bg-black`
                        }`}
                      />

                      <div
                        className={`relative px-5 py-2 rounded-full backdrop-blur-sm text-sm z-10 transition-all duration-500 ${
                          isActive
                            ? `${currentTheme.activeBg} ${currentTheme.activeBorder}`
                            : `border ${currentTheme.border} ${currentTheme.hoverBgSolid}`
                        }`}
                      >
                        <span
                          className={`${
                            isActive ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
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
              <motion.a
                href="/Olamide-Resume.pdf"
                download="Olamide-Gideon-Resume.pdf"
                className="px-6 py-3 border border-gray-500 text-gray-300 rounded-full transition-colors duration-300 backdrop-blur-sm hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
              <Link href="/contact" passHref>
                <motion.button
                  className={`px-6 py-3 bg-white/10 ${currentTheme.border} text-white rounded-full transition-colors duration-300 backdrop-blur-sm ${currentTheme.hoverBg}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s Work
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="flex justify-center gap-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {/* {socialLinks.map(({ Icon, href }, index) => (
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
                    href.includes("mailto:")
                      ? "Send an email"
                      : href.includes("tel:")
                      ? "Call me"
                      : "Visit profile"
                  }
                >
                  <Icon className="w-5 h-5 text-gray-300" />
                </motion.a>
              ))} */}

              <FloatingDock
                mobileClassName="translate-y-20"
                items={socialLinks}
              />
            </motion.div>
          </motion.div>

          <motion.footer
            className="hidden lg:block fixed bottom-6 left-0 w-1/2 text-center text-xs text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <FooterContent />
          </motion.footer>

          <motion.footer
            className="block md:hidden left-0 w-1/2 text-center text-xs text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <FooterContent />
          </motion.footer>
        </div>

        {/* --- Right Side (Page Content) --- */}
        <main
          ref={contentRef}
          id="page-content"
          className="w-full lg:w-1/2 lg:ml-[50%] pb-24 lg:pb-0 relative lg:h-screen lg:overflow-y-auto"
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

      <FloatingDock items={socialLinks} variant="mobile" />
      {/* --- ADDITION 1: Desktop Section Indicators --- */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-4 z-10 hidden lg:flex flex-col">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link key={`indicator-${link.href}`} href={link.href} passHref>
              <div
                className="relative group flex items-center cursor-pointer"
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
                  {/* <span
                    className={`text-xs transition-all duration-300 ${
                      isActive ? "text-white font-bold" : "text-white/60"
                    }`}
                  >
                    {link.label.split(" ")[0]}
                  </span> */}
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
        {scrollHint && (
          <motion.div
            className={`fixed left-0 w-full h-1 ${
              currentTheme.activeBg
            } shadow-[0_0_15px_rgba(59,130,246,0.7)] z-50 ${
              scrollHint === "up" ? "top-0" : "bottom-0"
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ originX: 0.5 }}
          />
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

      <AnimatePresence>
        {navPrompt.visible && (
          <NavigationButton
            direction={navPrompt.direction}
            pageName={navPrompt.pageName}
            onClick={() => handleNavClick(navPrompt.href)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{isNavigating && <NavigationLoader />}</AnimatePresence>

      <AnimatePresence>
        {showNavHint && <NavigationHint onDismiss={handleDismissHint} />}
      </AnimatePresence>
    </div>
  );
}
