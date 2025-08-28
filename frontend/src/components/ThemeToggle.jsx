import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // nice icons

const ThemeToggle = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" // load saved theme
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg transition-all"
    >
      {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
    </button>
  );
};

export default ThemeToggle;
