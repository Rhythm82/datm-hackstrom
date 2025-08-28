import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className=" text-blue-500 py-10 mt-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 space-y-10">


        {/* Footer Bottom */}
        <motion.p
          className="text-center text-xs sm:text-sm text-gray-400 px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Dooars Academy of Technology & Management
          · HackStrom · Powered by ISOAH
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
