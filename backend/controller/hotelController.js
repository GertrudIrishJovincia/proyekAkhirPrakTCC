import Hotel from "../models/HotelModels.js";
import Booking from "../models/BookingModels.js";
import RoomType from "../models/RoomType.js";

// ✅ Ambil semua hotel
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// ✅ Ambil hotel berdasarkan ID
export const getHotelById = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel tidak ditemukan" });
    }

    res.json(hotel);
  } catch (error) {
    console.error("Gagal ambil hotel:", error.message);
    res.status(500).json({ message: "Gagal mengambil data hotel" });
  }
};

export const getHotelsWithPriceRange = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();

    const hotelsWithPriceRange = await Promise.all(hotels.map(async (hotel) => {
      const roomTypes = await RoomType.findAll({
        where: { hotel_id: hotel.id },
        attributes: ['price_per_night', 'stock']
      });

      const prices = roomTypes
        .map(rt => Number(rt.price_per_night))
        .filter(price => !isNaN(price));

      const totalStock = roomTypes.reduce((sum, rt) => sum + rt.stock, 0);

      const price_min = prices.length > 0 ? Math.min(...prices) : null;
      const price_max = prices.length > 0 ? Math.max(...prices) : null;

      return {
        ...hotel.toJSON(),
        price_min,
        price_max,
        rooms_available: totalStock,
      };
    }));

    res.json(hotelsWithPriceRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil data hotel dengan range harga" });
  }
};


// ✅ Tambah hotel baru
// export const createHotel = async (req, res) => {
//   try {
//     console.log("REQ BODY createHotel:", req.body);  // debug data masuk

//     const {
//       name,
//       address,
//       price_per_night,
//       facilities,
//       rooms_available,
//       image_url,
//     } = req.body;

//     if (!name || !address || price_per_night === undefined || rooms_available == null) {
//       return res.status(400).json({ msg: "Field wajib diisi" });
//     }

//     const newHotel = await Hotel.create({
//       name,
//       address,
//       price_per_night,
//       facilities,
//       rooms_available,
//       image_url,
//     });

//     res.status(201).json({ msg: "Hotel berhasil dibuat", hotel: newHotel });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ msg: "Terjadi kesalahan server" });
//   }
// };

export const createHotel = async (req, res) => {
  try {
    const {
      name,
      address,
      facilities,
      image_url,
      // price_per_night, // bisa dihilangkan
      // rooms_available, // bisa dihilangkan
    } = req.body;

    if (!name || !address) {
      return res.status(400).json({ msg: "Field wajib diisi" });
    }

    const newHotel = await Hotel.create({
      name,
      address,
      facilities,
      image_url,
      price_per_night: 0, // default 0
      rooms_available: 0, // default 0
    });

    res.status(201).json({ msg: "Hotel berhasil dibuat", hotel: newHotel });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// ✅ Hapus hotel (dan semua booking terkait)
export const deleteHotel = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Delete hotel id:", id);

    try {
      await Booking.destroy({ where: { hotel_id: id } });
      console.log("Deleted bookings for hotel:", id);
    } catch (err) {
      console.error("Error deleting bookings:", err);
      return res.status(500).json({ message: "Gagal menghapus booking terkait" });
    }

    try {
      const deleted = await Hotel.destroy({ where: { id } });
      console.log("Deleted hotel:", deleted);

      if (deleted) {
        return res.json({ message: "Hotel berhasil dihapus" });
      } else {
        return res.status(404).json({ message: "Hotel tidak ditemukan" });
      }
    } catch (err) {
      console.error("Error deleting hotel:", err);
      return res.status(500).json({ message: "Gagal menghapus hotel" });
    }
  } catch (error) {
    console.error("Error deleteHotel:", error);
    res.status(500).json({ message: error.message });
  }
};



// ✅ Update hotel
export const updateHotel = async (req, res) => {
  const id = req.params.id;
  const { name, address, price_per_night, facilities, rooms_available, image_url } = req.body;

  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ msg: 'Hotel tidak ditemukan' });
    }

    await hotel.update({
      name,
      address,
      price_per_night,
      facilities,
      rooms_available,
      image_url,
    });

    res.json({ msg: 'Hotel berhasil diperbarui', hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Gagal memperbarui hotel' });
  }
};





