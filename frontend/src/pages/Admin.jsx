import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Admin = () => {
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  // ✅ Use axios instead of fetch
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/hackstrom/participants/get-participants"
        );
        setParticipants(res.data);
      } catch (err) {
        console.error("Error fetching participants", err);
      }
    };
    fetchParticipants();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/hackstrom/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-20 relative">
      {/* 🔹 Logout Icon */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.2, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
        className="absolute cursor-pointer top-23 right-10 text-red-400 hover:text-red-500 transition text-2xl"
        title="Logout"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </motion.button>

      <motion.h1
        className="text-3xl font-bold mb-6 text-emerald-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Admin Panel - Participants
      </motion.h1>

      {/* Column Headings */}
      <div className="grid grid-cols-3 gap-4 px-4 py-2 font-bold text-gray-300 border-b border-white/20 mb-2 lg:grid-cols-5">
        <span>Team Name</span>
        <span>Leader Name</span>

        {/* Hide these on mobile */}
        <span className="hidden lg:block">Leader Email</span>
        <span className="hidden lg:block">Leader Phone</span>

        <span>Profile</span>
      </div>

      {/* Participant List */}
      <div className="space-y-2">
        {participants.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="grid grid-cols-3 lg:grid-cols-5 gap-4 items-center p-4 rounded-2xl bg-white/10 border border-white/20 shadow-md hover:shadow-lg backdrop-blur-lg transition"
          >
            {/* Always visible */}
            <span className="text-gray-200 font-semibold">{p.team_name}</span>
            <span className="text-emerald-300 font-semibold">{p.name}</span>

            {/* Desktop only */}
            <span className="hidden lg:block text-gray-200 font-semibold">
              {p.team_leader_email}
            </span>
            <span className="hidden lg:block text-gray-200 font-semibold">
              {p.team_leader_phone}
            </span>

            {/* Always visible */}
            <Link
              to={`/admin/participant/${p._id}`}
              className="text-emerald-400 text-xl font-bold hover:text-emerald-300 transition text-center"
            >
              <i className="fa-solid fa-circle-user"></i>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
