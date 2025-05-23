import express from "express";
import cors from "cors";

import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // ganti dengan URL frontend kamu
  credentials: true,
}));
app.use(express.json());
app.use(userRoutes);
app.use(hotelRoutes);
app.use(bookingRoutes);

const startServer = async () => {
  try {
    await db.sync({alter: true});
    console.log("Database & tables sudah siap");

    app.listen(5000, () => console.log('Server up running...'));
  } catch (error) {
    console.error("Gagal sinkronisasi database:", error);
  }
};

startServer();
