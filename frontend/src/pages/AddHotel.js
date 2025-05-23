import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,
} from '@mui/material';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function AddHotel() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price_per_night: '',
    facilities: '',
    rooms_available: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.price_per_night || !formData.rooms_available) {
      alert('Nama, alamat, harga, dan kamar tersedia wajib diisi!');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/hotels', {
        name: formData.name,
        address: formData.address,
        price_per_night: Number(formData.price_per_night),
        facilities: formData.facilities,
        rooms_available: Number(formData.rooms_available),
        image_url: formData.image_url,
      });
      alert('Hotel berhasil ditambahkan!');
      navigate('/admin'); // redirect kembali ke dashboard admin
    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan hotel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Tambah Hotel Baru
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nama Hotel"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Alamat"
            name="address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <TextField
            label="Harga per Malam"
            name="price_per_night"
            type="number"
            fullWidth
            margin="normal"
            value={formData.price_per_night}
            onChange={handleChange}
            required
          />
          <TextField
            label="Fasilitas (pisahkan dengan koma)"
            name="facilities"
            fullWidth
            margin="normal"
            value={formData.facilities}
            onChange={handleChange}
          />
          <TextField
            label="Kamar Tersedia"
            name="rooms_available"
            type="number"
            fullWidth
            margin="normal"
            value={formData.rooms_available}
            onChange={handleChange}
            required
          />
          <TextField
            label="URL Gambar"
            name="image_url"
            fullWidth
            margin="normal"
            value={formData.image_url}
            onChange={handleChange}
          />
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: '#8B6F47', '&:hover': { bgcolor: '#705B34' } }}
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Tambah Hotel'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
