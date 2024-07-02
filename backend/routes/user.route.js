import express from "express";
import {
  loginUser,
  logoutUser,
  profileUser,
  registerUser,
  updateUserProfile
} from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express();

// profile
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",isAuthenticatedUser, logoutUser);
router
  .route("/me")
  .get(isAuthenticatedUser,profileUser)
  .put(isAuthenticatedUser,updateUserProfile)

export default router;
