import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";

// Ambil semua transaksi
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [{ 
        model: Product, 
        as: 'productInfo', // Use alias from associations
        attributes: ['name'] 
      }]
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

    // Pastikan produk ada
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(400).json({ msg: "Produk tidak ditemukan" });
    }

    const newTransaction = await Transaction.create({ 
      user_id, 
      product_id, 
      product_name: product.name, 
      quantity, 
      total_price 
    });
    
    res.status(201).json({ msg: "Transaksi berhasil dibuat", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ msg: "Gagal membuat transaksi" });
  }
};