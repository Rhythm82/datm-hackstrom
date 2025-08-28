import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.ADMIN_EMAIL, 
    pass: process.env.ADMIN_PASS, 
  },
});
