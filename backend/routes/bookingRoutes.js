import express from "express";
import { createBooking, getBookings } from "../controller/bookingController.js";

const router = express.Router();

router.post("/createbooking", createBooking);
router.get("/bookings", getBookings);  // pastikan endpointnya konsisten

export default router;
