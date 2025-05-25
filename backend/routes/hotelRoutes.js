// import express from "express";
// import {
//   createHotel,
//   getHotels,
//   getHotelById,   // ✅ Tambahkan ini
//   deleteHotel,
//   updateHotel,
//   getHotelsWithPriceRange
// } from "../controller/hotelController.js";

// const router = express.Router();

// // Buat hotel baru
// router.post("/", createHotel);
// // router.get("/", getHotels);
// router.get("/with-price-range", getHotelsWithPriceRange);

// // Ambil semua hotel


// // ✅ Ambil hotel berdasarkan ID
// router.get("/:id", getHotelById);

// // Hapus hotel
// router.delete("/:id", deleteHotel);

// router.put('/:id', updateHotel); // handler updateHotel di backend








// export default router;


import express from "express";
import {
  createHotel,
  getHotelsWithPriceRange,
  getHotelById,
  deleteHotel,
  updateHotel,
} from "../controller/hotelController.js";

const router = express.Router();

router.post("/", createHotel);

// ** LETAKKAN ROUTE getHotelsWithPriceRange SEBELUM route /:id agar tidak tertangkap sebagai id **
router.get("/", getHotelsWithPriceRange);

router.get("/:id", getHotelById);

router.delete("/:id", deleteHotel);

router.put("/:id", updateHotel);

export default router;


