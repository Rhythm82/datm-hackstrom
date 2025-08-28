import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  whatsapp: { type: String, required: true },
  highest_qualification: { type: String, required: true },
  school_college_company: { type: String, required: true },
  current_location: { type: String, required: true },
  team_name: { type: String, required: true },
  team_leader_email: { type: String, required: true },
  team_leader_phone: { type: String, required: true },
  partner_name: { type: String, default: "null" },
  partner_email: { type: String, default: "null" },
  ref_source: { type: String, required: true },
  working_experience: { type: String, default: "" },
  recent_ctf: { type: String, default: "" },
  uniqueId: { type: String, required: true }, // custom generated ID
  createdAt: { type: Date, default: Date.now }
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
