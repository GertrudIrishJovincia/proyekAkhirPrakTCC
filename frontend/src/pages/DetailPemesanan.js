import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

const DetailPemesanan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || null;

  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!data || !data.hotel_id) {
        setHotel(null);
        return;
      }
      try {
        const res = await axios.get(`/api/hotels/${data.hotel_id}`);
        setHotel(res.data);
      } catch {
        setHotel(null);
      }
    };
    fetchHotel();
  }, [data]);

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  if (!data) {
    return (
      <Container maxWidth="sm" sx={{ py: 6, maxWidth: 700, margin: "0 auto" }}>
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
    <Box
      sx={{
        bgcolor: "#8B6F47",
        minHeight: "100vh",
        py: 8,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Kiri - Data pemesanan */}
        <Box
          sx={{
            bgcolor: "#f5f1de",
            width: "40%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#5d4a1a" mb={1}>
            {hotel?.name || "Nama Hotel Tidak Diketahui"}
          </Typography>

          <Box sx={{ mb: 1 }}>
            <Typography fontWeight="bold" color="#5d4a1a" component="span">
              Pemesan:
            </Typography>
            <Typography>{data.guest_name || "-"}</Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography fontWeight="bold" color="#5d4a1a" component="span">
              Tipe Kamar:
            </Typography>
            <Typography>{data.room_type || "-"}</Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography fontWeight="bold" color="#5d4a1a" component="span">
              Check-in:
            </Typography>
            <Typography>{data.check_in_date || "-"}</Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography fontWeight="bold" color="#5d4a1a" component="span">
              Check-out:
            </Typography>
            <Typography>{data.check_out_date || "-"}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography fontWeight="bold" color="#5d4a1a">
              Total Harga:
            </Typography>
            <Typography fontWeight="bold" fontSize="1.3rem" color="#7a6520">
              {formatPrice(data.total_price)}
            </Typography>
          </Box>
        </Box>

        {/* Kanan - Gambar + detail hotel + tombol kembali */}
        <Box
          sx={{
            width: "60%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {hotel?.image_url && (
            <CardMedia
              component="img"
              image={hotel.image_url}
              alt={hotel.name}
              sx={{ borderRadius: 3, mb: 3, height: 250, objectFit: "cover" }}
            />
          )}

          <Box>
            <Typography variant="h6" fontWeight="bold" mb={1} color="#5d4a1a">
              Detail Hotel
            </Typography>
            <Typography mb={2}>
              <strong>Lokasi:</strong> {hotel?.address || "-"}
            </Typography>
          </Box>

          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#8B6F47",
                textTransform: "none",
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: "1rem",
                py: 1.5,
                px: 6,
                "&:hover": { bgcolor: "#725e3b" },
              }}
              onClick={() => navigate("/riwayat")}
            >
              Kembali
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default DetailPemesanan;
