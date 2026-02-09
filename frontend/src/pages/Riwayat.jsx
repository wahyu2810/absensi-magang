import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://absen-magang-production.up.railway.app/api/absensi/riwayat";

function Riwayat({ setPage, token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(API + "/absensi/riwayat", {
        headers: { Authorization: token },
      })
      .then((res) => setData(res.data))
      .catch(() => alert("Gagal mengambil data riwayat"));
  }, [token]);

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("id-ID");
  };

  const formatTime = (time) => {
    if (!time) return "-";
    return time.slice(0, 5);
  };

  return (
    <>
      <Navbar setPage={setPage} />

      <div style={styles.container}>
        <h2 style={styles.title}>Riwayat Absensi</h2>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Masuk</th>
                <th>Pulang</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4">Belum ada data</td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr key={i}>
                    <td>{formatDate(row.tanggal)}</td>
                    <td>{formatTime(row.jam_masuk)}</td>
                    <td>{formatTime(row.jam_pulang)}</td>
                    <td style={styles.status}>
                      {row.status || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: 25,
    maxWidth: 900,
    margin: "0 auto",
  },
  title: {
    marginBottom: 15,
    color: "#1f2937",
  },
  card: {
    background: "white",
    borderRadius: 10,
    padding: 15,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    color: "#1f2937",
  },
  status: {
    fontWeight: "bold",
    color: "#C1121F",
  },
};

export default Riwayat;
