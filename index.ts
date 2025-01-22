// import { PrismaClient } from "@prisma/client";
import { drizzle, type MySqlRawQueryResult } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import config from "./drizzle.config.ts";
import { customersTable } from "./src/db/schema.ts";

const host = process.argv[2] || import.meta.env.HOST;
let migrationsResult: string[] = [];

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
  hostname: "localhost",
  // idleTimeout:  ,
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
      migrationsResult = [];
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

      return Response.json(migrationsResult);
    }
  },
});

async function runMigration(query: string) {
  try {
    await db.execute(query);
    migrationsResult.push("Query excuted " + query);
  } catch (error: any) {
    console.log(migrationsResult.length);

    if (error.errno == 1060) {
      console.log("Already applied => " + query);
      migrationsResult.push("Already applied => " + query);
    } else if (error.errno == 1050) {
      console.log("Table Already exists => " + query);
      migrationsResult.push("Already applied => " + query);
    } else {
      migrationsResult.push("Error => " + error.sqlMessage);
      console.error(error);
    }
  }
}

//
console.log(`Listening on ${server.url}`);
