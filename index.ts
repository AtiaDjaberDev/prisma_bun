import { PrismaClient } from "@prisma/client";
import { $ } from "bun";
// import process from "process";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { customersTable } from "./src/db/schema";

const prisma = new PrismaClient();

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "sales",
});

// إنشاء كائن Drizzle
const db = drizzle(poolConnection);

// create a new user

const host = process.argv[2] || "localhost";

const server = Bun.serve({
  port: 3000,
  hostname: "localhost",
  idleTimeout: 120,
  async fetch(request) {
    const url = new URL(request.url);
    console.log(url.pathname);

    if (url.pathname === "/test") {
      const customers = await db.select().from(customersTable);
      console.log("All Customers:", customers);
      return Response.json(customers);
    } else {
      const output = await $`npx drizzle-kit push`;
      console.log(output.exitCode);
      return Response.json(output.text());
    }
  },
});

console.log(`Listening on ${server.url}`);
