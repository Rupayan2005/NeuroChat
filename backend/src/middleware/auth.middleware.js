import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.jwt;

    // If no cookie token, try Authorization header (for cross-origin issues)
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // Bearer TOKEN
    }

    if (!token) {
      console.log("No token found in cookies or headers");
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Token verification failed");
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("User not found for token");
      return res.status(404).json({ message: "Unauthorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
