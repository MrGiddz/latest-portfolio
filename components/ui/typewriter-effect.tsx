"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const pathname = usePathname();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, pathname]); // Added pathname to re-trigger animation

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{ opacity: 0 }} // Start with opacity 0
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black`, // Removed hidden
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-2 md:h-4 lg:h-8 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const pathname = usePathname(); // 1. Get the current page path

  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div className="w-full">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              {/* Only add a space if it is not the last word */}
              {idx !== wordsArray.length - 1 && <span>&nbsp;</span>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "w-full max-w-full flex justify-center items-center gap-1 my-3 overflow-hidden",
        className
      )}
    >
      <motion.div
        key={pathname}
        className="overflow-hidden pb-1 max-w-full"
        initial={{
          width: "0%",
        }}
        animate={{
          width: "100%",
        }}
        transition={{
          duration: 1.4,
          ease: "linear",
          delay: 0.4,
        }}
      >
        <div className="text-base sm:text-lg md:text-2xl font-bold text-center leading-tight whitespace-normal break-words">
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,

          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-6 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
