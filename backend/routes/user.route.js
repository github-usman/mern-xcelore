import express from "express";
import {
  deleteUser,
  profileUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
const router = express();

// profile
router.post("/register", registerUser);
router
  .route("/profile/:id")
  .get(profileUser)
  .put(updateUserProfile)
  .delete(deleteUser);

export default router;
