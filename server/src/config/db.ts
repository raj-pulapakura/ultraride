import { ConnectionOptions } from "typeorm";
import { env } from "../constants";
import { Account } from "../entities/Account";
import { Product } from "../entities/Product";
import { Purchase } from "../entities/Purchase";

export const dbConfig: ConnectionOptions = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  type: "mysql",
  synchronize: true,
  entities: [Account, Product, Purchase],
};
