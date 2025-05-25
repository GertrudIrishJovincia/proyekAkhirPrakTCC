import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
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

const RiwayatPemesanan = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

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

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const handleBack = () => {
    navigate("/landingpage");
  };

  const handleViewDetail = (item) => {
    console.log("Navigasi ke detail dengan:", item); // ⬅️ Tambah ini

    navigate(`/detail-pemesanan/${item.id}`, {
      state: {
        ...item,
        hotel_id: item.hotel_id,
      },
    });
  };

  return (
    <Box sx={{ bgcolor: "#715737", minHeight: "100vh", py: 6, px: 2, display: "flex", justifyContent: "center" }}>
      <Container maxWidth="md" sx={{ bgcolor: "#fff9e6", borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", p: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={4} color="#5d4a1a" textAlign="center" sx={{ textShadow: "1px 1px 2px rgba(93,74,26,0.7)" }}>
          Riwayat Pemesanan
        </Typography>

        {history.length === 0 ? (
          <Typography variant="body1" textAlign="center" color="#5d4a1a" sx={{ mt: 4, fontStyle: "italic" }}>
            Belum ada riwayat pemesanan.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {history.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 4, bgcolor: "#fff6cc", transition: "transform 0.3s", "&:hover": { transform: "scale(1.02)", boxShadow: 6, bgcolor: "#fff3b8" } }}>
                  <CardContent>
                    <Box sx={{ bgcolor: "rgba(93,74,26,0.15)", borderRadius: 1, p: 1, mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold" color="#5d4a1a" gutterBottom>
                        {item.hotel_name}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ bgcolor: "rgba(93,74,26,0.07)", p: 1, borderRadius: 1, mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#5d4a1a">
                        Pemesan: {item.guest_name}
                      </Typography>
                    </Box>

                    <Box sx={{ bgcolor: "rgba(93,74,26,0.07)", p: 2, borderRadius: 2, mb: 2, color: "#5d4a1a", display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Typography><strong>Tipe Kamar:</strong> {item.room_type}</Typography>
                      <Typography><strong>Check-in:</strong> {item.check_in_date}</Typography>
                      <Typography><strong>Check-out:</strong> {item.check_out_date}</Typography>
                      <Typography fontWeight="bold" color="#7a6520">Total Harga: {formatPrice(item.total_price)}</Typography>
                    </Box>

                    <Button variant="contained" fullWidth sx={{ bgcolor: "#80652F", "&:hover": { bgcolor: "#6a5329" } }} onClick={() => handleViewDetail(item)}>
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box textAlign="center" mt={6}>
          <Button variant="outlined" sx={{ color: "#5d4a1a", borderColor: "#5d4a1a", fontWeight: "bold", fontSize: "1rem", padding: "8px 32px", borderRadius: 2, "&:hover": { backgroundColor: "rgba(93, 74, 26, 0.15)", borderColor: "#4b3f15", color: "#4b3f15" } }} onClick={handleBack}>
            Kembali
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RiwayatPemesanan;
