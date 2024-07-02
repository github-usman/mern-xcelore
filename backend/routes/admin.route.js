import express from "express";
import { getAllUserProfile, registerAdmin } from "../controllers/admin.controller.js";
const router = express();


// admin
router.post("/register", registerAdmin);
router.get("/users", getAllUserProfile);

export default router;
