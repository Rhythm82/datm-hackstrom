// controllers/authController.js
import { loginAdminService,logoutService } from "../services/authService.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginAdminService(email, password);
    res.json({ message: "Login successful ✅", ...data });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};


export const logout = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const result = await logoutService(token);

    res.clearCookie("token"); // in case using httpOnly cookie
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
