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
