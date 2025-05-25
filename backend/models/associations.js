import Booking from './BookingModels.js';
import Hotel from './HotelModels.js';
import User from './UserModel.js';
import RoomType from "./RoomType.js";

Booking.belongsTo(Hotel, { foreignKey: 'hotel_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Hotel.hasMany(Booking, { foreignKey: 'hotel_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

Booking.belongsTo(User, { foreignKey: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Booking, { foreignKey: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

RoomType.belongsTo(Hotel, { foreignKey: "hotel_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Hotel.hasMany(RoomType, { foreignKey: "hotel_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

console.log('Associations initialized');

export { Booking, Hotel, User, RoomType };
