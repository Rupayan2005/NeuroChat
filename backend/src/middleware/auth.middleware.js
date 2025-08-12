import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.jwt;

    // If no cookie token, try Authorization header (for cross-origin issues)
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Bearer TOKEN
      }
    }

    if (!token) {
      console.log("No token found in cookies or headers");
      console.log("Cookies:", req.cookies);
      console.log("Authorization header:", req.headers.authorization);
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    console.log("Token found, verifying...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Token verification failed");
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    console.log("Token verified, finding user:", decoded.userId);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("User not found for token");
      return res.status(404).json({ message: "Unauthorized, user not found" });
    }

    console.log("User authenticated successfully:", user.email);
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
