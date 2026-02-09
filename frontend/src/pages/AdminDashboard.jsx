import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Data dummy grafik
const data = [
  { name: "Sen", hadir: 10 },
  { name: "Sel", hadir: 15 },
  { name: "Rab", hadir: 8 },
  { name: "Kam", hadir: 20 },
  { name: "Jum", hadir: 18 },
];

function AdminDashboard({ setPage }) {
  // Fungsi logout
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <Sidebar setPage={setPage} page="dashboard" role="admin" />

      {/* Main area */}
      <div style={styles.main}>
        {/* Topbar */}
        <Topbar onLogout={logout} userName="Admin" />

        {/* Konten utama */}
        <div style={styles.content}>
          {/* Statistik */}
          <div style={styles.cards}>
            <div className="stat-card">
              <h4>Total Hadir</h4>
              <p className="stat-number">53</p>
            </div>

            <div className="stat-card">
              <h4>Terlambat</h4>
              <p className="stat-number">7</p>
            </div>

            <div className="stat-card">
              <h4>Alpha</h4>
              <p className="stat-number">2</p>
            </div>
          </div>

          {/* Grafik */}
          <div className="card">
            <h4>Grafik Kehadiran Mingguan</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hadir"
                  stroke="#C1121F"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tabel */}
          <div className="card">
            <h4>Absensi Terbaru</h4>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wahyu</td>
                  <td>2026-02-07</td>
                  <td>Hadir</td>
                </tr>
                <tr>
                  <td>Andi</td>
                  <td>2026-02-07</td>
                  <td>Terlambat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    background: "#F5F6FA",
    minHeight: "100vh",
    width: "100%",        // penting agar full layar
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",        // penting agar tidak ada area kosong
  },
  content: {
    padding: 25,
  },
  cards: {
    display: "flex",
    gap: 20,
    marginBottom: 25,
    flexWrap: "wrap",
  },
};

export default AdminDashboard;
