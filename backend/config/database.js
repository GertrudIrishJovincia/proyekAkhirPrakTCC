import { Sequelize } from "sequelize";

const db = new Sequelize('hotels', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;
