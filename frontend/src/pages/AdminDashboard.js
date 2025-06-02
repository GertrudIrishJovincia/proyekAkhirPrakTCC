import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

import UserTable from '../components/UserTable';
import HotelTable from '../components/HotelTable';
import BookingTable from '../components/BookingTable';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`/api/users`);
      setUsers(res.data);
    } catch (error) {
      console.error('Gagal ambil user:', error);
    }
  };

  const fetchHotels = async () => {
    try {
      const res = await axios.get(`/api/hotels`);
      setHotels(res.data);
    } catch (error) {
      console.error('Gagal ambil hotel:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`/api/bookings`);
      setBookings(res.data);
    } catch (error) {
      console.error('Gagal ambil booking:', error);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm("Yakin ingin menghapus hotel ini?")) return;

    try {
      await axios.delete(`/api/hotels/${hotelId}`);
      alert("Hotel berhasil dihapus");
      fetchHotels();
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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredBookings = bookings.filter(booking =>
    booking.guest_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#fff8e1' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          bgcolor: '#8B6F47',  // coklat utama
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Halo Admin!
          </Typography>

          <List>
            {[
              { label: 'Dashboard', icon: <HomeIcon />, onClick: () => {} },
            ].map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton sx={{ color: 'white' }} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Button
            variant="contained"
            sx={{ bgcolor: '#725e3b', '&:hover': { bgcolor: '#5a4a2e' } }}
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto' }}>
        {/* Search bar */}
        <Box sx={{ mb: 4, maxWidth: 600 }}>
          <TextField
            fullWidth
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#8B6F47' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Summary Cards */}
        <Stack direction="row" spacing={3} mb={4} flexWrap="wrap">
          <Card sx={{ flex: '1 1 200px', bgcolor: '#f1e0b5' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="#8B6F47">
                {users.length}
              </Typography>
              <Typography color="#8B6F47">Pengguna Terdaftar</Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: '1 1 200px', bgcolor: '#d4c9a1' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="#725e3b">
                {hotels.length}
              </Typography>
              <Typography color="#8B6F47">Hotel Terdaftar</Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: '1 1 200px', bgcolor: '#ead7a7' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="#80652f">
                {bookings.length}
              </Typography>
              <Typography color="#8B6F47">Booking Aktif</Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Tabel Data */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, borderColor: '#8B6F47' }}>
          <Typography variant="h6" fontWeight="bold" color="#8B6F47" gutterBottom>
            👥 Daftar Pengguna
          </Typography>
          <Divider sx={{ mb: 2, borderColor: '#8B6F47' }} />
          <UserTable users={filteredUsers} onRefresh={fetchUsers} />
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, borderColor: '#8B6F47' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#8B6F47">
              🏨 Daftar Hotel
            </Typography>

            <Button
              variant="contained"
              sx={{ bgcolor: '#8B6F47', '&:hover': { bgcolor: '#725e3b' } }}
              onClick={() => navigate('/admin/hotels/add')}
            >
              Tambah Hotel
            </Button>
          </Box>

          <Divider sx={{ mb: 2, borderColor: '#8B6F47' }} />

          <HotelTable
            hotels={filteredHotels}
            onRefresh={fetchHotels}
            onDeleteHotel={handleDeleteHotel}
            onEditHotel={handleEditHotel}
          />
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, borderColor: '#8B6F47' }}>
          <Typography variant="h6" fontWeight="bold" color="#8B6F47" gutterBottom>
            📅 Daftar Booking
          </Typography>
          <Divider sx={{ mb: 2, borderColor: '#8B6F47' }} />
          <BookingTable
            bookings={filteredBookings}
            onRefresh={fetchBookings}
            onEditBooking={handleEditBooking}
          />
        </Paper>
      </Box>
    </Box>
  );
}
