"use client";

import { motion } from "framer-motion";

// Animation for the container to stagger the dots
const loaderVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation for each dot to jump up and down
const dotVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
} as const;

const circleTrackPath =
  "M90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50C10 27.9086 27.9086 10 50 10";

// Path data for the original static blue arc
const staticBlueArcPath = "M50 10C68 10 90 27.9086 90 50";

export default function NavigationLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex gap-4"
        variants={loaderVariants}
        initial="hidden"
        animate="visible"
      >
        <svg
          className="h-24 w-24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill="black" />

          {/* 1. The static white track */}
          <path
            d={circleTrackPath}
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* 2. The original static blue arc (no animation) */}
          <path
            d={staticBlueArcPath}
            stroke="#60a5fa" // blue-400
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* 3. The new traveling arc (I've made it green for clarity) */}
          <motion.path
            d={circleTrackPath}
            stroke="#4ade80" // green-400
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0.25, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />

          {/* 4. The blinking yellow cursor */}
          <motion.g
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M45 65L55 65"
              stroke="#facc15" // yellow-400
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>
        {/* <motion.span className="block h-4 w-4 rounded-full bg-white" variants={dotVariants} />
        <motion.span className="block h-4 w-4 rounded-full bg-white" variants={dotVariants} />
        <motion.span className="block h-4 w-4 rounded-full bg-white" variants={dotVariants} /> */}
      </motion.div>
    </motion.div>
  );
}
