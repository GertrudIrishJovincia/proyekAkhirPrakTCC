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

export default function PinjamBarangTable({ pinjamBarang }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>Nama Barang</b></TableCell>
            <TableCell><b>Nama Peminjam</b></TableCell>
            <TableCell><b>Email Peminjam</b></TableCell>
            <TableCell><b>Telepon Peminjam</b></TableCell>
            <TableCell><b>Kategori Barang</b></TableCell>
            <TableCell><b>Tanggal Pinjam</b></TableCell>
            <TableCell><b>Tanggal Kembali</b></TableCell>
            <TableCell><b>Total Harga</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pinjamBarang.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.item_name}</TableCell>
              <TableCell>{p.borrower_name}</TableCell>
              <TableCell>{p.borrower_email}</TableCell>
              <TableCell>{p.borrower_phone}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.borrow_date}</TableCell>
              <TableCell>{p.return_date}</TableCell>
              <TableCell>{`Rp ${Number(p.total_price).toLocaleString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
