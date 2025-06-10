import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Gagal memuat kategori');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category_id) {
      alert('Semua field wajib diisi');
      return;
    }

    if (formData.price <= 0) {
      alert('Harga harus lebih dari 0');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/products', {
        name: formData.name,
        price: Number(formData.price),
        category_id: Number(formData.category_id),
      });

      alert('Produk berhasil ditambahkan!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan produk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Tambah Produk Baru
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nama Produk"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
            helperText="Minimal 3 karakter, maksimal 100 karakter"
          />
          
          <TextField
            label="Harga"
            name="price"
            type="number"
            fullWidth
            margin="normal"
            value={formData.price}
            onChange={handleChange}
            required
            inputProps={{ min: 1 }}
            helperText="Harga dalam Rupiah"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="category-select-label">Kategori</InputLabel>
            <Select
              labelId="category-select-label"
              label="Kategori"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.type}
                  {category.description && ` - ${category.description}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: '#8B6F47', '&:hover': { bgcolor: '#705B34' } }}
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Tambah Produk'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}