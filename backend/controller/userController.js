import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.json(user);
  } catch (error) {
    console.error("Error di getUserById:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const registerUser = async (req, res) => {
  try {
    console.log("Body request register:", req.body);

    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ msg: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ msg: "User berhasil dibuat", user: newUser });
  } catch (error) {
    console.error("Error di registerUser:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "phone", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error di getAllUsers:", error);
    res.status(500).json({ msg: "Gagal mengambil data user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Body request login:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email dan password wajib diisi" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error("ACCESS_TOKEN_SECRET belum diset di environment");
      return res.status(500).json({ msg: "Server error: secret token belum diset" });
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Error di loginUser:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};
