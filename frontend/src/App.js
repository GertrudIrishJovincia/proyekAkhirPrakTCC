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
import PrivateRoute from './private_routes.js';

function App() {
  return (
    <>
      <GlobalStyle /> 
      <Router>
        <Routes>
          {/* Route publik */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route yang diproteksi */}
          <Route 
            path="/landingpage" 
            element={
              <PrivateRoute>
                <LandingPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/booking" 
            element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/riwayat" 
            element={
              <PrivateRoute>
                <RiwayatPemesanan />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/detail-pemesanan/:id" 
            element={
              <PrivateRoute>
                <DetailPemesanan />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/hotels/add" 
            element={
              <PrivateRoute>
                <AddHotel />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/hotels/edit/:id" 
            element={
              <PrivateRoute>
                <EditHotel />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </>
  );
}


export default App;