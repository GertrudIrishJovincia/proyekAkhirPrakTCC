import RoomType from "../models/RoomType.js";

// Tambah tipe kamar
export const createRoomType = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { type, price_per_night, stock } = req.body;

    if (!type || !price_per_night || !stock) {
      return res.status(400).json({ msg: 'Field tipe kamar wajib diisi' });
    }

    const newRoomType = await RoomType.create({
      hotel_id: hotelId,
      type,
      price_per_night,
      stock,
    });

    res.status(201).json({ msg: 'Tipe kamar berhasil ditambahkan', roomType: newRoomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Terjadi kesalahan server' });
  }
};

// Ambil semua tipe kamar untuk hotel tertentu
export const getRoomTypes = async (req, res) => {
  try {
    const hotel_id = req.params.hotelId;
    const roomTypes = await RoomType.findAll({ where: { hotel_id } });
    res.json(roomTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil tipe kamar" });
  }
};

// Update tipe kamar
export const updateRoomType = async (req, res) => {
  try {
    const id = req.params.id;
    const { type_name, price_per_night, stock } = req.body;

    const roomType = await RoomType.findByPk(id);
    if (!roomType) return res.status(404).json({ msg: "Tipe kamar tidak ditemukan" });

    await roomType.update({ type_name, price_per_night, stock });

    res.json({ msg: "Tipe kamar berhasil diperbarui", roomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal memperbarui tipe kamar" });
  }
};

// Hapus tipe kamar
export const deleteRoomType = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await RoomType.destroy({ where: { id } });

    if (deleted) {
      res.json({ msg: "Tipe kamar berhasil dihapus" });
    } else {
      res.status(404).json({ msg: "Tipe kamar tidak ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal menghapus tipe kamar" });
  }
};
