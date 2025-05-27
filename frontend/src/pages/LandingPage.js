import React, { useState, useEffect } from 'react';
import axios from 'axios';  // bisa pakai axiosInstance juga kalau sudah ada
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from "../utils";

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [userName, setUserName] = useState("User"); // default

  useEffect(() => {
    // Ambil userId dari localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then(res => {
          if (res.data && res.data.name) {
            setUserName(res.data.name);
          }
        })
        .catch(err => {
          console.error("Gagal ambil data user:", err);
        });
    }

    // Fetch data hotel
    axios.get(`/api/hotels`)
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error('Gagal ambil data hotel:', error);
      });
  }, []);

  const handleOpenDialog = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseDialog = () => {
    setSelectedHotel(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#8B6F47' }}>
      {/* Sidebar */}
      <Box sx={{
        width: 250,
        bgcolor: '#715737',
        color: 'white',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, margin: '0 auto' }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            {userName}
          </Typography>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          <ListItem disablePadding>
            <ListItemButton selected sx={{ bgcolor: '#5e4b2a', borderRadius: 1 }}>
              <ListItemText primary="Pemesanan" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/riwayat')}>
              <ListItemText primary="Riwayat Pemesanan" />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <ListItemButton onClick={() => navigate('/')}>Keluar</ListItemButton>
        </Box>
      </Box>

      {/* Konten utama */}
      <Box sx={{
        flex: 1,
        minWidth: 0,
        bgcolor: 'background.paper',
        p: 4,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Selamat datang, {userName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Silahkan memilih hotel
        </Typography>

        <Grid container spacing={3} mt={2} flexGrow={1} justifyContent="flex-start">
          {hotels.map((hotel, idx) => (
            <Grid item key={idx} style={{ width: 320 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: 'pointer',
                  height: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                onClick={() => handleOpenDialog(hotel)}
              >
                <CardMedia
                  component="img"
                  image={hotel.image_url}
                  alt={hotel.name}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" align="center" fontWeight="bold" color="#6B4D1B" noWrap>
                    {hotel.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog detail hotel */}
      <Dialog open={Boolean(selectedHotel)} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedHotel && (
          <DialogContent>
            <img
              src={selectedHotel.image_url || '/assets/hotel1.png'}
              alt={selectedHotel.name}
              style={{ width: '100%', borderRadius: 6 }}
            />
            <Box mt={2}>
              <Typography><strong>Nama Hotel:</strong> {selectedHotel.name}</Typography>
              <Typography><strong>Alamat:</strong> {selectedHotel.address}</Typography>
              <Typography><strong>Biaya per malam:</strong> Rp{selectedHotel.price_per_night}</Typography>
              <Typography><strong>Fasilitas:</strong> {selectedHotel.facilities}</Typography>
              <Typography><strong>Ketersediaan kamar:</strong> {selectedHotel.rooms_available} kamar</Typography>
            </Box>
            <Box textAlign="center" mt={3}>
              <Button
                variant="contained"
                sx={{ bgcolor: '#8B6F47' }}
                onClick={() => {
                  navigate('/booking', { state: selectedHotel });
                }}
              >
                PESAN SEKARANG
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default LandingPage;