/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, useAnimate } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<any>;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  const [scope, animate] = useAnimate();
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");

  const animateLoading = async () => {
    await animate(
      ".loader",
      {
        width: "1.25rem", // 20px
        scale: 1,
        display: "block",
      },
      {
        duration: 0.2,
      }
    );
  };

  const animateSuccess = async () => {
    await animate(
      ".loader",
      {
        width: "0px",
        scale: 0,
        display: "none",
      },
      {
        duration: 0.2,
      }
    );
    await animate(
      ".check",
      {
        width: "1.25rem", // 20px
        scale: 1,
        display: "block",
      },
      {
        duration: 0.2,
      }
    );
  };

  const reset = async () => {
     await animate(
      ".check",
      {
        width: "0px",
        scale: 0,
        display: "none",
      },
      {
        delay: 2,
        duration: 0.2,
      }
    );
    setStatus("idle");
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (status !== 'idle') return;

    setStatus("loading");
    await animateLoading();

    try {
      await props.onClick?.(event);
      setStatus("success");
      await animateSuccess();
      await reset();
    } catch (error) {
      console.error("Operation failed", error);
      setStatus("idle"); // Reset on failure
    }
  };

  // --- THIS IS THE FIX ---
  // We destructure the conflicting props so they are not passed down.
  // `onAnimationEnd` is the correct prop name from React's HTML attributes.
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;

  return (
    <motion.button
      layout
      ref={scope}
      className={cn(
        "flex min-w-[150px] cursor-pointer items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-lg transition-colors duration-300",
        {
          "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700": status === "idle",
          "bg-slate-700 dark:bg-slate-600 cursor-not-allowed": status === "loading",
          "bg-green-600 text-white": status === "success",
        },
        className
      )}
      {...buttonProps}
      onClick={handleClick}
    >
      <motion.div layout className="flex items-center justify-center gap-2">
        <Loader />
        <CheckIcon />
        <motion.span layout>
            {status === 'idle' && children}
            {status === 'loading' && "Sending..."}
            {status === 'success' && "Message Sent!"}
        </motion.span>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white" // Loader is always on a dark background
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-white" // Check is always on a green background
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
