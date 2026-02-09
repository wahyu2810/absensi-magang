import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const API = "http://localhost:3000/api";

function RiwayatAdmin({ setPage, token }) {
  const [data, setData] = useState([]);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(API + "/absensi/admin/rekap", {
        headers: { Authorization: token },
      })
      .then((res) => setData(res.data));
  }, []);

  return (
    <div style={styles.layout}>
      <Sidebar setPage={setPage} page="riwayatAdmin" role="admin" />

      <div style={styles.main}>
        <Topbar onLogout={logout} userName="Admin" />

        <div style={styles.content}>
          <h3>Riwayat Absensi Peserta</h3>

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
                  <td>{row.jam_masuk}</td>
                  <td>{row.jam_pulang}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#F5F6FA",
  },
  main: {
    flex: 1,
  },
  content: {
    padding: 25,
  },
};

export default RiwayatAdmin;
