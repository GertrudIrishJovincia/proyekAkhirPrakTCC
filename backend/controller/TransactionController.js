import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";

// Ambil semua transaksi
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [{ model: Product, attributes: ['name'] }]
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Buat transaksi baru
export const createTransaction = async (req, res) => {
  try {
    const { user_id, product_id, quantity, total_price } = req.body;

    // Pastikan produk ada dan stok mencukupi
    const product = await Product.findByPk(product_id);
    if (!product || product.stock < quantity) {
      return res.status(400).json({ msg: "Produk tidak cukup stok" });
    }

    // Kurangi stok produk
    await product.update({ stock: product.stock - quantity });

    const newTransaction = await Transaction.create({ user_id, product_id, product_name: product.name, quantity, total_price });
    res.status(201).json({ msg: "Transaksi berhasil dibuat", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ msg: "Gagal membuat transaksi" });
  }
};
