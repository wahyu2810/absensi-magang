import logo from "../assets/bawaslu.png";

function Navbar({ setPage }) {
  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <img src={logo} alt="Logo Bawaslu" style={styles.logo} />
        <h2 style={styles.title}>Absensi Magang Bawaslu</h2>
      </div>

      <div style={styles.menu}>
        <button style={styles.btn} onClick={() => setPage("dashboard")}>
          Dashboard
        </button>
        <button style={styles.btn} onClick={() => setPage("absensi")}>
          Absensi
        </button>
        <button style={styles.btn} onClick={() => setPage("riwayat")}>
          Riwayat
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#C1121F",
    padding: "12px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: 42,
    width: "auto",
  },
  title: {
    color: "white",
    marginLeft: 12,
    fontSize: "18px",
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    gap: 10,
  },
  btn: {
    background: "white",
    color: "#C1121F",
    border: "none",
    padding: "8px 14px",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;
