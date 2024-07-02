import { jwtSecret } from "../config/env.config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import catchAysncErrors from "./catchAysncErrors.js";
import ErrorHandler from "../utils/error-handler.js";

// user authenticated
export const isAuthenticatedUser = catchAysncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }
  
    const decodeData = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decodeData.id);
  
    next();
  });

// Role base authentication
export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};
