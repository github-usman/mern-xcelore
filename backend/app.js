import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectMongoDB from "./connect-DB/db.js";
import user from "./routes/user.route.js";
import admin from "./routes/admin.route.js";
import { customErrorMiddleware } from "./middlewares/error.js";
import {serverBaseUrl} from "./config/env.config.js";

// MONGO DATABASE
connectMongoDB();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: serverBaseUrl,
    credentials: true,
  }));

// routes
app.use("/user", user);
app.use("/admin", admin);

// Middleware for errors
app.use(customErrorMiddleware);

export default app;
