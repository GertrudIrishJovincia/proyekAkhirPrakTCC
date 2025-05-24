import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function BookingTable({ bookings }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell>Nama Hotel</TableCell>
            <TableCell>Nama Tamu</TableCell>
            <TableCell>Email Tamu</TableCell>
            <TableCell>Telepon Tamu</TableCell>
            <TableCell>Tipe Kamar</TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
            <TableCell>Total Harga</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.hotel_name}</TableCell>
              <TableCell>{b.guest_name}</TableCell>
              <TableCell>{b.guest_email}</TableCell>
              <TableCell>{b.guest_phone}</TableCell>
              <TableCell>{b.room_type}</TableCell>
              <TableCell>{b.check_in_date}</TableCell>
              <TableCell>{b.check_out_date}</TableCell>
              <TableCell>{`Rp ${Number(b.total_price).toLocaleString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
