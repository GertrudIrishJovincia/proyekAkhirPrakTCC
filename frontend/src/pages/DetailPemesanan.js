import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosInstance"; // Pastikan path ini benar
// import { BASE_URL } from "../utils";

const DetailPemesanan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || null;

  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    console.log("DATA:", data); // 🟡 Cek apakah hotel_id tersedia

    const fetchHotelName = async () => {
      if (!data || !data.hotel_id) {
        console.warn("hotel_id tidak tersedia");
        return;
      }

      try {
        const res = await axios.get(`/api/hotels/${data.hotel_id}`);
        console.log("RESPON HOTEL:", res.data); // 🟢 Lihat bentuk respons

        // Sesuaikan dengan bentuk respons backend kamu
        setHotelName(res.data.name || "Tidak diketahui");
      } catch (error) {
        console.error("Gagal mengambil data hotel:", error);
        setHotelName("Tidak diketahui");
      }
    };

    fetchHotelName();
  }, [data]);

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  if (!data) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography variant="h6" color="error" textAlign="center">
          Detail pemesanan tidak ditemukan.
        </Typography>
        <Box textAlign="center" mt={4}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Kembali
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card sx={{ bgcolor: "#fff9e6", borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            color="#5d4a1a"
            textAlign="center"
          >
            Detail Pemesanan
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
              Hotel
            </Typography>
            <Typography>{hotelName}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
              Nama Pemesan
            </Typography>
            <Typography>{data.guest_name || "N/A"}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
              Tipe Kamar
            </Typography>
            <Typography>{data.room_type}</Typography>
          </Box>

          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="#6b4e1a"
              >
                Check-in
              </Typography>
              <Typography>{data.check_in_date}</Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="#6b4e1a"
              >
                Check-out
              </Typography>
              <Typography>{data.check_out_date}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
              Total Harga
            </Typography>
            <Typography fontWeight="bold" color="#7a6520" fontSize="1.2rem">
              {formatPrice(data.total_price)}
            </Typography>
          </Box>

          <Box textAlign="center">
            <Button
              variant="outlined"
              sx={{
                color: "#80652F",
                borderColor: "#80652F",
                fontWeight: "bold",
                px: 5,
              }}
              onClick={() => navigate(-1)}
            >
              Kembali
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailPemesanan;
