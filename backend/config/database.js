import { Sequelize } from "sequelize";

const db = new Sequelize('hotels', 'root', 'dbhotels', {
  host: '34.56.122.248',
  dialect: 'mysql'
});

export default db;
