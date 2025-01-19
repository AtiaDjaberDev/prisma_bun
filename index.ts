// import { PrismaClient } from "@prisma/client";
import { $ } from "bun";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
// import process from "process";
import config from "./drizzle.config.ts";
import { customersTable } from "./src/db/schema.ts";

// const prisma = new PrismaClient();

const host = process.argv[2] || import.meta.env.HOST;

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "sales",
});

console.log(config);

const db = drizzle(poolConnection);

const server = Bun.serve({
  port: 3000,
  hostname: host,
  idleTimeout: 120,
  async fetch(request) {
    const url = new URL(request.url);
    console.log(url.pathname);

    if (url.pathname === "/") {
      // const products = await prisma.category.findMany();
      // count the number of users
      // console.log(`Host ${import.meta.env.HOST}`);

      const customers = await db.select().from(customersTable);
      console.log("All :", customers);
      return Response.json(customers);
    } else {
      // const output = await $`npx prisma migrate dev --skip-generate`;
      // const output = await $`npx drizzle-kit push`;

      // console.log(output.exitCode);
      // return Response.json(output.text());

      [
        "ALTER TABLE `factures` ADD `runtime` varchar(255);",
        "CREATE TABLE `expenses` ( `id` serial AUTO_INCREMENT NOT NULL, `name` varchar(255) NOT NULL, CONSTRAINT `expenses_id` PRIMARY KEY(`id`) );",
        "ALTER TABLE `expenses` ADD `runtime` varchar(255);",
        "ALTER TABLE `expenses` ADD `car` varchar(255) NOT NULL;",
        "ALTER TABLE `expenses` ADD `car1` varchar(255) NOT NULL;",
        "ALTER TABLE `expenses` ADD `car2` varchar(255) NOT NULL;",
      ].forEach(async (query) => {
        await runMigration(query);
      });

      return Response.json("Run migrations successfuly!!!");
    }
  },
});

async function runMigration(query: string) {
  try {
    console.log(query);
    await db.execute(query);
  } catch (error) {
    console.log(query);
    console.error(error);
  }
}
console.log(`Listening on ${server.url}`);
