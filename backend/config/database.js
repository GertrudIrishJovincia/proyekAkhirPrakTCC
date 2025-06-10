import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST ? process.env.DB_HOST.trim() : '';

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: dbHost,
    dialect: 'mysql',
  }
);

export default db;