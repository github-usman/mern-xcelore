import express from "express";
import {
  deleteUser,
  getAllUserProfile,
  getSinglUserProfile,
  registerAdmin,
  updateUserProfile,
} from "../controllers/admin.controller.js";
import { authorizeRole, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express();


// For new admin registeration
router.post("/first-time-admin-hidden/register", registerAdmin);

// admin
router.post("/register",isAuthenticatedUser,authorizeRole('admin'), registerAdmin); //Create

// View all users in DB
router.get(
  "/users",
  isAuthenticatedUser,
  authorizeRole("admin"),
  getAllUserProfile
);

// Particular Single Users Operation
router
  .route("/user/:id")
  .get(isAuthenticatedUser,authorizeRole('admin'),getSinglUserProfile)  // Read
  .put(isAuthenticatedUser,authorizeRole('admin'),updateUserProfile)  // Update
  .delete(isAuthenticatedUser,authorizeRole('admin'),deleteUser);   // delete

export default router;
