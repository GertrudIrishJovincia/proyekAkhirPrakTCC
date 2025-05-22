import React from "react";
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

const DetailPemesanan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data detail dikirim via state dari halaman RiwayatPemesanan
  // Jika tidak ada data, bisa redirect atau tampilkan pesan error
  const data = location.state || null;

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

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

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
            <Typography>{data.hotelName}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
              Nama Pemesan
            </Typography>
            <Typography>{data.customerName || "N/A"}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
              Tipe Kamar
            </Typography>
            <Typography>{data.roomType}</Typography>
          </Box>

          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
                Check-in
              </Typography>
              <Typography>{data.checkIn}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
                Check-out
              </Typography>
              <Typography>{data.checkOut}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#6b4e1a">
              Total Harga
            </Typography>
            <Typography fontWeight="bold" color="#7a6520" fontSize="1.2rem">
              {formatPrice(data.totalPrice)}
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
