import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Admin = () => {
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(
          "https://datm-hackstrom-1.onrender.com/api/v1/hackstrom/participants/get-participants"
        );
        setParticipants(res.data);
      } catch (err) {
        console.error("Error fetching participants", err);
      }
    };
    fetchParticipants();
  }, []);

  // 🔹 Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(participants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "participants_list.xlsx");
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://datm-hackstrom-1.onrender.com/api/v1/hackstrom/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-20 relative">

      {/* 🔹 Top Right Icons (Export + Logout) */}
      <div className="absolute top-25 right-10 flex space-x-6 text-2xl ">

        {/* Export Excel Icon */}
        <motion.button
          onClick={exportToExcel}
          whileHover={{ scale: 1.3, rotate: 0 }}
          whileTap={{ scale: 0.4 }}
          className="text-green-400 hover:text-green-500 transition cursor-pointer"
          title="Export to Excel"
        >
          <i className="fa-solid fa-file-excel"></i>
        </motion.button>

        {/* Logout Icon */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.3, rotate: 0 }}
          whileTap={{ scale: 0.4 }}
          className="text-red-400 hover:text-red-500 transition cursor-pointer"
          title="Logout"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </motion.button>
      </div>

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
            <span className="text-gray-200 font-semibold">{p.team_name}</span>
            <span className="text-emerald-300 font-semibold">{p.name}</span>
            <span className="hidden lg:block text-gray-200 font-semibold">
              {p.team_leader_email}
            </span>
            <span className="hidden lg:block text-gray-200 font-semibold">
              {p.team_leader_phone}
            </span>
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
