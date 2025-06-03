import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [userName, setUserName] = useState('User');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios
        .get(`/api/users/${userId}`)
        .then((res) => {
          if (res.data && res.data.name) {
            setUserName(res.data.name);
          }
        })
        .catch((err) => {
          console.error('Gagal ambil data user:', err);
        });
    }

    axios
      .get(`/api/hotels`)
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error('Gagal ambil data hotel:', error);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/assets/walpaper.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: '#8B6F47' }}>
        <Toolbar sx={{ justifyContent: 'flex-end', gap: 3 }}>
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: 18,
              cursor: 'pointer',
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={() => {
              if (location.pathname === '/landingpage') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/landingpage');
              }
            }}
          >
            Home
          </Box>
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: 18,
              cursor: 'pointer',
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={() => navigate('/riwayat')}
          >
            Riwayat Pemesanan
          </Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'white',
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              '&:hover': { backgroundColor: '#725e3b', borderColor: '#725e3b' },
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: 350,
          backgroundImage: `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 10 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 32 },
              letterSpacing: 2,
              fontWeight: 'bold',
              mb: 1,
              color: 'white',
            }}
          >
            SELAMAT DATANG, {userName.toUpperCase()}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: '900',
              lineHeight: 1,
              mb: 1,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            PEMESANAN HOTEL
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 400 }}>
            Wujudkan liburan impian Anda dengan layanan hotel terbaik dan harga terjangkau.
          </Typography>
        </Box>
      </Box>

      {/* Hotel Card Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {hotels.map((hotel, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  width: 280,
                  height: 400,
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={hotel.image_url || 'https://via.placeholder.com/280x200?text=No+Image'}
                  alt={hotel.name}
                  sx={{
                    height: 220,
                    width: 280,
                    objectFit: 'cover',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" color="#6B4D1B" noWrap>
                      {hotel.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {hotel.address}
                    </Typography>
                   <Typography variant="body2" color="text.secondary">
                    Harga per malam: Rp{Number(hotel.price_min).toLocaleString('id-ID')} - Rp{Number(hotel.price_max).toLocaleString('id-ID')}
                  </Typography>

                  </Box>
                  <Box mt={1} textAlign="center">
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#8B6F47',
                        textTransform: 'none',
                        borderRadius: 10,
                      }}
                     onClick={() => {
                      setSelectedHotel(hotel);
                      setOpenConfirmDialog(true);
                    }}
                    >
                      Pesan Sekarang
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pop-up Dialog Konfirmasi */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Konfirmasi Pemesanan</DialogTitle>
      <DialogContent>
  {selectedHotel && (
    <Box>
      <Box
        component="img"
        src={selectedHotel.image_url || '/assets/default.jpg'}
        alt={selectedHotel.name}
        sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 2, mb: 2 }}
      />
      <Typography sx={{ mb: 1 }}><strong>Nama Hotel:</strong> {selectedHotel.name}</Typography>
      <Typography sx={{ mb: 1 }}><strong>Alamat:</strong> {selectedHotel.address}</Typography>
      <Typography sx={{ mb: 1 }}><strong>Fasilitas:</strong> {selectedHotel.facilities}</Typography>

  {selectedHotel.room_types && selectedHotel.room_types.length > 0 && (
  <>
    <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Tipe Kamar:</Typography>
    {selectedHotel.room_types.map((room, idx) => (
      <Box key={idx} sx={{ ml: 2, mb: 1 }}>
        <Typography><strong>• Tipe:</strong> {room.type}</Typography>
        <Typography><strong>  Harga per Malam:</strong> Rp{Number(room.price_per_night).toLocaleString('id-ID')}</Typography>
        <Typography><strong>  Stok Kamar:</strong> {room.stock}</Typography>
      </Box>
    ))}
  </>
)}
    </Box>
  )}
</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="error">
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#8B6F47' }}
            onClick={() => {
              setOpenConfirmDialog(false);
              navigate('/booking', { state: selectedHotel });
            }}
          >
            Ya, Pesan Sekarang
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#8B6F47',
          color: 'white',
          textAlign: 'center',
          py: 2,
          mt: 6,
        }}
      >
        <Typography variant="body2">
          © 2025 Aplikasi Pemesanan Hotel. All rights reserved. Ayrisa dan Irish
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;