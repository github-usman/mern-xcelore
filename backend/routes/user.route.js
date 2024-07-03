import express from "express";
import {
  deleteUser,
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
router.post("/logout", logoutUser);
router
  .route("/me")
  .get(isAuthenticatedUser,profileUser)
  .put(isAuthenticatedUser,updateUserProfile)
  .delete(isAuthenticatedUser,deleteUser);

export default router;
