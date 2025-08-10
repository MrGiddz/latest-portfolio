"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "./ui/stateful-button";

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactForm() {
  const [payload, setPayload] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ payload });
   return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  };

    const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  };

  return (
    <div className="w-full p-4 md:p-10 md:pl-0">
      <motion.div
        className="w-full max-w-3xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-8 shadow-2xl my-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4,
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center font-mono">
          Let&apos;s work together
        </h2>

        <motion.div
          className="text-center text-gray-500 dark:text-gray-400 mb-8"
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <p>Or reach me directly via:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 mt-2">
            <a
              href="mailto:mideolaniyi@outlook.com"
              className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-300 font-semibold hover:underline"
            >
              <Mail className="h-4 w-4" />
              <span>mideolaniyi@outlook.com</span>
            </a>
            <a
              href="tel:+2348026406566"
              className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-300 font-semibold hover:underline"
            >
              <Phone className="h-4 w-4" />
              <span>+234 802 640 6566</span>
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          {/* Form Fields */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={payload.name}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className="w-full bg-transparent border-b border-gray-400 dark:border-gray-500 text-slate-900 dark:text-white focus:border-slate-900 dark:focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={payload.email}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="w-full bg-transparent border-b border-gray-400 dark:border-gray-500 text-slate-900 dark:text-white focus:border-slate-900 dark:focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="subject" className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={payload.subject}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, subject: e.target.value }))
              }
              required
              className="w-full bg-transparent border-b border-gray-400 dark:border-gray-500 text-slate-900 dark:text-white focus:border-slate-900 dark:focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="message" className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={payload.message}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, message: e.target.value }))
              }
              required
              rows={5}
              className="w-full bg-transparent border-b border-gray-400 dark:border-gray-500 text-slate-900 dark:text-white focus:border-slate-900 dark:focus:border-white focus:outline-none transition-colors duration-300 py-2 resize-none"
            />
          </motion.div>
          
          <motion.div
            variants={fieldVariants}
            className="flex justify-center pt-4"
          >
                  <Button onClick={handleClick}>Send message</Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
