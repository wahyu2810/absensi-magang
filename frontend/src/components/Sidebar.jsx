import {
  LayoutDashboard,
  Camera,
  Clock,
  Users,
} from "lucide-react";

// Import logo dari assets
import logo from "../assets/bawaslu.png";

function Sidebar({ setPage, page, role }) {
  // Menu khusus admin
  const adminMenus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      key: "dashboard",
    },
    {
      name: "Riwayat Absensi",
      icon: <Clock size={18} />,
      key: "riwayatAdmin",
    },
    {
      name: "Manajemen Peserta",
      icon: <Users size={18} />,
      key: "peserta",
    },
  ];

  // Menu khusus peserta
  const pesertaMenus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      key: "dashboard",
    },
    {
      name: "Absensi",
      icon: <Camera size={18} />,
      key: "absensi",
    },
    {
      name: "Riwayat",
      icon: <Clock size={18} />,
      key: "riwayat",
    },
  ];

  const menus = role === "admin" ? adminMenus : pesertaMenus;

  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logoBox}>
        <img src={logo} alt="Bawaslu" style={styles.logo} />
      </div>

      {/* Menu */}
      {menus.map((menu) => (
        <button
          key={menu.key}
          onClick={() => setPage(menu.key)}
          style={{
            ...styles.menu,
            ...(page === menu.key ? styles.active : {}),
          }}
        >
          {menu.icon}
          {menu.name}
        </button>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: 230,
    height: "100vh",
    background: "white",
    padding: 20,
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  logoBox: {
    marginBottom: 30,
    textAlign: "center",
  },
  logo: {
    width: 140,
    objectFit: "contain",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    padding: "10px 12px",
    marginBottom: 10,
    background: "#F3F4F6",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "500",
    color: "#1F2937",
  },
  active: {
    background: "#C1121F",
    color: "white",
  },
};

export default Sidebar;
