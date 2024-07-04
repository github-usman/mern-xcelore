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

const allowedOrigins = ['http://localhost:3000', 'https://mern-xcelore.netlify.app'];
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // Include Authorization header
  credentials: true // Allow sending cookies from the frontend
}));

// routes
app.use("/user", user);
app.use("/admin", admin);

// Middleware for errors
app.use(customErrorMiddleware);

export default app;
