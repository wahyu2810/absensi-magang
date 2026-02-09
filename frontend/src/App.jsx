import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Absensi from "./pages/Absensi";
import Riwayat from "./pages/Riwayat";
import AdminDashboard from "./pages/AdminDashboard";
import RiwayatAdmin from "./pages/RiwayatAdmin";
import Peserta from "./pages/Peserta";

function App() {
  const [page, setPage] = useState("dashboard");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("magang");

  // Ambil token dari localStorage saat pertama load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole || "magang");
    }
  }, []);

  /* =========================
     JIKA BELUM LOGIN
  ========================= */
  if (!token) {
    if (page === "register") {
      return <Register setPage={setPage} />;
    }

    return (
      <Login
        setToken={setToken}
        setRole={setRole}
        setPage={setPage}
      />
    );
  }

  /* =========================
     ROUTING ADMIN
  ========================= */
  if (role === "admin") {
    if (page === "dashboard") {
      return <AdminDashboard setPage={setPage} />;
    }

    if (page === "riwayatAdmin") {
      return <RiwayatAdmin setPage={setPage} token={token} />;
    }

    if (page === "peserta") {
      return <Peserta setPage={setPage} token={token} />;
    }

    // default admin
    return <AdminDashboard setPage={setPage} />;
  }

  /* =========================
     ROUTING PESERTA MAGANG
  ========================= */
  if (page === "dashboard") {
    return <Dashboard setPage={setPage} />;
  }

  if (page === "absensi") {
    return <Absensi setPage={setPage} token={token} />;
  }

  if (page === "riwayat") {
    return <Riwayat setPage={setPage} token={token} />;
  }

  return <Dashboard setPage={setPage} token={token} />;
}

export default App;
