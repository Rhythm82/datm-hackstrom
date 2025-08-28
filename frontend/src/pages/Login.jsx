import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://datm-hackstrom-1.onrender.com/api/v1/hackstrom/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      // short 0.5s "hacking style" loading
      setTimeout(() => {
        navigate("/admin");
      }, 500);
    } catch (err) {
      setError("Invalid email or password ❌");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center  from-blue-900 to-black">
      <motion.form
        onSubmit={handleSubmit}
        className="p-8 bg-black/50 backdrop-blur-md rounded-2xl shadow-xl w-96"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>

        <label className="text-white text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <label className="text-white text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
