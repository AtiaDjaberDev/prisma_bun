import { PrismaClient } from "@prisma/client";
import { $ } from "bun";
// import process from "process";

const prisma = new PrismaClient();

const host = process.argv[2] || import.meta.env.HOST;
 
const server = Bun.serve({
  port: 3000,
  hostname: host,
  idleTimeout: 120,
  async fetch(request) {
    const url = new URL(request.url);
    console.log(url.pathname);

    if (url.pathname === "/test") {
      const products = await prisma.category.findMany();
      // count the number of users
      console.log(`Host ${import.meta.env.HOST}`);
      return Response.json(products);
      
    }else{
      const output = await $`npx prisma migrate dev --skip-generate`;
      console.log(output.exitCode);
  
      return Response.json(output);
    }

  },
});

console.log(`Listening on ${server.url}`);
