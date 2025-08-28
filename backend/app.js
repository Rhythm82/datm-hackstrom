import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import participantRoutes from "./routes/participantRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB(); // connect MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON data
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/hackstrom/participants", participantRoutes);
app.use("/api/v1/hackstrom/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("HackStrom API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
