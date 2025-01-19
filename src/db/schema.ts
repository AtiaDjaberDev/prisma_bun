import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
<<<<<<< HEAD
//
=======
>>>>>>> d7d76dbef99f53985240c643fab7abbb1ff36cb4
export const customersTable = mysqlTable("customers", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  debt: int().notNull(),
  test: int(),
  hello: int(),
  hello2: int(),
<<<<<<< HEAD
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
=======
  ancien: int().notNull(),
});
>>>>>>> d7d76dbef99f53985240c643fab7abbb1ff36cb4
