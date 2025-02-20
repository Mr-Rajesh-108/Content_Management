import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { encryptPassword, hashToken } from "../../lib/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token, email, password } = req.body;
    const hashed = hashToken(token);
    try {
      await dbConnect();
      const user = await User.findOne({ resetPasswordToken: hashed });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      } else if (user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({ message: "Token Expired" });
      } else {
        const hashedPassword = encryptPassword(password);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error, please try again" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
