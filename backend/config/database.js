import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();  // Memastikan .env terbaca dengan benar

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,  // Pastikan port 3306
  }
);

export default db;

