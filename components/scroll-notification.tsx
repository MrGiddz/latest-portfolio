"use client";

import { sectionThemes } from "@/lib/portfolio-data";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import { usePathname } from "next/navigation";

interface ScrollNotificationProps {
  direction: "up" | "down";
  pageName: string;
}

export default function ScrollNotification({ direction, pageName }: ScrollNotificationProps) {
  const isUp = direction === "up";
  const pathname = usePathname();
  const currentTheme = sectionThemes[pathname] || sectionThemes["/"];

  return (
    <motion.div
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] sm:bottom-10 left-1/2 z-[70] w-[calc(100vw-1rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-white/20 ${currentTheme.activeBg} px-3 py-2.5 text-white shadow-xl backdrop-blur-md sm:w-auto sm:max-w-none sm:rounded-full sm:px-4 sm:py-3`}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-center gap-2.5 sm:gap-3">
        {isUp ? (
          <ArrowUp className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
        ) : (
          <ArrowDown className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
        )}
        <div className="text-center min-w-0">
          <p className="text-[11px] leading-tight text-white/70 sm:text-sm">
            Release to navigate to
          </p>
          <p className="font-bold text-sm leading-tight sm:text-base truncate">
            {pageName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
