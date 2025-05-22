import Hotel from "../models/HotelModels.js";

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const createHotel = async (req, res) => {
  try {
    const { name, address, price_per_night, facilities, rooms_available, image_url } = req.body;

    if (!name || !address || !price_per_night || rooms_available == null) {
      return res.status(400).json({ msg: "Field wajib diisi" });
    }

    const newHotel = await Hotel.create({ name, address, price_per_night, facilities, rooms_available, image_url });
    res.status(201).json({ msg: "Hotel berhasil dibuat", hotel: newHotel });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ msg: "Hotel tidak ditemukan" });
    }
    await hotel.destroy();
    res.json({ msg: "Hotel berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ msg: "Hotel tidak ditemukan" });
    }

    await hotel.update(req.body);

    res.json({ msg: "Hotel berhasil diperbarui", hotel });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

