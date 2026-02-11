"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorStateRef = useRef(cursorState);
  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    cursorStateRef.current = cursorState;
  }, [cursorState]);

  useEffect(() => {
    setIsClient(true);
    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!finePointer) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      if (cursorStateRef.current === "dragging") return;

      if (target.closest("button, [role='button']")) {
        setCursorState("button");
      } else if (target.closest("a")) {
        setCursorState("link");
      } else if (window.getComputedStyle(target).cursor === "text") {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
      setIsVisible(true);
    };

    const handlePointerDown = () => {
      setCursorState("dragging");
    };

    const handlePointerUp = (e: PointerEvent) => {
      const nextTarget = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;

      if (nextTarget?.closest("button, [role='button']")) {
        setCursorState("button");
        return;
      }
      if (nextTarget?.closest("a")) {
        setCursorState("link");
        return;
      }

      setCursorState("default");
    };

    const handlePointerEnter = () => setIsVisible(true);
    const handlePointerLeave = () => setIsVisible(false);
    const handleWindowBlur = () => setIsVisible(false);
    const handleWindowFocus = () => setIsVisible(true);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointerenter", handlePointerEnter);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }
    if (isVisible) {
      document.body.classList.add("custom-cursor-active");
    } else {
      document.body.classList.remove("custom-cursor-active");
    }
  }, [isEnabled, isVisible]);

  if (!isClient || !isEnabled) {
    return null;
  }

  let size = 32;
  if (cursorState === "dragging") size = 64;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: mouseXSpring,
        top: mouseYSpring,
        x: "-50%",
        y: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
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
