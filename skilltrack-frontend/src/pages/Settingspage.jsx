import { useEffect, useState } from "react";
import { usuarioService } from "../api/usuarioService";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function SettingsPage() {
  const usuarioId = localStorage.getItem("skilltrack_usuarioId");

  const [usuario, setUsuario] = useState(null);
  const [datos, setDatos] = useState({ carrera: "", semestre: "", universidad: "", githubUrl: "" });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [guardadoOk, setGuardadoOk] = useState(false);

  useEffect(() => {
    usuarioService
      .obtenerPorId(usuarioId)
      .then((u) => {
        setUsuario(u);
        setDatos({
          carrera: u.carrera || "",
          semestre: u.semestre || "",
          universidad: u.universidad || "",
          githubUrl: u.githubUrl || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [usuarioId]);

  function actualizar(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    setGuardadoOk(false);
  }

  async function manejarGuardar(e) {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      await usuarioService.actualizarPerfil(usuarioId, {
        ...datos,
        semestre: datos.semestre ? Number(datos.semestre) : null,
      });
      setGuardadoOk(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) return <p style={{ color: "var(--text-muted)" }}>Cargando configuración…</p>;

  return (
    <div style={{ maxWidth: "560px" }}>
      <h1 style={{ fontSize: "26px", marginBottom: "6px" }}>Configuración</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "28px" }}>
        Completa estos datos opcionales para personalizar tu perfil.
      </p>

      {usuario && (
        <Card style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "15px", marginBottom: "4px" }}>Cuenta</h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            {usuario.nombre} · {usuario.email}
          </p>
        </Card>
      )}

      <Card>
        <h2 style={{ fontSize: "15px", marginBottom: "16px" }}>Datos académicos (opcional)</h2>
        <form onSubmit={manejarGuardar} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Campo label="Carrera" value={datos.carrera} onChange={(v) => actualizar("carrera", v)} />
          <Campo
            label="Semestre"
            type="number"
            value={datos.semestre}
            onChange={(v) => actualizar("semestre", v)}
          />
          <Campo
            label="Universidad"
            value={datos.universidad}
            onChange={(v) => actualizar("universidad", v)}
          />
          <Campo
            label="GitHub"
            value={datos.githubUrl}
            onChange={(v) => actualizar("githubUrl", v)}
            placeholder="github.com/usuario"
          />

          {error && <p style={{ color: "var(--accent-low)", fontSize: "13px" }}>{error}</p>}
          {guardadoOk && (
            <p style={{ color: "var(--accent-ready)", fontSize: "13px" }}>Cambios guardados.</p>
          )}

          <Button type="submit" disabled={guardando} style={{ alignSelf: "flex-start", marginTop: "6px" }}>
            {guardando ? "Guardando…" : "Guardar cambios"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

function Campo({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
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
    </label>
  );
}