import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import BookingForm from './pages/BookingForm';
import RiwayatPemesanan from './pages/RiwayatPemesanan';
import GlobalStyle from './GlobalStyle'; 
import DetailPemesanan from './pages/DetailPemesanan';

function App() {
  return (
    <>
      <GlobalStyle /> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/daftar" element={<Register />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/riwayat" element={<RiwayatPemesanan />} />
          <Route path="/detail-pemesanan/:id" element={<DetailPemesanan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
