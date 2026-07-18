import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function manejarSubmit(e) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const auth = await authService.login(email, password);
      authService.guardarSesion(auth);
      navigate("/ofertas");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h1 style={{ fontSize: "26px", marginBottom: "6px", textAlign: "center" }}>Bienvenido de vuelta</h1>
      <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "24px" }}>
        Inicia sesión para ver tu progreso.
      </p>

      <Card>
        <form onSubmit={manejarSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Email</span>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "9px 10px",
                color: "var(--text-primary)",
                fontSize: "14px",
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Contraseña</span>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "9px 10px",
                color: "var(--text-primary)",
                fontSize: "14px",
              }}
            />
          </label>

          {error && <p style={{ color: "var(--accent-low)", fontSize: "13px" }}>{error}</p>}

          <Button type="submit" disabled={enviando} style={{ marginTop: "8px" }}>
            {enviando ? "Ingresando…" : "Iniciar sesión"}
          </Button>
        </form>
      </Card>

      <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "var(--text-muted)" }}>
        ¿No tienes cuenta?{" "}
        <Link to="/registro" style={{ color: "var(--accent-ready)" }}>
          Regístrate
        </Link>
      </p>
    </div>
  );
}