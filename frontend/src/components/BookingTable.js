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
            <TableCell><b>Nama Hotel</b></TableCell>
            <TableCell><b>Nama Tamu</b></TableCell>
            <TableCell><b>Email Tamu</b></TableCell>
            <TableCell><b>Telepon Tamu</b></TableCell>
            <TableCell><b>Tipe Kamar</b></TableCell>
            <TableCell><b>Check In</b></TableCell>
            <TableCell><b>Check Out</b></TableCell>
            <TableCell><b>Total Harga</b></TableCell>
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
