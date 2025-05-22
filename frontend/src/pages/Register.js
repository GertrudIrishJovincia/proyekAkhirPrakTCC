import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted:', formData);
  };

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#8B6F47',
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
          maxWidth: 900,
          minHeight: 450,
        }}
      >
        {/* Form kiri */}
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
            PENDAFTARAN
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              name="name"
              label="Nama"
              placeholder="Masukkan Nama"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="email"
              label="Email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="phone_number"
              label="Nomor Telepon"
              placeholder="Masukkan Nomor Telepon"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              placeholder="Masukkan Password"
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
              DAFTAR
            </Button>
            <Typography variant="body2" align="center">
              Sudah Mempunyai Akun?{' '}
              <span
                style={{ color: '#7b5e2a', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={handleGoToLogin}
              >
                MASUK
              </span>
            </Typography>
          </form>
        </Box>

        {/* Gambar kanan */}
        <Box sx={{ width: '50%', height: '100%' }}>
          <img
            src="/assets/gambar5.jpg"
            alt="Register Visual"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
