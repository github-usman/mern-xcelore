import dotenv from "dotenv";
dotenv.config({ path: ".env" });


// server port and mode
const server = {
    serverPort: process.env.SERVER_PORT,
    serverMode: process.env.SERVER_MODE,
  };


  export const { serverMode, serverPort } = server;