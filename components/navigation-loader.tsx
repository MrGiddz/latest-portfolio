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
        <motion.span className="block h-4 w-4 rounded-full bg-white" variants={dotVariants} />
        <motion.span className="block h-4 w-4 rounded-full bg-white" variants={dotVariants} />
        <motion.span className="block h-4 w-4 rounded-full bg-white" variants={dotVariants} />
      </motion.div>
    </motion.div>
  );
}