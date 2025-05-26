import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Container,
  Button,
  Stack,
} from '@mui/material';
import UserTable from '../components/UserTable';
import HotelTable from '../components/HotelTable';
import BookingTable from '../components/BookingTable';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users`);
    console.log('Users:', res.data);
    setUsers(res.data);
  } catch (error) {
    console.error('Gagal ambil user:', error);
  }
};

const fetchHotels = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/hotels`);  // panggil endpoint utama
    setHotels(res.data);
  } catch (error) {
    console.error('Gagal ambil hotel:', error);
  }
};


const fetchBookings = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/bookings`);
    console.log('Bookings:', res.data);
    setBookings(res.data);
  } catch (error) {
    console.error('Gagal ambil booking:', error);
  }
};


 const handleDeleteHotel = async (hotelId) => {
  if (!window.confirm("Yakin ingin menghapus hotel ini?")) return;

  try {
    await axios.delete(`${BASE_URL}/api/hotels/${hotelId}`);  // PENTING: pakai prefix /api/hotels
    alert("Hotel berhasil dihapus");
    fetchHotels(); // refresh data hotel setelah hapus
  } catch (error) {
    console.error("Gagal hapus hotel:", error.response || error.message || error);
    alert("Gagal menghapus hotel");
  }
};

 const handleEditHotel = (hotel) => {
    navigate(`/admin/hotels/edit/${hotel.id}`);
  };

  const handleEditBooking = (booking) => {
  navigate(`/admin/bookings/edit/${booking.id}`);
};



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Dashboard Admin
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            sx={{
              fontWeight: 'bold',
              boxShadow: 2,
              px: 3
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      {/* Section User */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="secondary" gutterBottom>
          👥 Daftar Pengguna
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <UserTable users={users} onRefresh={fetchUsers} />
      </Paper>

      {/* Section Hotel */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="secondary">
            🏨 Daftar Hotel
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/hotels/add')}
          >
            Tambah Hotel
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

       <HotelTable hotels={hotels} onRefresh={fetchHotels} onDeleteHotel={handleDeleteHotel} onEditHotel={handleEditHotel}  />
      </Paper>

      {/* Section Booking */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="secondary" gutterBottom>
          📅 Daftar Booking
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <BookingTable
        bookings={bookings}
        onRefresh={fetchBookings}
        onEditBooking={handleEditBooking}
      />
      </Paper>
          </Container>
        );
      }
