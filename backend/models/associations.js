import Booking from "./BookingModels.js";
import Hotel from "./HotelModels.js";
import User from "./UserModel.js";

// 🔁 Relasi antar model
Booking.belongsTo(Hotel, { foreignKey: "hotel_id" });
Hotel.hasMany(Booking, { foreignKey: "hotel_id" });

Booking.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Booking, { foreignKey: "user_id" });

export { Booking, Hotel, User };
