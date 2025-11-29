import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env" // Docker
      : ".env.local", // Local dev
});

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: false,
  logging: false,

  // Works for CLI + ts-node
  entities: [path.join(__dirname, "../entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "../migrations/**/*.{ts,js}")],
});
