"use client";

import { motion } from "framer-motion";
import { Mouse } from "lucide-react";

export default function NavigationHint({
  onDismiss,
  scrollNavigationEnabled,
  onEnableScrollNavigation,
}: {
  onDismiss: () => void;
  scrollNavigationEnabled: boolean;
  onEnableScrollNavigation: () => void;
}) {
  return (
    <motion.div
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
          <h3 className="text-lg font-bold">Navigation Helper</h3>
          <p className="mt-1 text-sm text-white/80">
            {scrollNavigationEnabled
              ? "Use your mouse wheel to move between sections. At the top or bottom edge, hold briefly to start auto-navigation."
              : "Scroll navigation is currently off. Turn it on to navigate sections with your mouse wheel."}
          </p>
          {scrollNavigationEnabled && (
            <p className="mt-2 text-xs text-white/60">
              You can cancel auto-navigation from the countdown prompt.
            </p>
          )}
        </div>
        {!scrollNavigationEnabled && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              onEnableScrollNavigation();
            }}
            className="rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-semibold"
          >
            Enable Scroll Navigation
          </button>
        )}
        <p className="mt-2 text-xs text-white/50">(Click anywhere to dismiss)</p>
      </motion.div>
    </motion.div>
  );
}
