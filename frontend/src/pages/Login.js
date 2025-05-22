import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ⬅️ tambahkan ini

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // ⬅️ inisialisasi navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    navigate('/landingpage'); 
  };

  const handleGoToRegister = () => {
    navigate('/daftar'); // ⬅️ navigasi ke halaman daftar
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#3c1c1b',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          overflow: 'hidden',
          borderRadius: 4,
          width: '100%',
          maxWidth: 800,
          minHeight: 400,
        }}
      >
        {/* Gambar kiri */}
        <Box sx={{ width: '50%', height: '100%' }}>
          <img
            src="/assets/gambar5.jpg"
            alt="Login Visual"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>

        {/* Form kanan */}
        <Box
          sx={{
            width: '50%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#7b5e2a" mb={2}>
            SELAMAT DATANG
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#a07e3b',
                '&:hover': { bgcolor: '#8c6e32' },
                fontWeight: 'bold',
              }}
            >
              MASUK
            </Button>
            <Typography variant="body2" align="center">
              Belum mempunyai akun?{' '}
              <span
                style={{ color: '#7b5e2a', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={handleGoToRegister} // ⬅️ pakai event ini
              >
                DAFTAR
              </span>
            </Typography>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
