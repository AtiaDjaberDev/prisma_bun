import { PrismaClient } from "@prisma/client";
import { $ } from "bun";

const prisma = new PrismaClient();

// create a new user

const host = process.argv[2] || "localhost";

const server = Bun.serve({
  port: 3000,
  hostname: host,
  idleTimeout: 120,
  async fetch(request) {
    const output1 = await $`ls`.text();
    console.log(output1);
    const output = await $`npx prisma migrate dev`;
    console.log(output);
    const products = await prisma.clients.findMany( );

// count the number of users
console.log(`There are ${products.length} users in the database.`);
    return Response.json(products);
  },
});

console.log(`Listening on ${server.url}`);
