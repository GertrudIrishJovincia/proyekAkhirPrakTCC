import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Hotel from "./HotelModels.js";

const RoomType = db.define("room_types", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hotel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {  // atau type_name
    type: DataTypes.STRING,
    allowNull: false,   // wajib diisi
  },
  price_per_night: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default RoomType;
