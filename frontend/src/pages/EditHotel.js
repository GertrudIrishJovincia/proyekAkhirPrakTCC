import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from '../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
// import { BASE_URL } from "../utils";

const roomTypeOptions = ['Standard', 'Deluxe', 'Suite'];

export default function EditHotel() {
  const { id } = useParams(); // id hotel dari URL
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    facilities: '',
    image_url: '',
  });

  const [roomTypes, setRoomTypes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelAndRoomTypes = async () => {
      try {
        // Ambil data hotel
        const resHotel = await axios.get(`/api/hotels/${id}`);
        const hotel = resHotel.data;

        setFormData({
          name: hotel.name || '',
          address: hotel.address || '',
          facilities: hotel.facilities || '',
          image_url: hotel.image_url || '',
        });

        // Ambil tipe kamar hotel ini
        const resRoomTypes = await axios.get(`/api/hotels/${id}/roomtypes`);
        setRoomTypes(resRoomTypes.data || []);
      } catch (error) {
        console.error('Gagal mengambil data hotel atau tipe kamar:', error);
        alert('Gagal mengambil data hotel dan tipe kamar');
      } finally {
        setLoadingData(false);
      }
    };

    fetchHotelAndRoomTypes();
  }, [id]);

  // Update form hotel
  const handleHotelChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update tipe kamar tertentu
  const handleRoomTypeChange = (index, e) => {
    const values = [...roomTypes];
    values[index][e.target.name] = e.target.value;
    setRoomTypes(values);
  };

  // Tambah tipe kamar baru (kosong)
  const addRoomType = () => {
    setRoomTypes([...roomTypes, { type: '', price_per_night: '', stock: '' }]);
  };

  // Hapus tipe kamar
  const removeRoomType = (index) => {
    const values = [...roomTypes];
    values.splice(index, 1);
    setRoomTypes(values);
  };

  // Submit update hotel dan tipe kamar
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      alert('Nama dan alamat hotel wajib diisi');
      return;
    }
    for (const rt of roomTypes) {
      if (!rt.type || !rt.price_per_night || !rt.stock) {
        alert('Semua field tipe kamar wajib diisi');
        return;
      }
    }

    setLoading(true);

    try {
      // Update data hotel
      await axios.put(`/api/hotels/${id}`, {
        name: formData.name,
        address: formData.address,
        facilities: formData.facilities,
        image_url: formData.image_url,
      });

      // Update tiap tipe kamar
      for (const rt of roomTypes) {
        if (rt.id) {
          // Jika sudah ada id, update tipe kamar
          await axios.put(`/api/roomtypes/${rt.id}`, {
            type_name: rt.type,
            price_per_night: Number(rt.price_per_night),
            stock: Number(rt.stock),
          });
        } else {
          // Jika belum ada id, buat tipe kamar baru
          await axios.post(`/api/hotels/${id}/roomtypes`, {
            type: rt.type,
            price_per_night: Number(rt.price_per_night),
            stock: Number(rt.stock),
          });
        }
      }

      alert('Hotel dan tipe kamar berhasil diperbarui!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Gagal memperbarui hotel dan tipe kamar.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>Memuat data hotel dan tipe kamar...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Edit Hotel dengan Tipe Kamar
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
                  name="type"
                  value={roomType.type}
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
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}