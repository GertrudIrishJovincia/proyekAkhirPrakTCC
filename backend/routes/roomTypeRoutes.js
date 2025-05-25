import express from "express";
import {
  createRoomType,
  getRoomTypes,
  updateRoomType,
  deleteRoomType,
} from "../controller/roomTypeController.js";

const router = express.Router({ mergeParams: true });

// CRUD tipe kamar per hotel
router.post("/hotels/:hotelId/roomtypes", createRoomType);
router.get("/hotels/:hotelId/roomtypes", getRoomTypes);
router.put("/roomtypes/:id", updateRoomType);
router.delete("/roomtypes/:id", deleteRoomType);

export default router;
