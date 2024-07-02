import { jwtSecret } from "../config/env.config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// user authenticated
export const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: `Please Login to access this resource `,
      });
    }
  
    const decodeData = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decodeData.id);
  
    next();
  };

// Role base authentication
export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role: ${req.user.role} is not allowed to access this resouce `,
      });
    }
    next();
  };
};
