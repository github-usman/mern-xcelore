import express from "express";
import { serverPort, serverMode } from "./config/env.config.js";
import app from "./app.js";
const server = express();

server.use("/api/v1", app);

server.listen(serverPort, () => {
  console.log(`server is running on port ${serverPort} in ${serverMode} mode`);
});
