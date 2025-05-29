import Booking from './BookingModels.js';
import Hotel from './HotelModels.js';
import User from './UserModel.js';
import RoomType from "./RoomType.js";

// Relasi Booking → Hotel
Booking.belongsTo(Hotel, { foreignKey: 'hotel_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Hotel.hasMany(Booking, { foreignKey: 'hotel_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

// Relasi Booking → User
Booking.belongsTo(User, { foreignKey: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Booking, { foreignKey: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

// Relasi Hotel → RoomType
Hotel.hasMany(RoomType, {
  foreignKey: "hotel_id",
  as: "room_types", // <== hanya di sini alias room_types digunakan
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
RoomType.belongsTo(Hotel, {
  foreignKey: "hotel_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

console.log('Associations initialized');

export { Booking, Hotel, User, RoomType };
