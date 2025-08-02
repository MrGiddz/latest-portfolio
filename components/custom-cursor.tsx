"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

const CursorVisual = ({ state }: { state: string }) => {
  const circlePath =
    "M48 25C48 37.7 37.7 48 25 48C12.3 48 2 37.7 2 25C2 12.3 12.3 2 25 2";
  const yellowCursorPath = "M22.5 32.5 L 27.5 32.5";

  return (
    <svg viewBox="0 0 50 50" className="h-full w-full" overflow="visible">
      <AnimatePresence mode="wait">
        {state === "default" && (
          <motion.g key="default">
            <motion.circle
              cx="25"
              cy="25"
              r="23"
              fill="black"
              stroke="white"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            />
            <motion.path
              d={yellowCursorPath}
              stroke="#facc15"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
              }}
            />
                {state === "button" && (
          <motion.g key="button">
            <motion.circle
              cx="25"
              cy="25"
              r="23"
              fill="black"
              stroke="white"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            />
            
            <motion.path
              d={yellowCursorPath}
              stroke="#facc15"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
              }}
            />
            <motion.path
              key="blue-arc"
              d={circlePath}
              stroke="#60a5fa"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0.25 }}
              animate={{ opacity: 1, pathOffset: [0, 1] }}
              exit={{ opacity: 0, pathLength: 0.25 }}
              transition={{
                pathOffset: { repeat: Infinity, duration: 1.5, ease: "linear" },
                opacity: { duration: 0.3 },
              }}
            />
          </motion.g>
        )}
          </motion.g>
        )}

            {state === "button" && (
          <motion.g key="button">
            <motion.circle
              cx="25"
              cy="25"
              r="23"
              fill="black"
              stroke="white"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            />
            
            <motion.path
              d={yellowCursorPath}
              stroke="#facc15"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
              }}
            />
            <motion.path
              key="blue-arc"
              d={circlePath}
              stroke="#60a5fa"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0.25 }}
              animate={{ opacity: 1, pathOffset: [0, 1] }}
              exit={{ opacity: 0, pathLength: 0.25 }}
              transition={{
                pathOffset: { repeat: Infinity, duration: 1.5, ease: "linear" },
                opacity: { duration: 0.3 },
              }}
            />
          </motion.g>
        )}

        {/* 👇 FIX: This block now renders for BOTH the 'link' and 'button' states. */}
        {(state === "link" || state === "button") && (
          <motion.g
            key="interactive-hover" // Use a consistent key
            initial={{ scale: 0 }}
            animate={{ scale: 0.95 }}
            exit={{ scale: 0 }}
          >
            <motion.circle
              cx="25"
              cy="25"
              r="23"
              fill="black"
              stroke="white"
              strokeWidth="2"
            />
            <motion.path
              d={circlePath}
              stroke="#60a5fa"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0.25 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                pathOffset: { repeat: Infinity, duration: 1.5, ease: "linear" },
              }}
            />
          </motion.g>
        )}

        {state === "text" && (
          <motion.path
            key="text"
            d="M25 15 V 35"
            stroke="#facc15"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
            }}
          />
        )}

        {state === "dragging" && (
          <motion.circle
            key="dragging"
            cx="25"
            cy="25"
            r="23"
            fill="rgba(255, 255, 255, 0.3)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
};

// The main component below does not need any changes.
export default function CustomCursor() {
  const [cursorState, setCursorState] = useState("default");
  const [isClient, setIsClient] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsClient(true);
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.closest("button")) {
        setCursorState("button");
      } else if (target.closest("a")) {
        setCursorState("link");
      } else if (window.getComputedStyle(target).cursor === "text") {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseOut = () => {
      setCursorState("default");
    };

    const handleMouseDown = () => {
      setCursorState("dragging");
    };
    const handleMouseUp = () => {
      setCursorState("default");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isClient || "ontouchstart" in window) {
    return null;
  }

  let size = 32;
  if (cursorState === "dragging") size = 64;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: mouseXSpring, top: mouseYSpring, x: "-50%", y: "-50%" }}
    >
      <motion.div
        className="relative"
        animate={{ width: size, height: size }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <CursorVisual state={cursorState} />
      </motion.div>
    </motion.div>
  );
}