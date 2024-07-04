import express from "express";
import { serverPort, serverMode } from "./config/env.config.js";
import app from "./app.js";
const server = express();


// Handling Uncought Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejections`);
  process.exit(1);
});


server.use("/api/v1", app);

server.get('/',(req,res)=>{
  res.send(
    "Hello World!"
  )
})

server.listen(serverPort, () => {
  console.log(`server is running on port ${serverPort} in ${serverMode} mode`);
});


process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejections`);

  server.close(() => {
    process.exit(1);
  });
});
