import express from "express";
import {
  createHotel,
  getHotels,
  updateHotel,
  deleteHotel,
} from "../controller/hotelController.js";

const router = express.Router();

router.post("/", createHotel);
router.get("/hotels", getHotels);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
