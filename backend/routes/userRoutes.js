import express from "express";
import { registerUser, getUserById, loginUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUserById); // Dapatkan data user by ID
router.post("/login", loginUser);

export default router;
