// routes/authRoutes.js
import express from "express";
import { loginAdmin,logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Login route
router.post("/login", loginAdmin);

// Protected admin route
router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: "Welcome Admin ", email: req.user.email });
});

router.post("/logout", logout);

export default router;
