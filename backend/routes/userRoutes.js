import express from "express";
import { registerUser, getUserById, loginUser,getAllUsers } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUserById); 
router.post("/login", loginUser);
router.get("/", getAllUsers); 


export default router;
