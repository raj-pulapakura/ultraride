import { ConnectionOptions } from "typeorm";
import { env } from "../constants";
import { AccountEntity } from "../features/Account/AccountEntity";
import { ProductEntity } from "../features/Product/ProductEntity";
import { TagEntity } from "../features/Tag/TagEntity";

export const dbConfig: ConnectionOptions = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  type: "mysql",
  synchronize: true,
  entities: [AccountEntity, ProductEntity, TagEntity],
};
