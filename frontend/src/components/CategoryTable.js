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

export default function CategoryTable({ categories }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Type</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Created At</b></TableCell>
            <TableCell><b>Updated At</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.type}</TableCell>
              <TableCell>{category.description || '-'}</TableCell>
              <TableCell>{new Date(category.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(category.updated_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}