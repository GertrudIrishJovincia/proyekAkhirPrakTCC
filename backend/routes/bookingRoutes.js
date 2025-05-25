import express from "express";
import { createBooking, getBookings, getUserBookings, updateBooking } from "../controller/bookingController.js";

const router = express.Router();

router.post("/createbooking", createBooking);
router.get("/bookings", getBookings);
router.get("/userbookings", getUserBookings); 
router.put("/bookings/:id", updateBooking);


export default router;
