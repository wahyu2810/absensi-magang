import { Search } from "lucide-react";

function Topbar({ onLogout, userName = "Admin" }) {
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div style={styles.topbar}>
      {/* Search */}
      <div style={styles.searchBox}>
        <Search size={18} color="#6B7280" />
        <input
          placeholder="Search..."
          style={styles.searchInput}
        />
      </div>

      {/* Profil dan Logout */}
      <div style={styles.right}>
        <div style={styles.avatar}>{initial}</div>

        <button style={styles.logout} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    background: "white",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#F3F4F6",
    padding: "8px 12px",
    borderRadius: 8,
    minWidth: 220,
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: 14,
    width: "100%",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#C1121F",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  logout: {
    background: "#C1121F",
    border: "none",
    color: "white",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Topbar;
