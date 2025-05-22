// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // jika menggunakan routing
// import "./RiwayatPemesanan.css"; // Pindahkan CSS ke file terpisah

// const RiwayatPemesanan = ({ username }) => {
//   const [kunci, setKunci] = useState("");
//   const navigate = useNavigate(); // opsional, jika ingin redirect

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simulasi submit POST (ganti sesuai kebutuhan)
//     if (kunci.trim() !== "") {
//       // Redirect atau fetch data sesuai kunci
//       console.log("Cari riwayat pemesanan untuk:", kunci);

//       // Contoh redirect dengan query param
//       navigate(`/detail-pemesanan?kunci=${encodeURIComponent(kunci)}`);
//     } else {
//       alert("Harap masukkan kunci untuk melihat riwayat pemesanan.");
//     }
//   };

//   return (
//     <div className="riwayat-container">
//       <div className="sidebar">
//         <img src="/gambar/profile.jpg" alt="User" />
//         <h3>{username}</h3>
//         <a href="/dashboard" className="">Pemesanan</a>
//         <a href="/riwayat" className="active">Riwayat Pemesanan</a>
//         <a href="/logout" className="logout">Keluar</a>
//       </div>

//       <div className="main-content">
//         <div className="history-container">
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="kunci">Masukkan Kunci</label>
//             <input
//               type="text"
//               id="kunci"
//               name="kunci"
//               placeholder="Kunci"
//               value={kunci}
//               onChange={(e) => setKunci(e.target.value)}
//               required
//             />
//             <button type="submit">Cari</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RiwayatPemesanan;
