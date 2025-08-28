import {
  createParticipant,
  getAllParticipants,
  getParticipantById,
} from "../services/participantService.js";
import { sendSuccessRegistrationEmail } from "../Email/Email.js";

// POST /register
export const registerParticipant = async (req, res) => {
  try {
    const participant = await createParticipant(req.body);

    await sendSuccessRegistrationEmail({
      email: req.body.team_leader_email, // email of team leader
      team_name: req.body.team_name,
      name: req.body.name,
      uniqueId: participant.uniqueId, // from DB
      team_leader_email: req.body.team_leader_email,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      participant: participant,
      uniqueId: participant.uniqueId,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchParticipants = async (req, res) => {
  try {
    const participants = await getAllParticipants();
    res.status(200).json(participants); // directly return array (Admin.jsx expects array)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching participants",
    });
  }
};

export const fetchParticipantById = async (req, res) => {
  try {
    const participant = await getParticipantById(req.params.id);
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found",
      });
    }
    res.status(200).json(participant);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching participant",
    });
  }
};
