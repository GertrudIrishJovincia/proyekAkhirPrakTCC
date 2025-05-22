import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Contoh data dummy riwayat pemesanan dengan nama pemesan
const dummyHistory = [
  {
    id: 1,
    hotelName: "Hotel Matahari",
    customerName: "Irish",
    checkIn: "2025-06-10",
    checkOut: "2025-06-15",
    roomType: "Deluxe",
    totalPrice: 1500000,
  },
  {
    id: 2,
    hotelName: "Mulia Resort",
    customerName: "Ayrisa",
    checkIn: "2025-07-01",
    checkOut: "2025-07-05",
    roomType: "Suite",
    totalPrice: 4000000,
  },
];

const RiwayatPemesanan = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(dummyHistory);
  }, []);

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const handleBack = () => {
    navigate("/landingpage");
  };

  // Navigasi ke detail dan kirim data pesanan via state
  const handleViewDetail = (item) => {
    navigate(`/detail-pemesanan/${item.id}`, { state: item });
  };

  return (
    <Box
      sx={{
        bgcolor: "#715737",
        minHeight: "100vh",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "#fff9e6",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          color="#5d4a1a"
          textAlign="center"
          sx={{ textShadow: "1px 1px 2px rgba(93,74,26,0.7)" }}
        >
          Riwayat Pemesanan
        </Typography>

        {history.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="#5d4a1a"
            sx={{ mt: 4, fontStyle: "italic" }}
          >
            Belum ada riwayat pemesanan.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {history.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    bgcolor: "#fff6cc",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 6,
                      bgcolor: "#fff3b8",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        bgcolor: "rgba(93,74,26,0.15)",
                        borderRadius: 1,
                        p: 1,
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#5d4a1a"
                        gutterBottom
                      >
                        {item.hotelName}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box
                      sx={{
                        bgcolor: "rgba(93,74,26,0.07)",
                        p: 1,
                        borderRadius: 1,
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="#5d4a1a"
                      >
                        Pemesan: {item.customerName}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "rgba(93,74,26,0.07)",
                        p: 2,
                        borderRadius: 2,
                        mb: 2,
                        color: "#5d4a1a",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      <Typography>
                        <strong>Tipe Kamar:</strong> {item.roomType}
                      </Typography>
                      <Typography>
                        <strong>Check-in:</strong> {item.checkIn}
                      </Typography>
                      <Typography>
                        <strong>Check-out:</strong> {item.checkOut}
                      </Typography>
                      <Typography fontWeight="bold" color="#7a6520">
                        Total Harga: {formatPrice(item.totalPrice)}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#80652F",
                        "&:hover": { bgcolor: "#6a5329" },
                      }}
                      onClick={() => handleViewDetail(item)}
                    >
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box textAlign="center" mt={6}>
          <Button
            variant="outlined"
            sx={{
              color: "#5d4a1a",
              borderColor: "#5d4a1a",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "8px 32px",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(93, 74, 26, 0.15)",
                borderColor: "#4b3f15",
                color: "#4b3f15",
              },
            }}
            onClick={handleBack}
          >
            Kembali
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RiwayatPemesanan;
