import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const loginAdminService = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Admin not found ❌");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials ❌");

  // create token
  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { token, email: admin.email };
};


export const logoutService = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Remove the token from the Admin's active tokens list
    await Admin.updateOne(
      { _id: decoded.id },
      { $pull: { tokens: token } }
    );

    return { message: "Logout successful" };
  } catch (err) {
    throw new Error("Invalid token or logout failed");
  }
};
