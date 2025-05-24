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
} from '@mui/material';

export default function BookingTable({ bookings, onRefresh }) {
  const handleEdit = (booking) => {
    alert(`Edit booking ID: ${booking.id}\nFitur edit belum dibuat`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus booking ini?');
    if (!confirm) return;

    try {
      await fetch(`/bookings/${id}`, { method: 'DELETE' }); // atau gunakan axios
      alert('Booking berhasil dihapus');
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Gagal hapus booking:', error);
      alert('Gagal menghapus booking');
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>Nama Hotel</b></TableCell>
            <TableCell><b>Nama Tamu</b></TableCell>
            <TableCell><b>Email Tamu</b></TableCell>
            <TableCell><b>Telepon Tamu</b></TableCell>
            <TableCell><b>Tipe Kamar</b></TableCell>
            <TableCell><b>Check In</b></TableCell>
            <TableCell><b>Check Out</b></TableCell>
            <TableCell><b>Total Harga</b></TableCell>
            <TableCell><b>Aksi</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.hotel_name || b.name || '-'}</TableCell>
              <TableCell>{b.guest_name}</TableCell>
              <TableCell>{b.guest_email}</TableCell>
              <TableCell>{b.guest_phone}</TableCell>
              <TableCell>{b.room_type}</TableCell>
              <TableCell>{b.check_in_date}</TableCell>
              <TableCell>{b.check_out_date}</TableCell>
              <TableCell>{`Rp ${Number(b.total_price).toLocaleString()}`}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(b.id)}
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
