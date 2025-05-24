import express from "express";
import { createHotel, getHotels, deleteHotel } from "../controller/hotelController.js";

const router = express.Router();

router.post("/", createHotel);
router.get("/", getHotels);
// router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
