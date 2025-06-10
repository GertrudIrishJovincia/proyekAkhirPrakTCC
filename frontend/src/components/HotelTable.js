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

export default function HotelTable({ hotels, onRefresh, onDeleteHotel, onEditHotel }) {
  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus hotel ini?')) return;
    if (onDeleteHotel) onDeleteHotel(id);
  };

  const handleEdit = (hotel) => {
    if (onEditHotel) onEditHotel(hotel);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>Gambar</b></TableCell>
            <TableCell><b>Kode Barang</b></TableCell>
            <TableCell><b>Nama Barang</b></TableCell>
            <TableCell><b>Kategori</b></TableCell>
            <TableCell><b>Tipe Kamar</b></TableCell>
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
              <TableCell>{hotel.name || '-'}</TableCell>
              <TableCell>{hotel.address || '-'}</TableCell>
              <TableCell>
                <Tooltip title={hotel.facilities || ''}>
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 150,
                      display: 'inline-block',
                    }}
                  >
                    {hotel.facilities || '-'}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                {hotel.room_types?.length > 0 ? (
                  <Table size="small" sx={{ backgroundColor: '#fafafa' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Tipe</b></TableCell>
                        <TableCell><b>Harga</b></TableCell>
                        <TableCell><b>Stok</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {hotel.room_types.map((room, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{room.type}</TableCell>
                          <TableCell>Rp {Number(room.price_per_night).toLocaleString()}</TableCell>
                          <TableCell>{room.stock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Tidak ada data
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" size="small" color="primary" onClick={() => handleEdit(hotel)}>
                    Edit
                  </Button>
                  <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(hotel.id)}>
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
