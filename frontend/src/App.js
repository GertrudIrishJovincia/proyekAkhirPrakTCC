import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import BookingForm from './pages/BookingForm';
import RiwayatPemesanan from './pages/RiwayatPemesanan';
import GlobalStyle from './GlobalStyle'; 
import DetailPemesanan from './pages/DetailPemesanan';
import AdminDashboard from './pages/AdminDashboard';
import AddHotel from './pages/AddHotel';
import EditHotel from './pages/EditHotel';
import EditBooking from './pages/EditBooking'; 

function App() {
  return (
    <>
      <GlobalStyle /> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/riwayat" element={<RiwayatPemesanan />} />
          <Route path="/detail-pemesanan/:id" element={<DetailPemesanan />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/hotels/add" element={<AddHotel />} />
          <Route path="/admin/hotels/edit/:id" element={<EditHotel />} />
          <Route path="/admin/bookings/edit/:id" element={<EditBooking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
