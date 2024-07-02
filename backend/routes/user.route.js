import express from "express";
import {
  deleteUser,
  loginUser,
  profileUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
const router = express();

// profile
router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/profile/:id")
  .get(profileUser)
  .put(updateUserProfile)
  .delete(deleteUser);

export default router;
