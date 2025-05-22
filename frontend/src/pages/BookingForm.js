import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Container,
  Paper,
  Grid,
} from '@mui/material';
import { useLocation } from 'react-router-dom'; // ✅ langsung ambil dari router

const BookingForm = () => {
  const location = useLocation();
  const selectedHotel = location.state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: 'Standard',
    checkIn: '',
    checkOut: '',
    totalPrice: 0,
  });

  const pricePerNight = selectedHotel?.price?.replace(/\D/g, '') || 0;

 useEffect(() => {
  if (formData.checkIn && formData.checkOut) {
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total = diffDays * pricePerNight;
    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }
}, [formData.checkIn, formData.checkOut, pricePerNight]);  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Form Pemesanan Hotel
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>Hotel:</strong> {selectedHotel?.name || '-'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField label="Nama Pemesan" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField label="No. Telepon" name="phone" fullWidth margin="normal" value={formData.phone} onChange={handleChange} required />
          <TextField select label="Tipe Kamar" name="roomType" fullWidth margin="normal" value={formData.roomType} onChange={handleChange}>
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Deluxe">Deluxe</MenuItem>
            <MenuItem value="Suite">Suite</MenuItem>
          </TextField>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Tanggal Check-in" name="checkIn" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={formData.checkIn} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Tanggal Check-out" name="checkOut" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={formData.checkOut} onChange={handleChange} required />
            </Grid>
          </Grid>
          <TextField label="Total Harga" fullWidth margin="normal" value={`Rp${formData.totalPrice.toLocaleString()}`} InputProps={{ readOnly: true }} />
          <Box textAlign="center" mt={3}>
            <Button variant="contained" type="submit" sx={{ bgcolor: '#8B6F47' }}>PESAN SEKARANG</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BookingForm;
