import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
export const customersTable = mysqlTable("customers", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  debt: int().notNull(),
  test: int(),
  hello: int(),
  hello2: int(),
  hello3: int(),
  hell: int(),
  ancien: int().notNull(),
});
