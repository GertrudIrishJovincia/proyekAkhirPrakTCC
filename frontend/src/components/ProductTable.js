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
  Typography,
} from '@mui/material';

export default function ProductTable({ products, onRefresh, onDeleteProduct, onEditProduct }) {
  const handleDelete = (uuid) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
    if (onDeleteProduct) onDeleteProduct(uuid);
  };

  const handleEdit = (product) => {
    if (onEditProduct) onEditProduct(product);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>UUID</b></TableCell>
            <TableCell><b>Nama Produk</b></TableCell>
            <TableCell><b>Harga</b></TableCell>
            <TableCell><b>Kategori</b></TableCell>
            <TableCell><b>User ID</b></TableCell>
            <TableCell><b>Aksi</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.uuid}>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    maxWidth: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {product.uuid}
                </Typography>
              </TableCell>
              <TableCell>{product.name || '-'}</TableCell>
              <TableCell>
                <Typography variant="body2" color="primary" fontWeight="medium">
                  Rp {Number(product.price).toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell>
                {product.category ? (
                  <Typography variant="body2">
                    {product.category.type}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {product.category_id ? `ID: ${product.category_id}` : '-'}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{product.userId || '-'}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="primary" 
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="error" 
                    onClick={() => handleDelete(product.uuid)}
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