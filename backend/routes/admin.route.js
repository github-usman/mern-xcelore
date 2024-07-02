import express from "express";
import {
  getAllUserProfile,
  registerAdmin,
} from "../controllers/admin.controller.js";
import { authorizeRole, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express();

// admin
router.post("/register", registerAdmin);
router.get(
  "/users",
  isAuthenticatedUser,
  authorizeRole('admin'),
  getAllUserProfile
);

export default router;
