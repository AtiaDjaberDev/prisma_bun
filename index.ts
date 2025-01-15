import { PrismaClient } from "@prisma/client";
import { $ } from "bun";


import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";
import * as dotenv from "dotenv";
import { customersTable } from "./src/db/schema";
dotenv.config();

const prisma = new PrismaClient();

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sales",
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

    // const output = await $`cd .. && npx drizzle-kit push`;
    // console.log(output.exitCode);
 
    const customers = await db.select().from(customersTable);
    console.log("All Customers:", customers);
    return Response.json(customers);
  },
});

console.log(`Listening on ${server.url}`);
