import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" // persist user choice
  );
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  const handleAdminClick = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className="flex items-center justify-between px-6 py-4 
        bg-white/10 backdrop-blur-md border-b border-white/20 
        shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        >
          Hack<span className="text-emerald-300">Strom</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
          {["Home", "Register"].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-400 hover:text-emerald-300 transition-colors"
              >
                {item}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-300 rounded-full transition-all group-hover:w-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </motion.div>
          ))}

          {/* Admin */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative group cursor-pointer"
            onClick={handleAdminClick}
          >
            <span className="text-red-400 hover:text-emerald-300 transition-colors">
              Admin
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-300 rounded-full transition-all group-hover:w-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          </motion.div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden flex flex-col items-center bg-black/60 backdrop-blur-lg border-t border-white/20 py-6 space-y-6"
        >
          {["Home", "Register"].map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-gray-200 text-lg font-medium hover:text-emerald-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}

          {/* Admin */}
          <span
            onClick={handleAdminClick}
            className="text-gray-200 text-lg font-medium hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Admin
          </span>

          {/* Dark Mode Toggle Mobile */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-800/40 hover:bg-gray-700/50 transition"
          >
            {darkMode ? (
              <Sun className="text-yellow-400" size={22} />
            ) : (
              <Moon className="text-blue-300" size={22} />
            )}
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
