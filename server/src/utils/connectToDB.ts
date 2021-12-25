import { Connection, createConnection } from "typeorm";
import { dbConfig } from "../config/db";
import { delay } from "./delay";

export const connectToDB = async (): Promise<Connection> => {
  try {
    console.log("Trying to connect to db");
    const conn = await createConnection(dbConfig);
    console.log("Connected to db");
    return conn;
  } catch (e) {
    console.log("Failed to connect to db because...");
    console.error(e);
    await delay(3000);
    return await connectToDB();
  }
};
