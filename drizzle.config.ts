 import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: "mysql://root@localhost:3306/sales",
  },
});
