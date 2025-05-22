import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Hotel = db.define("hotels", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_per_night: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  facilities: {
    type: DataTypes.TEXT, // bisa simpan JSON string di sini
    allowNull: true,
  },
  rooms_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Hotel;
