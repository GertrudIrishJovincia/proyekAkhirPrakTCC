import express from "express";
import {
  createHotel,
  getHotels,
  getHotelById,   // ✅ Tambahkan ini
  deleteHotel,
} from "../controller/hotelController.js";

const router = express.Router();

// Buat hotel baru
router.post("/", createHotel);

// Ambil semua hotel
router.get("/", getHotels);

// ✅ Ambil hotel berdasarkan ID
router.get("/:id", getHotelById);

// Hapus hotel
router.delete("/:id", deleteHotel);

export default router;
