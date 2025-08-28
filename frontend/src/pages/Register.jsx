import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { generatepdf } from "../components/generatedPdf.jsx";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    whatsapp: "",
    highest_qualification: "",
    school_college_company: "",
    current_location: "",
    team_name: "",
    team_leader_email: "",
    team_leader_phone: "",
    partner_name: "",
    partner_email: "",
    ref_source: "",
    working_experience: "",
    recent_ctf: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  // Simple validators
  const validators = {
    email: (val) => /\S+@\S+\.\S+/.test(val) || "Invalid email format",
    mobile: (val) => /^[0-9]{10}$/.test(val) || "Mobile must be 10 digits only",
    whatsapp: (val) =>
      /^[0-9]{10}$/.test(val) || "WhatsApp number must be 10 digits",
    team_leader_email: (val) =>
      /\S+@\S+\.\S+/.test(val) || "Invalid leader email format",
    team_leader_phone: (val) =>
      /^[0-9]{10}$/.test(val) || "Leader phone must be 10 digits",
    partner_email: (val) =>
      val === "" || /\S+@\S+\.\S+/.test(val) || "Invalid partner email",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // validate live
    if (validators[name]) {
      const valid = validators[name](value);
      setErrors((prev) => ({ ...prev, [name]: valid === true ? "" : valid }));
    }

    // progress update
    const filledFields = Object.values({
      ...formData,
      [name]: value,
    }).filter((val) => val !== "").length;
    setProgress((filledFields / Object.keys(formData).length) * 100);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // final validation check
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (validators[field]) {
        const valid = validators[field](formData[field]);
        if (valid !== true) newErrors[field] = valid;
      }
      if (
        formData[field] === "" &&
        ![
          "partner_name",
          "partner_email",
          "working_experience",
          "recent_ctf",
        ].includes(field)
      ) {
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/hackstrom/participants/register",
        formData
      );
      setMessage("✅ Registration successful!");
      alert("🎉 Your registration is complete!");

        generatepdf({ ...formData, uniqueId: res.data.uniqueId });

    } catch (err) {
      setMessage(" Something went wrong. Try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center from-black via-[#0a0f1c] to-black text-white p-6 overflow-hidden">
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50"
            initial={{ y: Math.random() * 800, x: Math.random() * 1200 }}
            animate={{ y: [null, -20], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-cyan-400/30 shadow-2xl rounded-2xl p-10 space-y-6 z-10 mt-15"
      >
        <h2 className="text-3xl font-extrabold text-center text-cyan-400 tracking-wider drop-shadow-lg">
          Hack-Strom Hackathon Registration
        </h2>

        {/* Hacker Style Progress Bar */}
        <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden border border-cyan-500 shadow-[0_0_10px_#22d3ee]">
          <motion.div
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-3"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Fields */}
        {[
          { name: "name", label: "Full Name *", type: "text" },
          { name: "email", label: "Email ID *", type: "email" },
          { name: "mobile", label: "Mobile No *", type: "tel" },
          { name: "whatsapp", label: "WhatsApp No *", type: "tel" },
          {
            name: "highest_qualification",
            label: "Highest Qualification *",
            type: "select",
            options: [
              "High School",
              "Diploma",
              "Undergraduate",
              "Postgraduate",
              "Doctorate",
            ],
          },
          {
            name: "school_college_company",
            label: "School / College / Company *",
            type: "text",
          },
          {
            name: "current_location",
            label: "Current Location *",
            type: "text",
          },
          { name: "team_name", label: "Team Name *", type: "text" },
          {
            name: "team_leader_email",
            label: "Team Leader's Email *",
            type: "email",
          },
          {
            name: "team_leader_phone",
            label: "Team Leader's Phone *",
            type: "tel",
          },
          {
            name: "partner_name",
            label: "Partner Name (or 'null')",
            type: "text",
          },
          {
            name: "partner_email",
            label: "Partner Email (or 'null')",
            type: "email",
          },
          {
            name: "ref_source",
            label: "How did you know about the event? *",
            type: "text",
          },
          {
            name: "working_experience",
            label: "Working Experience (if any)",
            type: "textarea",
          },
          {
            name: "recent_ctf",
            label: "Recent CTF Event (if any)",
            type: "text",
          },
        ].map((field, idx) => (
          <motion.div
            key={field.name}
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <label className="block text-sm text-cyan-300 tracking-wide">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                onChange={handleChange}
                value={formData[field.name]}
                required
                className="w-full p-3 rounded-lg bg-black/40 border border-cyan-500/40 text-white focus:ring-2 focus:ring-cyan-400 neon-input"
              >
                <option value="">-- Select --</option>
                {field.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 rounded-lg bg-black/40 border border-cyan-500/40 text-white focus:ring-2 focus:ring-cyan-400 neon-input"
              ></textarea>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.label.includes("*")}
                className="w-full p-3 rounded-lg bg-black/40 border border-cyan-500/40 text-white focus:ring-2 focus:ring-cyan-400 neon-input"
              />
            )}

            {errors[field.name] && (
              <p className="text-red-400 text-xs mt-1">
                ⚠ {errors[field.name]}
              </p>
            )}
          </motion.div>
        ))}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-purple-500 text-black font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_#22d3ee]"
        >
          {loading ? "💻 Submitting..." : "🚀 Submit Registration"}
        </motion.button>

        {message && (
          <p className="text-center mt-3 text-cyan-300 font-semibold">
            {message}
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Register;
