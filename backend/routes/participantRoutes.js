import express from "express";
import {
  registerParticipant,
  fetchParticipants,
  fetchParticipantById,
} from "../controllers/participantController.js";

const router = express.Router();

router.post("/register", registerParticipant);
router.get("/get-participants", fetchParticipants);
router.get("/:id", fetchParticipantById);

export default router;
