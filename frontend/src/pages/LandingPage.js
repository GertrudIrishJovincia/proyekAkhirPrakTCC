import React, { useState, useEffect } from 'react';
// import axios atau fetch biasa
import axios from 'axios';
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

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch data hotel dari backend
    axios.get('http://localhost:5000/api/hotels') // sesuaikan dengan URL backend-mu
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
      {/* Sidebar (sama seperti sebelumnya) */}
      <Box
        sx={{
          width: 250,
          bgcolor: '#715737',
          color: 'white',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, margin: '0 auto' }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            imau
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
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          bgcolor: 'background.paper',
          p: 4,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Selamat datang, imau
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Silahkan memilih hotel
        </Typography>

        <Grid container spacing={3} mt={2} flexGrow={1}>
          {hotels.length === 0 ? (
            <Typography>Tidak ada hotel tersedia saat ini.</Typography>
          ) : (
            hotels.map((hotel, idx) => (
              <Grid item xs={12} sm={4} md={4} lg={4} key={idx}>
                <Card
                  sx={{ borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
                  onClick={() => handleOpenDialog(hotel)}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={hotel.image_url || '/assets/hotel1.png'} // sesuaikan field image_url
                    alt={hotel.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      fontWeight="bold"
                      color="#6B4D1B"
                    >
                      {hotel.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
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
