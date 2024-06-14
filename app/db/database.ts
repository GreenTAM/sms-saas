import { drizzle  } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_HOST,
    database: process.env.DB_HOST,

});

const database = drizzle(connection);

export default database;