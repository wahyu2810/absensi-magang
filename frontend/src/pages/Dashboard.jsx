import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = import.meta.env.VITE_API_URL + "/api";

function Dashboard({ setPage }) {
  const [data, setData] = useState({
    status: "-",
    jam_masuk: null,
    jam_pulang: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(API + "/absensi/hari-ini", {
        headers: { Authorization: token },
      })
      .then((res) => setData(res.data))
      .catch(() => console.log("Gagal ambil data hari ini"));
  }, [token]);

  const formatTime = (time) => {
    if (!time) return "-";
    return time.slice(0, 5); // format HH:MM
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Navbar setPage={setPage} />

      <div style={styles.container}>
        <div style={styles.header}>
          <h2>Dashboard</h2>
          <button style={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>

        {/* Card status */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h4>Status</h4>
            <p style={styles.status}>
              {data.status || "-"}
            </p>
          </div>

          <div style={styles.card}>
            <h4>Jam Masuk</h4>
            <p style={styles.time}>
              {formatTime(data.jam_masuk)}
            </p>
          </div>

          <div style={styles.card}>
            <h4>Jam Pulang</h4>
            <p style={styles.time}>
              {formatTime(data.jam_pulang)}
            </p>
          </div>
        </div>

        {/* Tombol absen */}
        <div style={styles.buttonArea}>
          <button
            style={styles.absenBtn}
            onClick={() => setPage("absensi")}
          >
            Absen Masuk / Pulang
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: 30,
    maxWidth: 1000,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  logout: {
    background: "#C1121F",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
  cards: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 30,
  },
  card: {
    background: "white",
    padding: 25,
    borderRadius: 12,
    flex: 1,
    minWidth: 200,
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },
  status: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#C1121F",
    textTransform: "capitalize",
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  buttonArea: {
    textAlign: "center",
  },
  absenBtn: {
    background: "#C1121F",
    color: "white",
    padding: "14px 30px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
};

export default Dashboard;