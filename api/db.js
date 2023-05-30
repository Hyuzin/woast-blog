import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";
const dbUrl = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// Konfigurasi koneksi ke database
export const db = mysql.createConnection(dbUrl);
