import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Booking = db.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hotel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  guest_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guest_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guest_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  room_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  check_in_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  check_out_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Booking;
