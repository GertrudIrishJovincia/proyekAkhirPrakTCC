import { Booking, Hotel } from "../models/associations.js";

// Ambil semua booking
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: Hotel, attributes: ['name'] }],
      order: [['created_at', 'DESC']],
    });

    const formatted = bookings.map(b => ({
      id: b.id,
      guest_name: b.guest_name,
      guest_email: b.guest_email,
      guest_phone: b.guest_phone,
      room_type: b.room_type,
      check_in_date: b.check_in_date,
      check_out_date: b.check_out_date,
      total_price: b.total_price,
      hotel_id: b.hotel_id,
      hotel_name: b.Hotel?.name || '-',
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil booking" });
  }
};

// Buat booking baru
export const createBooking = async (req, res) => {
  try {
    console.log('Body booking:', req.body); // Debug: lihat data masuk

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

    if (!hotel_id || !guest_name || !guest_email || !guest_phone || !room_type || !check_in_date || !check_out_date || !total_price) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    if (!user_id) {
      return res.status(400).json({ msg: "User ID wajib diisi" });
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
    console.error('Error di createBooking:', error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    if (!user_id) return res.status(400).json({ msg: "User ID wajib diisi" });

    const bookings = await Booking.findAll({
      where: { user_id },
      include: [{
        model: Hotel,
        attributes: ["id", "name"], // name akan masuk ke b.Hotel.name
      }],
      order: [["created_at", "DESC"]],
    });

    const formatted = bookings.map(b => ({
      id: b.id,
      hotel_id: b.hotel_id,
      guest_name: b.guest_name,
      guest_email: b.guest_email,
      guest_phone: b.guest_phone,
      room_type: b.room_type,
      check_in_date: b.check_in_date,
      check_out_date: b.check_out_date,
      total_price: b.total_price,
      hotel_name: b.Hotel?.name || "-", // ambil dari b.Hotel.name
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil booking user" });
  }
};