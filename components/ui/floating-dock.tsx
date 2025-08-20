"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 1. Create a simple useMediaQuery hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    // Use addEventListener for modern browser compatibility
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  variant = "responsive",
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  variant?: "desktop" | "mobile" | "responsive";
}) => {
  // 2. Use the hook to check for desktop screen size
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (variant === "desktop") {
    return <FloatingDockDesktop items={items} className={desktopClassName} />;
  }
  if (variant === "mobile") {
    return <FloatingDockMobile items={items} className={mobileClassName} />;
  }

  // 3. Conditionally render the correct component based on the hook's value
  return isDesktop ? (
    <FloatingDockDesktop items={items} className={desktopClassName} />
  ) : (
    <FloatingDockMobile items={items} className={mobileClassName} />
  );
};

// 4. IMPORTANT: Remove the responsive classes from the child components
const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        dockRef.current &&
        !dockRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    // REMOVED `block md:hidden`
    <div
      ref={dockRef}
      className={cn("fixed bottom-24 right-8 z-50", className)}
    >
      {/* ... rest of the mobile component code is unchanged */}{" "}
      <div className="absolute bottom-full mb-4 flex flex-col items-center gap-3">
        {" "}
        <AnimatePresence>
          {" "}
          {open &&
            items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { delay: (items.length - 1 - idx) * 0.1 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  y: 10,
                  transition: { delay: idx * 0.1 },
                }}
              >
                {" "}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
                >
                  <div className="h-5 w-5">{item.icon}</div>{" "}
                </a>{" "}
              </motion.div>
            ))}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-lg"
      >
        {" "}
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          className="relative h-6 w-6"
        >
          {" "}
          <AnimatePresence>
            {" "}
            {!open && (
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0"
              >
                {" "}
                <IconLayoutNavbarCollapse className="h-full w-full text-neutral-600 dark:text-neutral-300" />{" "}
              </motion.div>
            )}{" "}
            {open && (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0"
              >
                {" "}
                <IconX className="h-full w-full text-neutral-600 dark:text-neutral-300" />{" "}
              </motion.div>
            )}{" "}
          </AnimatePresence>{" "}
        </motion.div>{" "}
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl px-4 pb-3",
        className
      )}
    >
      {/* ... rest of the desktop component code is unchanged */}{" "}
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

// ... (IconContainer component remains unchanged)

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const widthIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const heightIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {" "}
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
      >
        {" "}
        <AnimatePresence>
          {" "}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}{" "}
            </motion.div>
          )}{" "}
        </AnimatePresence>{" "}
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}{" "}
        </motion.div>{" "}
      </motion.div>{" "}
    </a>
  );
}
