import "./models/associations.js";
import express from "express";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js"; // Impor route kategori
import transactionRoutes from "./routes/TransactionRoutes.js"; // Impor route transaksi
import productRoutes from "./routes/ProductRoutes.js"; // Impor route produk
import dotenv from 'dotenv';

dotenv.config();

// Menangani unhandled rejections dan uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

const app = express();

// CORS Setup
const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://localhost:3002",
  "https://proyekakhirpraktcc-174534490336.us-central1.run.app",
  "https://proyekakhirpraktcc-fe-dot-f-12-450706.uc.r.appspot.com"
]);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true,
}));

// Middleware untuk parsing request body
app.use(express.json());

// Definisikan routes untuk aplikasi
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes); // Tambahkan route kategori
app.use("/api/transactions", transactionRoutes); // Tambahkan route transaksi
app.use("/api/products", productRoutes); // Tambahkan route produk

// Endpoint Health dan Root
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => res.send('Server is up'));

// Menampilkan environment variables
console.log("====== ENVIRONMENT VARIABLES ======");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.PORT);
console.log("===================================");

// Fungsi untuk menjalankan server
const startServer = async () => {
  const PORT = process.env.PORT || 8080;

  try {
    console.log("📡 Mencoba koneksi ke database...");
    await db.authenticate();
    console.log("✅ Koneksi database berhasil!");

    // Jika diperlukan, kamu bisa menambahkan db.sync()
    // await db.sync(); // hanya jika kamu yakin DB stabil

  } catch (error) {
    console.error("❌ Gagal koneksi/sinkronisasi database:", error);
  } finally {
    app.listen(PORT, () => console.log(`🚀 Server tetap listen di port ${PORT}`));
  }
};

startServer();
