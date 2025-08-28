import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
const ParticipantDetails = () => {
  const { id } = useParams(); // get id from route
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/hackstrom/participants/${id}`
        );
        const data = await res.json();
        setParticipant(data);
      } catch (err) {
        console.error("Error fetching participant:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipant();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading...
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="flex justify-center items-center h-screen text-red-400 text-xl">
        Participant not found!
      </div>
    );
  }

  const Detail = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-base font-medium">{value || "N/A"}</span>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-20">
      <motion.h1
        className="text-3xl font-bold mb-8 text-emerald-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Participant Details
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-2xl border border-white/20 
                   bg-white/10 backdrop-blur-lg shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Detail label="Name" value={participant.name} />
          <Detail label="Email" value={participant.email} />
          <Detail label="Mobile" value={participant.mobile} />
          <Detail label="WhatsApp" value={participant.whatsapp} />
          <Detail
            label="Qualification"
            value={participant.highest_qualification}
          />
          <Detail
            label="College/Company"
            value={participant.school_college_company}
          />
          <Detail label="Location" value={participant.current_location} />
          <Detail label="Team Name" value={participant.team_name} />
          <Detail
            label="Team Leader Email"
            value={participant.team_leader_email}
          />
          <Detail
            label="Team Leader Phone"
            value={participant.team_leader_phone}
          />
          <Detail label="Partner Name" value={participant.partner_name} />
          <Detail label="Partner Email" value={participant.partner_email} />
          <Detail label="Reference Source" value={participant.ref_source} />
          <Detail label="Experience" value={participant.working_experience} />
          <Detail label="Recent CTF" value={participant.recent_ctf} />
          <Detail label="Unique ID" value={participant.uniqueId} />
          <Detail
            label="Registered On"
            value={new Date(participant.createdAt).toLocaleString()}
          />
        </div>
      </motion.div>

      <div className="mt-6">
        <Link
          to="/admin"
          className="text-emerald-400 hover:text-emerald-300 font-semibold"
        >
          ← Back to Admin Panel
        </Link>
      </div>
    </div>
  );
};

export default ParticipantDetails;
