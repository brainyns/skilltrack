import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function RegistroPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function manejarSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setEnviando(true);
    try {
      const auth = await authService.registrar({ nombre, email, password });
      authService.guardarSesion(auth);
      navigate("/perfil");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h1 style={{ fontSize: "26px", marginBottom: "6px", textAlign: "center" }}>Crea tu cuenta</h1>
      <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "24px" }}>
        Empieza a medir qué tan listo estás para tu próximo empleo.
      </p>

      <Card>
        <form onSubmit={manejarSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Campo label="Nombre completo" value={nombre} onChange={setNombre} required />
          <Campo label="Email" type="email" value={email} onChange={setEmail} required />
          <Campo
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            required
            hint="Mínimo 6 caracteres"
          />

          {error && <p style={{ color: "var(--accent-low)", fontSize: "13px" }}>{error}</p>}

          <Button type="submit" disabled={enviando} style={{ marginTop: "6px" }}>
            {enviando ? "Creando cuenta…" : "Crear cuenta"}
          </Button>
        </form>
      </Card>

      <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "var(--text-muted)" }}>
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" style={{ color: "var(--accent-ready)" }}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

function Campo({ label, value, onChange, type = "text", required = false, hint = "" }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "var(--surface-raised)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "9px 10px",
          color: "var(--text-primary)",
          fontSize: "14px",
        }}
      />
      {hint && <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{hint}</span>}
    </label>
  );
}