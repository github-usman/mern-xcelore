import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectMongoDB from "./database/db.js";
import user from "./routes/user.route.js";
import admin from "./routes/admin.route.js";

// MONGO DATABASE
connectMongoDB();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use("/user", user);
app.use("/admin", admin);


export default app;
