import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RiwayatPemesanan = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [hotelDetails, setHotelDetails] = useState({}); // simpan data hotel lengkap per hotel_id

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("Anda harus login terlebih dahulu");
          navigate("/");
          return;
        }
        const res = await axios.get(`/api/userbookings?user_id=${userId}`);
        setHistory(res.data);
      } catch (error) {
        console.error("Gagal ambil riwayat:", error);
        alert("Gagal mengambil riwayat pemesanan.");
      }
    };
    fetchHistory();
  }, [navigate]);

  // Fungsi untuk fetch detail lengkap hotel per hotelId
  const fetchHotelDetail = async (hotelId) => {
    if (!hotelId) return null;
    if (hotelDetails[hotelId]) return hotelDetails[hotelId];

    try {
      const res = await axios.get(`/api/hotels/${hotelId}`);
      setHotelDetails((prev) => ({ ...prev, [hotelId]: res.data }));
      return res.data;
    } catch {
      return null;
    }
  };

  // Setelah dapat history, fetch detail semua hotel unik
  useEffect(() => {
    if (history.length === 0) return;

    const uniqueHotelIds = [...new Set(history.map((item) => item.hotel_id))];

    uniqueHotelIds.forEach(async (hotelId) => {
      if (!hotelDetails[hotelId]) {
        await fetchHotelDetail(hotelId);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const handleBack = () => {
    navigate("/landingpage");
  };

  const handleViewDetail = (item) => {
    navigate(`/detail-pemesanan/${item.id}`, {
      state: {
        ...item,
        hotel_id: item.hotel_id,
      },
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#8B6F47",
        minHeight: "100vh",
        py: 8,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "#fff9e6",
          borderRadius: 4,
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          p: { xs: 3, md: 6 },
          mt: 4,
          mb: 6,
        }}
      >
        <Typography
  variant="h4"
  fontWeight="bold"
  mb={5}
  color="#5d4a1a"
  textAlign="center"
>
  Riwayat Pemesanan
</Typography>

        {history.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="#5d4a1a"
            sx={{ mt: 6, fontStyle: "italic", fontSize: "1.2rem" }}
          >
            Belum ada riwayat pemesanan.
          </Typography>
        ) : (
          <Grid container spacing={5} justifyContent="center">
            {history.map((item) => {
              const hotel = hotelDetails[item.hotel_id];
              return (
                <Grid item xs={12} md={10} lg={8} key={item.id}>
                  <Card
                    sx={{
                      borderRadius: 5,
                      boxShadow: 6,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      overflow: "hidden",
                      bgcolor: "#fffef7",
                    }}
                  >
                    {/* Sidebar kiri */}
                    <Box
                      sx={{
                        bgcolor: "#fff6cc",
                        width: { xs: "100%", md: "35%" },
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#5d4a1a"
                        gutterBottom
                      >
                        {hotel?.name || "Loading..."}
                      </Typography>
                      <Typography sx={{ fontWeight: "600" }}>Pemesan:</Typography>
                      <Typography>{item.guest_name}</Typography>

                      <Typography sx={{ fontWeight: "600" }}>Tipe Kamar:</Typography>
                      <Typography>{item.room_type}</Typography>

                      <Typography sx={{ fontWeight: "600" }}>Check-in:</Typography>
                      <Typography>{item.check_in_date}</Typography>

                      <Typography sx={{ fontWeight: "600" }}>Check-out:</Typography>
                      <Typography>{item.check_out_date}</Typography>

                      <Typography
                        fontWeight="bold"
                        color="#7a6520"
                        sx={{ mt: 3, fontSize: "1.1rem" }}
                      >
                        Total Harga:
                      </Typography>
                      <Typography fontWeight="bold" color="#7a6520" fontSize="1.2rem">
                        {formatPrice(item.total_price)}
                      </Typography>
                    </Box>

                    {/* Konten utama kanan */}
                    <Box
                      sx={{
                        width: { xs: "100%", md: "65%" },
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "left",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={hotel?.image_url || "/assets/default-hotel.jpg"}
                        alt={hotel?.name || "Hotel Image"}
                        sx={{
                          borderRadius: 3,
                          height: 250,
                          objectFit: "cover",
                          mb: 3,
                          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="#5d4a1a"
                          gutterBottom
                        >
                          Detail Hotel
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Lokasi:</strong> {hotel?.address || "Lokasi tidak tersedia"}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#8B6F47",
                          mt: 4,
                          textTransform: "none",
                          borderRadius: 3,
                          fontWeight: "bold",
                          fontSize: "1rem",
                          px: 4,
                          py: 1.5,
                          "&:hover": { bgcolor: "#725e3b" },
                        }}
                        onClick={() => handleViewDetail(item)}
                      >
                        Lihat Detail
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        <Box textAlign="center" mt={8}>
          <Button
            variant="outlined"
            sx={{
              color: "#5d4a1a",
              borderColor: "#5d4a1a",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "10px 36px",
              borderRadius: 3,
              boxShadow: "1px 1px 5px rgba(93,74,26,0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(93, 74, 26, 0.15)",
                borderColor: "#4b3f15",
                color: "#4b3f15",
                boxShadow: "3px 3px 10px rgba(75,63,21,0.7)",
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
