import express from "express";
import { createHotel, getHotels, deleteHotel } from "../controller/hotelController.js";

const router = express.Router();

router.post("/hotels", createHotel);
router.get("/hotels", getHotels);
// router.put("/:id", updateHotel);
router.delete("/hotels/:id", deleteHotel);

export default router;
