// src/components/Loader.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaTerminal } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0f1f] z-50">
      {/* Terminal Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="flex flex-col items-center"
      >
        <FaTerminal className="text-blue-400 text-6xl mb-4 drop-shadow-lg" />

        {/* Typing Effect Bar */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
          className="h-1 bg-blue-500 rounded-full shadow-lg"
          style={{ width: "200px" }}
        />

        {/* Hacking Text Animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-blue-300 mt-4 font-mono text-lg tracking-widest"
        >
          Loading<span className="animate-pulse">_</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
