import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarioService } from "../api/usuarioService";
import { tecnologiaService } from "../api/tecnologiaService";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import StarRating from "../components/StarRating.jsx";

const ETIQUETAS_CATEGORIA = {
  BACKEND: "Backend",
  FRONTEND: "Frontend",
  DEVOPS: "DevOps",
  BASE_DATOS: "Bases de datos",
  TESTING: "Testing",
  CLOUD: "Cloud",
  CONTROL_VERSIONES: "Control de versiones",
  OTRO: "Otro",
};

export default function PerfilPage() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("skilltrack_usuarioId");

  const [usuario, setUsuario] = useState(null);
  const [tecnologias, setTecnologias] = useState([]);
  const [niveles, setNiveles] = useState({}); // { tecnologiaId: nivel }
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [guardadoOk, setGuardadoOk] = useState(false);

  useEffect(() => {
    Promise.all([
      usuarioService.obtenerPorId(usuarioId),
      tecnologiaService.listarTodas(),
      usuarioService.obtenerHabilidades(usuarioId),
    ])
      .then(([datosUsuario, listaTecnologias, habilidadesActuales]) => {
        setUsuario(datosUsuario);
        setTecnologias(listaTecnologias);

        const nivelesPrevios = {};
        habilidadesActuales.forEach((h) => {
          nivelesPrevios[h.tecnologiaId] = h.nivel;
        });
        setNiveles(nivelesPrevios);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [usuarioId]);

  function actualizarNivel(tecnologiaId, nivel) {
    setNiveles((prev) => ({ ...prev, [tecnologiaId]: nivel }));
    setGuardadoOk(false);
  }

  const tecnologiasPorCategoria = tecnologias.reduce((acc, tech) => {
    (acc[tech.categoria] ||= []).push(tech);
    return acc;
  }, {});

  async function manejarGuardar() {
    setError(null);
    setGuardando(true);
    try {
      const entradas = Object.entries(niveles).filter(([, nivel]) => nivel > 0);
      for (const [tecnologiaId, nivel] of entradas) {
        await usuarioService.agregarHabilidad(usuarioId, {
          tecnologiaId: Number(tecnologiaId),
          nivel,
          origen: "MANUAL",
        });
      }
      setGuardadoOk(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) return <p style={{ color: "var(--text-muted)" }}>Cargando tu perfil…</p>;

  return (
    <div style={{ maxWidth: "720px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>Tu perfil</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "28px" }}>
        Marca qué tanto conoces cada tecnología. Esto es la base de tu comparación contra ofertas
        reales.
      </p>

      {usuario && (
        <Card style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>Datos básicos</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "14px" }}>
            <DatoSoloLectura label="Nombre" valor={usuario.nombre} />
            <DatoSoloLectura label="Email" valor={usuario.email} />
            <DatoSoloLectura label="Carrera" valor={usuario.carrera} />
            <DatoSoloLectura label="Universidad" valor={usuario.universidad} />
          </div>
        </Card>
      )}

      <Card>
        <h2 style={{ fontSize: "16px", marginBottom: "4px" }}>Tus habilidades</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "18px" }}>
          Marca el nivel de cada tecnología que conoces. Deja en cero las que no manejes.
        </p>

        {Object.entries(tecnologiasPorCategoria).map(([categoria, techs]) => (
          <div key={categoria} style={{ marginBottom: "18px" }}>
            <h3
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--text-muted)",
                marginBottom: "10px",
              }}
            >
              {ETIQUETAS_CATEGORIA[categoria] || categoria}
            </h3>
            {techs.map((tech) => (
              <div
                key={tech.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span className="mono" style={{ fontSize: "14px" }}>
                  {tech.nombre}
                </span>
                <StarRating
                  value={niveles[tech.id] || 0}
                  onChange={(nivel) => actualizarNivel(tech.id, nivel)}
                />
              </div>
            ))}
          </div>
        ))}
      </Card>

      {error && <p style={{ color: "var(--accent-low)", fontSize: "14px", marginTop: "14px" }}>{error}</p>}
      {guardadoOk && (
        <p style={{ color: "var(--accent-ready)", fontSize: "14px", marginTop: "14px" }}>
          Habilidades guardadas.
        </p>
      )}

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <Button variant="secondary" onClick={manejarGuardar} disabled={guardando}>
          {guardando ? "Guardando…" : "Guardar habilidades"}
        </Button>
        <Button onClick={() => navigate("/ofertas")}>Ir a ofertas →</Button>
      </div>
    </div>
  );
}

function DatoSoloLectura({ label, valor }) {
  return (
    <div>
      <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>{label}: </span>
      <span style={{ color: "var(--text-primary)" }}>{valor || "—"}</span>
    </div>
  );
}