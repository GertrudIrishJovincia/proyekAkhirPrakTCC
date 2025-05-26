import "./models/associations.js";
import express from "express";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomTypeRoutes from "./routes/roomTypeRoutes.js";
import dotenv from 'dotenv';

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
  try {
    console.log('Raw DB_HOST:', JSON.stringify(process.env.DB_HOST));
    console.log('Trimmed DB_HOST:', process.env.DB_HOST ? process.env.DB_HOST.trim() : '');

    console.log("Mulai sinkronisasi database...");
    await db.sync({ alter: true });
    console.log("Database & tables sudah siap");

    const PORT = process.env.PORT || 5000;
    console.log(`Server akan mulai listen di port ${PORT}...`);

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.error("Gagal sinkronisasi database:", error);
  }
};

startServer();
