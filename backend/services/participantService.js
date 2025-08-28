import Participant from "../models/Participant.js";
import { v4 as uuidv4 } from "uuid"; // to generate unique IDs

// Create new participant
export const createParticipant = async (data) => {
  // generate unique id (customize as per hackathon branding)
  const uniqueId = "HACKSTROM-" + uuidv4().slice(0, 8).toUpperCase();

  const participant = new Participant({
    ...data,
    uniqueId,
  });

  await participant.save();
  return participant;
};

export const getAllParticipants = async () => {
  return Participant.find().sort({ createdAt: -1 }); // newest first
};

export const getParticipantById = async (id) => {
  return Participant.findById(id);
};