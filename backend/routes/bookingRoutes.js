import express from "express";
import { createBooking, getBookings, getUserBookings } from "../controller/bookingController.js";

const router = express.Router();

router.post("/createbooking", createBooking);
router.get("/bookings", getBookings);
router.get("/userbookings", getUserBookings); // pastikan ada

export default router;
