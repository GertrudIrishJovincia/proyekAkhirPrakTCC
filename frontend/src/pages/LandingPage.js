import React, { useState } from 'react';
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

const hotels = [
  {
    name: 'Hotel Matahari',
    image: '/assets/hotel1.png',
    address: 'Jl. Veteran, Yogyakarta',
    price: 'Rp300.000',
    facilities: 'Ruangan besar, kamar mandi dalam, AC, kolam renang',
    availability: '200 kamar',
  },
  {
    name: 'Hotel Tentrem',
    image: '/assets/hotel1.png',
    address: 'Jl. Mangkubumi, Yogyakarta',
    price: 'Rp450.000',
    facilities: 'Deluxe room, spa, restoran',
    availability: '100 kamar',
  },
  {
    name: 'Mulia Resort',
    image: '/assets/hotel1.png',
    address: 'Jl. By Pass Ngurah Rai, Bali',
    price: 'Rp800.000',
    facilities: 'Private beach, kolam renang, gym',
    availability: '50 kamar',
  },
  {
    name: 'Hotel Oasis',
    image: '/assets/hotel1.png',
    address: 'Jl. Kemang, Jakarta',
    price: 'Rp500.000',
    facilities: 'Kolam renang, restoran, wifi',
    availability: '120 kamar',
  },
];

const LandingDashboard = () => {
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleOpenDialog = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseDialog = () => {
    setSelectedHotel(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, bgcolor: '#8B6F47', color: 'white', p: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 1 }} />
          <Typography variant="h6">imau</Typography>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton selected sx={{ bgcolor: '#715737', borderRadius: 1 }}>
              <ListItemText primary="Pemesanan" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/riwayat')}>
              <ListItemText primary="Riwayat Pemesanan" />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', textAlign: 'center', pt: 4 }}>
          <ListItemButton onClick={() => navigate('/')}>Keluar</ListItemButton>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, bgcolor: '#f5f5f5', p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Selamat datang, imau
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Silahkan memilih hotel
        </Typography>

        <Grid container spacing={3} mt={2}>
          {hotels.map((hotel, idx) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={idx}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, cursor: 'pointer' }} onClick={() => handleOpenDialog(hotel)}>
                <CardMedia
                  component="img"
                  height="240"
                  image={hotel.image}
                  alt={hotel.name}
                />
                <CardContent>
                  <Typography variant="h6" align="center" fontWeight="bold" color="#6B4D1B">
                    {hotel.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog */}
      <Dialog open={Boolean(selectedHotel)} onClose={handleCloseDialog}>
        {selectedHotel && (
          <DialogContent>
            <img src={selectedHotel.image} alt={selectedHotel.name} style={{ width: '100%', borderRadius: '6px' }} />
            <Box mt={2}>
              <Typography><strong>Nama Hotel:</strong> {selectedHotel.name}</Typography>
              <Typography><strong>Alamat:</strong> {selectedHotel.address}</Typography>
              <Typography><strong>Biaya per malam:</strong> {selectedHotel.price}</Typography>
              <Typography><strong>Fasilitas:</strong> {selectedHotel.facilities}</Typography>
              <Typography><strong>Ketersediaan kamar:</strong> {selectedHotel.availability}</Typography>
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

export default LandingDashboard;