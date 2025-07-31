"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, subject, message });
    alert("Form submitted! Check the console for the data.");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
          Let&apos;s work together
        </h2>
        
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name Input */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          {/* Subject Input */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="subject" className="text-sm text-gray-400 mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2"
            />
          </motion.div>

          {/* Message Textarea */}
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label htmlFor="message" className="text-sm text-gray-400 mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none transition-colors duration-300 py-2 resize-none"
            />
          </motion.div>
          
          {/* Submit Button */}
          <motion.div variants={fieldVariants} className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-12 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Submit
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}