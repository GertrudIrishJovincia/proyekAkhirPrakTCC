import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils";

const roomTypeOptions = ['Standard', 'Deluxe', 'Suite'];

export default function AddHotelWithRoomTypes() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    facilities: '',
    image_url: '',
  });

  const [roomTypes, setRoomTypes] = useState([
    { type_name: '', price_per_night: '', stock: '' }
  ]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleHotelChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoomTypeChange = (index, e) => {
    const values = [...roomTypes];
    values[index][e.target.name] = e.target.value;
    setRoomTypes(values);
  };

  const addRoomType = () => {
    setRoomTypes([...roomTypes, { type_name: '', price_per_night: '', stock: '' }]);
  };

  const removeRoomType = (index) => {
    const values = [...roomTypes];
    values.splice(index, 1);
    setRoomTypes(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      alert('Nama dan alamat hotel wajib diisi');
      return;
    }
    for (const rt of roomTypes) {
      if (!rt.type_name || !rt.price_per_night || !rt.stock) {
        alert('Semua field tipe kamar wajib diisi');
        return;
      }
    }

    setLoading(true);
    try {
      const resHotel = await axios.post(`${BASE_URL}/api/hotels`, {
        name: formData.name,
        address: formData.address,
        facilities: formData.facilities,
        image_url: formData.image_url,
        price_per_night: 0,
        rooms_available: 0,
      });

      const hotelId = resHotel.data.hotel.id;

      for (const rt of roomTypes) {
        await axios.post(`${BASE_URL}/api/hotels/${hotelId}/roomtypes`, {
          type: rt.type_name,
          price_per_night: Number(rt.price_per_night),
          stock: Number(rt.stock),
        });
      }

      alert('Hotel dan tipe kamar berhasil ditambahkan!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan hotel dan tipe kamar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Tambah Hotel Baru dengan Tipe Kamar
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nama Hotel"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleHotelChange}
            required
          />
          <TextField
            label="Alamat"
            name="address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleHotelChange}
            required
          />
          <TextField
            label="Fasilitas (pisahkan dengan koma)"
            name="facilities"
            fullWidth
            margin="normal"
            value={formData.facilities}
            onChange={handleHotelChange}
          />
          <TextField
            label="URL Gambar"
            name="image_url"
            fullWidth
            margin="normal"
            value={formData.image_url}
            onChange={handleHotelChange}
          />

          <Typography variant="h6" mt={3} mb={1}>Tipe Kamar</Typography>

          {roomTypes.map((roomType, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
              <FormControl fullWidth required>
                <InputLabel id={`select-label-${index}`}>Tipe Kamar</InputLabel>
                <Select
                  labelId={`select-label-${index}`}
                  label="Tipe Kamar"
                  name="type_name"
                  value={roomType.type_name}
                  onChange={(e) => handleRoomTypeChange(index, e)}
                >
                  {roomTypeOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Harga / Malam"
                name="price_per_night"
                type="number"
                value={roomType.price_per_night}
                onChange={(e) => handleRoomTypeChange(index, e)}
                required
                sx={{ width: '25%' }}
              />
              <TextField
                label="Stok"
                name="stock"
                type="number"
                value={roomType.stock}
                onChange={(e) => handleRoomTypeChange(index, e)}
                required
                sx={{ width: '20%' }}
              />
              {index > 0 && (
                <IconButton onClick={() => removeRoomType(index)} color="error" aria-label="hapus tipe kamar">
                  <Remove />
                </IconButton>
              )}
              {index === roomTypes.length - 1 && (
                <IconButton onClick={addRoomType} color="primary" aria-label="tambah tipe kamar">
                  <Add />
                </IconButton>
              )}
            </Box>
          ))}

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