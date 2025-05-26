import express from "express";
import { registerUser, getUserById, loginUser, getAllUsers } from "../controller/userController.js";
import { verifyToken, isAdmin } from '../verifyToken.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", verifyToken, getUserById); // proteksi optional sesuai kebutuhan
router.get("/", verifyToken, isAdmin, getAllUsers); // hanya admin bisa lihat semua user

export default router;
