import { useState } from "react";
import axios from "axios";
import logo from "../assets/bawaslu.png";

const API = "https://absen-magang-production.up.railway.app/api/auth/login";

function Login({ setToken, setRole, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(API + "/auth/login", {
        email,
        password,
      });

      setToken(res.data.token);
      setRole(res.data.role);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <img src={logo} alt="Bawaslu" style={styles.logo} />

        <h2 style={styles.title}>Login Absensi Magang</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        <p style={styles.registerText}>
          Belum punya akun?{" "}
          <span
            style={styles.registerLink}
            onClick={() => setPage("register")}
          >
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F5F6FA",
    padding: 20,
  },
  card: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    width: "100%",
    maxWidth: 360,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  logo: {
    width: 90,
    margin: "0 auto 5px",
  },
  title: {
    color: "#C1121F",
    marginBottom: 10,
    fontSize: 20,
  },
  input: {
    padding: 12,
    borderRadius: 6,
    border: "1px solid #D1D5DB",
    fontSize: 14,
  },
  button: {
    background: "#C1121F",
    color: "white",
    border: "none",
    padding: 12,
    borderRadius: 6,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 5,
  },
  registerText: {
    fontSize: 14,
    marginTop: 10,
  },
  registerLink: {
    color: "#C1121F",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
