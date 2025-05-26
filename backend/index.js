import "./models/associations.js";
import express from "express";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomTypeRoutes from "./routes/roomTypeRoutes.js";


const app = express();

app.use(cors({
  origin: "http://localhost:3000", // URL frontend
  credentials: true,
}));

app.use(express.json());

// Rute harus dikasih prefix API agar terstruktur dan menghindari bentrok
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api", bookingRoutes);// bookingRoutes sudah punya prefix '/createbooking' dan '/bookings'
app.use("/api", roomTypeRoutes);

// Hapus duplikasi penggunaan hotelRoutes tanpa prefix:
// app.use(hotelRoutes); // ini bisa dihapus

const startServer = async () => {
  try {
    await db.sync({ alter: true }); // sync db dengan alter untuk update tabel sesuai model
    console.log("Database & tables sudah siap");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server up running on port ${PORT}...`));
  } catch (error) {
    console.error("Gagal sinkronisasi database:", error);
  }
};

startServer();
