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
  Stack
} from '@mui/material';
import axios from '../axiosInstance';

export default function UserTable({ users, onRefresh }) {
  const handleEdit = (user) => {
    alert(`Edit User:\n\nNama: ${user.name}\nEmail: ${user.email}`);
    // Kamu bisa lanjut ke halaman / form edit user
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus user ini?');
    if (!confirm) return;

    try {
      await axios.delete(`/users/${id}`); // pastikan endpoint ini ada di backend-mu
      onRefresh(); // refresh data dari AdminDashboard
    } catch (error) {
      console.error('Gagal hapus user:', error);
      alert('Gagal menghapus user');
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>Nama</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Role</b></TableCell>
            <TableCell><b>Aksi</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user.id)}
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
