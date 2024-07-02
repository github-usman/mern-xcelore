import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// server port and mode
const server = {
  serverPort: process.env.SERVER_PORT,
  serverMode: process.env.SERVER_MODE,
};

// database connectivity
const database = {
  dbUri: process.env.DB_URI,
  dbName: process.env.DB_NAME,
};

export const { serverMode, serverPort } = server;
export const { dbUri, dbName } = database;
