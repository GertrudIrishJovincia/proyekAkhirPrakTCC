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
  Typography,
} from '@mui/material';

export default function BarangTable({ barang, onRefresh, onDeleteBarang, onEditBarang }) {
  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus barang ini?')) return;
    if (onDeleteBarang) onDeleteBarang(id);
  };

  const handleEdit = (barang) => {
    if (onEditBarang) onEditBarang(barang);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>Gambar</b></TableCell>
            <TableCell><b>Nama Barang</b></TableCell>
            <TableCell><b>Alamat</b></TableCell>
            <TableCell><b>Fasilitas</b></TableCell>
            <TableCell><b>Kategori</b></TableCell>
            <TableCell><b>Harga</b></TableCell>
            <TableCell><b>Aksi</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {barang.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Avatar
                  variant="rounded"
                  src={item.image_url}
                  alt={item.name}
                  sx={{ width: 80, height: 60 }}
                />
              </TableCell>
              <TableCell>{item.name || '-'}</TableCell>
              <TableCell>{item.address || '-'}</TableCell>
              <TableCell>
                <Tooltip title={item.facilities || ''}>
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 150,
                      display: 'inline-block',
                    }}
                  >
                    {item.facilities || '-'}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>{item.category || '-'}</TableCell>
              <TableCell>Rp {Number(item.price).toLocaleString()}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" size="small" color="primary" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(item.id)}>
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
