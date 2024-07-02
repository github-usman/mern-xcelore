import { jwtSecret } from "../config/env.config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// user authenticated
export const isAuthenticatedUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `problem due to ${error}`,
    });
  }
};
