import bcrypt from 'bcrypt';
import User from "../models/UserModel.js";

// Ambil semua user
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Tambah user (register sederhana tanpa hash password)
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ msg: "Email sudah digunakan" });
    }

    const newUser = await User.create({ name, email, phone, password });
    res.status(201).json({ msg: "User berhasil dibuat", user: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    if (user.password !== password) {
      return res.status(400).json({ msg: "Password salah" });
    }

    res.status(200).json({ msg: "Login berhasil", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};