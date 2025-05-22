import React from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const AuthForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        padding: 5,
        width: '100%',
        maxWidth: 400,
        bgcolor: '#f3f3f3',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#7b5e2a' }}>
        LOGIN
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="email"
          label="Email"
          placeholder="Masukkan email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          placeholder="Masukkan password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
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
          <span style={{ color: '#7b5e2a', fontWeight: 'bold', cursor: 'pointer' }}>
            DAFTAR
          </span>
        </Typography>
      </Box>
    </Paper>
  );
};

export default AuthForm;
