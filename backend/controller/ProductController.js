import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Ambil semua produk
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['type'] }]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Tambah produk baru
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image_url } = req.body;
    const newProduct = await Product.create({ name, description, price, category, stock, image_url });
    res.status(201).json({ msg: "Produk berhasil dibuat", product: newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Gagal membuat produk" });
  }
};

// Update produk
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, category, stock, image_url } = req.body;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    await product.update({ name, description, price, category, stock, image_url });
    res.json({ msg: "Produk berhasil diperbarui", product });
  } catch (error) {
    res.status(500).json({ msg: "Gagal memperbarui produk" });
  }
};

// Hapus produk
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.json({ msg: "Produk berhasil dihapus" });
    } else {
      res.status(404).json({ msg: "Produk tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Gagal menghapus produk" });
  }
};
