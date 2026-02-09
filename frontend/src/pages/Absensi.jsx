import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "http://localhost:3000/api";

function Absensi({ setPage, token }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState("");

  // Aktifkan kamera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        setError("Kamera tidak dapat diakses");
      }
    };

    startCamera();

    // Matikan kamera saat keluar halaman
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Ambil foto dari kamera
  const ambilFoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/png");
  };

  // Absen masuk
  const absenMasuk = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const foto = ambilFoto();

          await axios.post(
            API + "/absensi/masuk",
            {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              foto,
            },
            {
              headers: { Authorization: token },
            }
          );

          alert("Absen masuk berhasil");
        } catch (err) {
          alert("Gagal absen masuk");
        }
      },
      () => {
        alert("Lokasi tidak diizinkan");
      }
    );
  };

  // Absen pulang
  const absenPulang = async () => {
    try {
      const foto = ambilFoto();

      await axios.post(
        API + "/absensi/pulang",
        { foto },
        {
          headers: { Authorization: token },
        }
      );

      alert("Absen pulang berhasil");
    } catch (err) {
      alert("Gagal absen pulang");
    }
  };

  return (
    <>
      <Navbar setPage={setPage} />

      <div className="page-container">
        <h2>Absensi dengan Selfie</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="card" style={{ textAlign: "center" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "320px",
              borderRadius: "8px",
              border: "2px solid #C1121F",
            }}
          />

          <canvas ref={canvasRef} style={{ display: "none" }} />

          <br /><br />

          <button onClick={absenMasuk}>Absen Masuk</button>
          <br /><br />
          <button onClick={absenPulang}>Absen Pulang</button>
        </div>
      </div>
    </>
  );
}

export default Absensi;
