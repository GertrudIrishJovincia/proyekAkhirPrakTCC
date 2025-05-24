import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";
import Hotel from "./HotelModels.js";

const Booking = db.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  hotel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Hotel,
      key: "id",
    },
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

// Setelah Booking terdefinisi, baru buat relasi
Booking.belongsTo(Hotel, { foreignKey: "hotel_id" });
Booking.belongsTo(User, { foreignKey: "user_id" });

export default Booking;