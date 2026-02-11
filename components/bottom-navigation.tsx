"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface NavigationButtonProps {
  direction: "up" | "down";
  pageName: string;
  onClick: () => void;
  countdownSeconds?: number | null;
  onCancel?: () => void;
}

export default function NavigationButton({
  direction,
  pageName,
  onClick,
  countdownSeconds = null,
  onCancel,
}: NavigationButtonProps) {
  const isUp = direction === "up";
  const isAutoNavigating = typeof countdownSeconds === "number";

  return (
    <motion.div
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-slate-900/80 px-6 py-3 text-white shadow-lg backdrop-blur-sm ${
        isUp ? "top-8" : "bottom-28 md:bottom-8"
      }`}
      initial={{ opacity: 0, y: isUp ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isUp ? -20 : 20 }}
    >
      {isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      <span className="text-sm">
        {isAutoNavigating ? (
          <>
            Auto navigating to <span className="font-bold">{pageName}</span> in{" "}
            <span className="font-bold">{countdownSeconds}s</span>
          </>
        ) : (
          <>
            Go to <span className="font-bold">{pageName}</span>
          </>
        )}
      </span>
      <motion.button
        onClick={onClick}
        className="ml-1 rounded-md bg-white/10 px-3 py-1 text-xs font-semibold hover:bg-white/20"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Go now
      </motion.button>
      {isAutoNavigating && onCancel && (
        <motion.button
          onClick={onCancel}
          className="rounded-md border border-white/30 px-3 py-1 text-xs font-semibold hover:bg-white/10"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Cancel
        </motion.button>
      )}
    </motion.div>
  );
}
