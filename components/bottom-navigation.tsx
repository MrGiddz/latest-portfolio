"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface NavigationButtonProps {
  direction: "up" | "down";
  pageName: string;
  onClick: () => void;
}

export default function NavigationButton({
  direction,
  pageName,
  onClick,
}: NavigationButtonProps) {
  const isUp = direction === "up";
  return (
    <motion.button
      onClick={onClick}
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-slate-900/80 px-6 py-3 text-white shadow-lg backdrop-blur-sm ${
        isUp ? "top-8" : "bottom-28 md:bottom-8"
      }`}
      initial={{ opacity: 0, y: isUp ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isUp ? -20 : 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      <span className="text-sm">
        Go to <span className="font-bold">{pageName}</span>
      </span>
    </motion.button>
  );
}
