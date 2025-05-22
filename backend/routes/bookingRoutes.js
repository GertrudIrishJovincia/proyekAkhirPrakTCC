import express from "express";
import { createBooking, getBookings } from "../controller/bookingController.js";

const router = express.Router();

router.post("/createbooking", createBooking);
router.get("/booking", getBookings);

export default router;
