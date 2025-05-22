import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  AppBar,
  Toolbar,
  Pagination,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const RoomsPage = () => {
  const navigate = useNavigate();

  const allRooms = [
    {
      id: 1,
      name: 'Ocean Breeze Suite',
      image: '/assets/hotel1.png',
      description: 'Cozy suite with breathtaking sea views and fresh ocean air.',
      rating: 4.5,
      price: 750000,
    },
    {
      id: 2,
      name: 'Sunset Paradise Room',
      image: '/assets/hotel1.png',
      description: 'Enjoy stunning sunsets from your private balcony.',
      rating: 4.7,
      price: 820000,
    },
    {
      id: 3,
      name: 'Coral Reef Deluxe',
      image: '/assets/hotel1.png',
      description: 'Luxury room with modern amenities near the coral reef.',
      rating: 4.8,
      price: 980000,
    },
    {
      id: 4,
      name: 'Palm Grove Retreat',
      image: '/assets/hotel1.png',
      description: 'Peaceful room surrounded by lush palm trees and nature.',
      rating: 4.6,
      price: 690000,
    },
    {
      id: 5,
      name: 'Seaside Harmony',
      image: '/assets/hotel1.png',
      description: 'Relax in this charming room with soothing ocean sounds.',
      rating: 4.3,
      price: 670000,
    },
    {
      id: 6,
      name: 'Tropical Sunset Suite',
      image: '/assets/hotel1.png',
      description: 'Experience luxury with stunning views of the tropical sunset.',
      rating: 4.9,
      price: 1050000,
    },
    
    {
      id: 7,
      name: 'Azure Bay Room',
      image: '/assets/hotel1.png',
      description: 'Modern room with views of the azure bay.',
      rating: 4.4,
      price: 720000,
    },
    {
      id: 8,
      name: 'Garden View Suite',
      image: '/assets/hotel1.png',
      description: 'Suite overlooking lush gardens with private terrace.',
      rating: 4.6,
      price: 840000,
    },
    {
      id: 9,
      name: 'Coral Sands Room',
      image: '/assets/hotel1.png',
      description: 'Cozy and stylish room near coral sands.',
      rating: 4.7,
      price: 900000,
    },
    {
      id: 10,
      name: 'Lagoon Breeze',
      image: '/assets/hotel1.png',
      description: 'Room with refreshing breeze from the lagoon.',
      rating: 4.5,
      price: 780000,
    },
    {
      id: 11,
      name: 'Harbor View Suite',
      image: '/assets/hotel1.png',
      description: 'Luxurious suite with stunning harbor views.',
      rating: 4.9,
      price: 1150000,
    },
    {
      id: 12,
      name: 'Palm Beach Room',
      image: '/assets/hotel1.png',
      description: 'Relaxing room near the palm beach.',
      rating: 4.3,
      price: 700000,
    },
    {
      id: 13,
      name: 'Sunrise Villa',
      image: '/assets/hotel1.png',
      description: 'Private villa with spectacular sunrise views.',
      rating: 4.8,
      price: 1200000,
    },
    {
      id: 14,
      name: 'Seashell Room',
      image: '/assets/hotel1.png',
      description: 'Charming room decorated with seashell themes.',
      rating: 4.2,
      price: 650000,
    },
    {
      id: 15,
      name: 'Coral Cove Suite',
      image: '/assets/hotel1.png',
      description: 'Spacious suite with private cove access.',
      rating: 4.7,
      price: 980000,
    },
  ];

  const roomsPerPage = 6;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * roomsPerPage;
  const currentRooms = allRooms.slice(startIndex, startIndex + roomsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleClickRoom = (room) => {
    navigate(`/booking/${room.id}`, { state: { room } });
  };

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/');
  };

  const formatPrice = (price) =>
    price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: '#80652F' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => navigate('/landingpage')}
          >
            KIJIJI BEACH
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {['Home', 'Rooms', 'Facilities', 'Contact'].map((item) => (
              <Button
                key={item}
                color="inherit"
                onClick={() => {
                  if (item.toLowerCase() === 'rooms') navigate('/rooms');
                  else if (item.toLowerCase() === 'home') navigate('/landingpage');
                  else alert(`Menu ${item} belum tersedia`);
                }}
                sx={{
                  textTransform: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'color 0.3s',
                  '&:hover': { color: '#d8b94e' },
                }}
              >
                {item}
              </Button>
            ))}
            <Button
              variant="contained"
              sx={{
                bgcolor: '#fff',
                color: '#80652F',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#d8b94e', color: '#fff' },
              }}
              onClick={() => navigate('/rooms')}
            >
              Booking Now
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: '#fff',
                borderColor: '#fff',
                ml: 1,
                fontWeight: 'bold',
                '&:hover': { borderColor: '#d8b94e', color: '#d8b94e' },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Banner Section */}
      <Container sx={{ mt: 6, mb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Gambar kiri */}
          <Box
            component="img"
            src="/assets/landingpage.png"
            alt="landing"
            sx={{
              width: { xs: '100%', md: '50%' },
              height: 'auto',
              borderRadius: 1,
              boxShadow: 3,
              objectFit: 'cover',
              userSelect: 'none',
              display: 'block',
            }}
          />

          {/* Teks kanan */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: '100%', md: '45%' },
              bgcolor: '#f7f5f0', 
              color: '#80652F',
              borderRadius: 2,
              p: 5,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
            }}
          >
            <Typography variant="h4" fontWeight="700" lineHeight={1.4}>
              We have amazing rooms
              <br />
              Browse your favorite
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Rooms list */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          color="#80652F"
        >
          Our Exclusive Rooms
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          {currentRooms.map((room) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={room.id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 420,
                  boxShadow: 4,
                  borderRadius: 3,
                  ':hover': {
                    boxShadow: 8,
                    transform: 'scale(1.03)',
                    transition: '0.3s',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={room.image}
                  alt={room.name}
                  sx={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    objectFit: 'cover',
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: '#f7f5f0',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    color="#4a3e1b"
                  >
                    {room.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    mb={1}
                    color="#6b5e3c"
                    flexGrow={1}
                  >
                    {room.description}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      color: '#d8b94e',
                    }}
                    aria-label={`${room.rating} star rating`}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        fontSize="small"
                        color={
                          i < Math.floor(room.rating) ? 'inherit' : 'disabled'
                        }
                        sx={{ mr: 0.2 }}
                      />
                    ))}
                    <Typography
                      variant="body2"
                      color="#4a3e1b"
                      ml={1}
                      fontWeight="bold"
                    >
                      {room.rating.toFixed(1)}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#80652F"
                    mb={2}
                  >
                    {formatPrice(room.price)}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#80652F',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                    fullWidth
                    onClick={() => handleClickRoom(room)}
                  >
                    Check Detail
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={Math.ceil(allRooms.length / roomsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#80652F',
          color: '#fff',
          py: 6,
          mt: 8,
          px: { xs: 3, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} justifyContent="space-between">
            {/* Column 1: Kijiji Beach */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Kijiji Beach
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 300 }}>
                Your perfect getaway destination. Enjoy luxury and comfort by the sea.
              </Typography>
            </Grid>

            {/* Column 2: Links */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Home', 'Rooms', 'Facilities', 'Contact'].map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (link.toLowerCase() === 'rooms') navigate('/rooms');
                      else if (link.toLowerCase() === 'home') navigate('/landingpage');
                      else alert(`Menu ${link} belum tersedia`);
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Column 3: About */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                About
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 300 }}>
                Kijiji Beach is a premium hotel brand dedicated to providing an exceptional vacation experience with unmatched hospitality and quality.
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            textAlign="center"
            mt={6}
            sx={{ opacity: 0.7 }}
          >
            © 2025 Kijiji Beach. All rights reserved. Ayrisa dan Irish
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default RoomsPage;
