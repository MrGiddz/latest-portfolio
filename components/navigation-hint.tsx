"use client";

import { motion } from "framer-motion";
import { Mouse } from "lucide-react";

// The component now accepts an `onDismiss` function as a prop
export default function NavigationHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      // This backdrop now listens for a click to dismiss the hint
      onClick={onDismiss}
      className="fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center gap-4 rounded-xl border border-white/20 bg-slate-900/50 p-8 text-center text-white shadow-2xl backdrop-blur-lg"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Mouse className="h-10 w-10 text-white/70" />
        </motion.div>
        <div className="max-w-xs">
          <h3 className="text-lg font-bold">Welcome!</h3>
          <p className="mt-1 text-sm text-white/80">
            Use your mouse wheel to scroll up or down to navigate between pages.
          </p>
        </div>
        <p className="mt-2 text-xs text-white/50">(Click anywhere to dismiss)</p>
      </motion.div>
    </motion.div>
  );
}