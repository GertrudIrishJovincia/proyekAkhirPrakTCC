import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Avatar,
  Tooltip,
} from '@mui/material';
import axios from '../axiosInstance';

export default function HotelTable({ hotels, onRefresh }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus hotel ini?')) return;
    try {
      await axios.delete(`/${id}`);
      onRefresh();
    } catch (err) {
      console.error('Gagal hapus hotel:', err);
      alert('Gagal menghapus hotel.');
    }
  };

  const handleEdit = (hotel) => {
    alert(`Edit Hotel:\nNama: ${hotel.name}\nHarga: Rp ${hotel.price_per_night.toLocaleString()}`);
    // Nanti bisa dikembangkan ke form edit/modal
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>Gambar</b></TableCell>
            <TableCell><b>Nama Hotel</b></TableCell>
            <TableCell><b>Alamat</b></TableCell>
            <TableCell><b>Harga / Malam</b></TableCell>
            <TableCell><b>Fasilitas</b></TableCell>
            <TableCell><b>Kamar Tersedia</b></TableCell>
            <TableCell><b>Aksi</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow key={hotel.id}>
              <TableCell>
                <Avatar
                  variant="rounded"
                  src={hotel.image_url}
                  alt={hotel.name}
                  sx={{ width: 80, height: 60 }}
                />
              </TableCell>
              <TableCell>{hotel.name}</TableCell>
              <TableCell>{hotel.address}</TableCell>
              <TableCell>Rp {hotel.price_per_night.toLocaleString()}</TableCell>
              <TableCell>
                <Tooltip title={hotel.facilities}>
                  <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 150,
                    display: 'inline-block',
                  }}>
                    {hotel.facilities}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>{hotel.rooms_available}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(hotel)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(hotel.id)}
                  >
                    Hapus
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
