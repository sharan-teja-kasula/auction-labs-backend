import { Pool } from "pg";

const dbConnect = async () => {
  try {
    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    const pool = new Pool({
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      database: DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await pool.connect();

    return pool;
  } catch (err) {
    throw err;
  }
};

export default dbConnect;
