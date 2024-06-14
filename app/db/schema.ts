import { datetime, int, mysqlTable, text } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users",{
    id: int("id").primaryKey().autoincrement(),
    name: text("name"),
    email: text("email"),
    password: text("password"),
    createdAt: datetime("created_at"),
    updatedAt: datetime("updated_at"),
});