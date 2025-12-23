import { Injectable, OnModuleInit } from "@nestjs/common";
import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from 'mysql2';
import * as schema from './schema';

@Injectable()
export class DrizzleService implements OnModuleInit{
    public db: ReturnType<typeof drizzle>;
    private pool: mysql.Pool;

    async onModuleInit() {
        this.pool = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
        });

        this.db = drizzle(this.pool, {schema, mode: 'default'})
    }
}