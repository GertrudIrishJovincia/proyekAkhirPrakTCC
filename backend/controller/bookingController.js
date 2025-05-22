import Booking from "../models/BookingModels.js";

// Ambil semua booking
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Buat booking baru
export const createBooking = async (req, res) => {
  try {
    const {
      user_id,
      hotel_id,
      guest_name,
      guest_email,
      guest_phone,
      room_type,
      check_in_date,
      check_out_date,
      total_price,
    } = req.body;

    if (!user_id || !hotel_id || !guest_name || !guest_email || !guest_phone || !room_type || !check_in_date || !check_out_date || !total_price) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    const newBooking = await Booking.create({
      user_id,
      hotel_id,
      guest_name,
      guest_email,
      guest_phone,
      room_type,
      check_in_date,
      check_out_date,
      total_price,
    });

    res.status(201).json({ msg: "Booking berhasil dibuat", booking: newBooking });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};
