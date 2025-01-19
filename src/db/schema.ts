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

export const facturesTable = mysqlTable("factures", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  desc: varchar({ length: 255 }),
  test: varchar({ length: 255 }),
  oro: varchar({ length: 255 }),
  waki: varchar({ length: 255 }),
  zaki: varchar({ length: 255 }),
  yousef: varchar({ length: 255 }),
  version2: varchar({ length: 255 }),
  ikram: varchar({ length: 255 }),
  debt: int().notNull(),
});


export const expenseTable = mysqlTable("expenses", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(), 
  car: varchar({ length: 255 }).notNull(), 
  car1: varchar({ length: 255 }).notNull(), 
  ca2: varchar({ length: 255 }).notNull(), 
});
 