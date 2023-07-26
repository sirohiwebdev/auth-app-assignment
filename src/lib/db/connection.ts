import { DataSource } from "typeorm";
import { User } from "./entities";

export const mongoDB = new DataSource({
  type: "mongodb",
  host: process.env["MONGODB_HOST"],
  port: Number(process.env["MONGODB_PORT"]),
  database: process.env["MONGODB_DATABASE"],
  entities: [User],
});
