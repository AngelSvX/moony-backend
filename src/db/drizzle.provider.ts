import { drizzle } from "drizzle-orm/mysql2"
import { createPool } from "mysql2/promise"

export const DrizzleProvider = {
    provide: 'DIZZLE_DB',
    useFactory: async () => {
        const pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
        })

        return drizzle
    }
}