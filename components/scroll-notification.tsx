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
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full ${currentTheme.activeBg} px-6 py-3 text-white shadow-lg backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {isUp ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
      <div className="text-center">
        <p className="text-sm text-gray-400">Release to navigate to</p>
        <p className="font-bold">{pageName}</p>
      </div>
    </motion.div>
  );
}