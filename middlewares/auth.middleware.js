import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.models.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Try header first
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2️⃣ Fallback to cookie
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3️⃣ No token? Unauthorized
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, token missing",
      });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 5️⃣ Find user in DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // 6️⃣ Attach user to request
    req.user = user;

    // 7️⃣ Continue
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
