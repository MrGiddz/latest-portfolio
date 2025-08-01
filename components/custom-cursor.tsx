'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
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

    const hover = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        setIsHoveringLink(true);
      }
    };

    const unhover = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', hover);
    document.addEventListener('mouseout', unhover);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', hover);
      document.removeEventListener('mouseout', unhover);
    };
  }, []);

  if (!isClient || 'ontouchstart' in window) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: mouseXSpring,
        top: mouseYSpring,
        x: '-50%',
        y: '-50%',
      }}
    >
      <motion.div
        className="rounded-full border border-white"
        animate={{
          width: isHoveringLink ? 48 : 32,
          height: isHoveringLink ? 48 : 32,
          backgroundColor: isHoveringLink ? 'rgba(255,255,255,0.2)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <motion.div
          className="bg-white rounded-full m-auto"
          animate={{
            width: isHoveringLink ? 0 : 8,
            height: isHoveringLink ? 0 : 8,
            opacity: isHoveringLink ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
