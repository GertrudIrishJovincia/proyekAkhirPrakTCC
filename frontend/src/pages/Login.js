import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from '../axiosInstance';
import { BASE_URL } from "../utils";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, formData);
    console.log('Login response:', response.data);

    localStorage.setItem('token', response.data.token || 'dummy');
    localStorage.setItem('role', response.data.user.role);
    localStorage.setItem('userId', response.data.user.id);  // Pastikan ini ada

    alert(response.data.msg);

    if (response.data.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/landingpage');
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.msg || 'Login gagal');
  }
};


  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#8B6F47',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 0,
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
          m: 2,
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
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
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
                onClick={handleGoToRegister}
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
