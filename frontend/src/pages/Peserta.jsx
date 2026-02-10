import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const API = import.meta.env.VITE_API_URL + "/api";

function Peserta({ setPage, token }) {
  const [data, setData] = useState([]);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(API + "/users", {
        headers: { Authorization: token },
      })
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }, [token]);

  return (
    <div style={styles.layout}>
      <Sidebar setPage={setPage} page="peserta" role="admin" />

      <div style={styles.main}>
        <Topbar onLogout={logout} userName="Admin" />

        <div style={styles.content}>
          <h3>Manajemen Peserta Magang</h3>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, i) => (
                  <tr key={i}>
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data.length === 0 && (
              <p style={{ marginTop: 15 }}>
                Belum ada data peserta.
              </p>
            )}
          </div>
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
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: 25,
  },
};

export default Peserta;
