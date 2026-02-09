import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "http://localhost:3000/api";

function Admin({ setPage, token }) {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    hadir: 0,
    terlambat: 0,
    alpha: 0,
  });

  useEffect(() => {
    loadData();
  }, [token]);

  const loadData = async () => {
    try {
      const res = await axios.get(API + "/absensi/admin/rekap", {
        headers: { Authorization: token },
      });

      setData(res.data);

      // Hitung statistik
      let hadir = 0;
      let terlambat = 0;
      let alpha = 0;

      res.data.forEach((row) => {
        if (row.status === "hadir") hadir++;
        else if (row.status === "terlambat") terlambat++;
        else alpha++;
      });

      setStats({ hadir, terlambat, alpha });
    } catch (err) {
      alert("Gagal memuat data admin");
    }
  };

  return (
    <>
      <Navbar setPage={setPage} />

      <div className="page-container">
        <h2>Dashboard Admin</h2>

        {/* Statistik */}
        <div style={styles.statsContainer}>
          <div style={styles.card}>
            <h3>Hadir</h3>
            <p>{stats.hadir}</p>
          </div>
          <div style={styles.card}>
            <h3>Terlambat</h3>
            <p>{stats.terlambat}</p>
          </div>
          <div style={styles.card}>
            <h3>Alpha</h3>
            <p>{stats.alpha}</p>
          </div>
        </div>

        {/* Tabel */}
        <div className="card">
          <h3>Rekap Absensi</h3>
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Tanggal</th>
                <th>Masuk</th>
                <th>Pulang</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td>{row.nama}</td>
                  <td>{row.tanggal}</td>
                  <td>{row.jam_masuk || "-"}</td>
                  <td>{row.jam_pulang || "-"}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const styles = {
  statsContainer: {
    display: "flex",
    gap: 20,
    marginBottom: 20,
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 8,
    width: 150,
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
};

export default Admin;
