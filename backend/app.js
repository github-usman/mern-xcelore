import express from "express";
import connectMongoDB from "./database/db.js";

// MONGO DATABASE
connectMongoDB();

const app = express();

export default app;
