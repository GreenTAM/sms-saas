import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./app/db/schema.ts",
    dialect: "mysql",
    out: "./drizzle",
    dbCredentials: {
        host: process.env.DB_HOST || "",
        user: process.env.DB_USER || "",
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME || "",
    },
    verbose: true,
    strict: true
})