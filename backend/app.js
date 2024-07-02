import express from "express";
import bodyParser from "body-parser";
import connectMongoDB from "./database/db.js";
import user from "./routes/user.route.js";

// MONGO DATABASE
connectMongoDB();
const app = express();
app.use(bodyParser.json());

// routes
app.use("/user", user);


export default app;
