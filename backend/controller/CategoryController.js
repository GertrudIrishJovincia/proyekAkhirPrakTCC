import Category from "../models/Category.js";

// Ambil semua kategori produk
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Tambah kategori produk
export const createCategory = async (req, res) => {
  try {
    const { type, description } = req.body;
    const newCategory = await Category.create({ type, description });
    res.status(201).json({ msg: "Kategori berhasil dibuat", category: newCategory });
  } catch (error) {
    res.status(500).json({ msg: "Gagal membuat kategori" });
  }
};
