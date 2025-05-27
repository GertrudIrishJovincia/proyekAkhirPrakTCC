import "./models/associations.js";
import express from "express";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomTypeRoutes from "./routes/roomTypeRoutes.js";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002",
  "https://proyekakhirpraktcc-174534490336.us-central1.run.app",
  "https://proyekakhirpraktcc-fe-dot-f-12-450706.uc.r.appspot.com/"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api", bookingRoutes);
app.use("/api", roomTypeRoutes);

app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => res.send('Server is up'));

const startServer = async () => {
  const PORT = process.env.PORT || 8080;

  try {
    console.log("Raw DB_HOST:", JSON.stringify(process.env.DB_HOST));
    console.log("Trimmed DB_HOST:", process.env.DB_HOST ? process.env.DB_HOST.trim() : '');

    console.log("Mulai sinkronisasi database...");
    await db.authenticate(); // ⬅️ Gunakan authenticate() untuk test koneksi saja
    // await db.sync({ alter: true }); // Aktifkan ini hanya jika DB ready
    console.log("Koneksi database berhasil.");

  } catch (error) {
    console.error("❌ Gagal koneksi/sinkronisasi database:", error.message);
  } finally {
    app.listen(PORT, () => console.log(`✅ Server tetap listen di port ${PORT}`));
  }
};


console.log("====== ENVIRONMENT VARIABLES ======");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.PORT);
console.log("===================================");

startServer();
