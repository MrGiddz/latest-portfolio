"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

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
    alert("Form submitted! Check the console for the data.");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <motion.div
        className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4, // 2. The delay ensures the page slides in first
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-jetbrains">
          Let&apos;s work together
        </h2>

        <motion.p
          className="text-center text-gray-400 mb-8"
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Or email me directly at:
          <a
            href="mailto:mideolaniyi@outlook.com"
            className="flex items-center justify-center gap-2 text-blue-300 font-semibold hover:underline mt-1"
          >
            <Mail className="h-4 w-4" />
            <span>mideolaniyi@outlook.com</span>
          </a>
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          {/* Name Input */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-400 mb-2">
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
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-400 mb-2">
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
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          {/* Subject Input */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="subject" className="text-sm text-gray-400 mb-2">
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
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          {/* Message Textarea */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="message" className="text-sm text-gray-400 mb-2">
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
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2 resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={fieldVariants}
            className="flex justify-center pt-4"
          >
            <button
              type="submit"
              className="px-12 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Submit
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
