import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarioService } from "../api/usuarioService";
import { tecnologiaService } from "../api/tecnologiaService";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import StarRating from "../components/Starrating.jsx";

const ETIQUETAS_CATEGORIA = {
  BACKEND: "Backend",
  FRONTEND: "Frontend",
  DEVOPS: "DevOps",
  BASE_DATOS: "Database",
  TESTING: "Testing",
  CLOUD: "Cloud",
  CONTROL_VERSIONES: "Tools",
  OTRO: "Otro",
};

export default function PerfilPage() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("skilltrack_usuarioId");

  const [usuario, setUsuario] = useState(null);
  const [tecnologias, setTecnologias] = useState([]);
  const [niveles, setNiveles] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardandoId, setGuardandoId] = useState(null);
  const [error, setError] = useState(null);

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

  // Guardado inmediato al cambiar una estrella (como en un skill tree real)
  async function actualizarNivel(tecnologiaId, nivel) {
    setNiveles((prev) => ({ ...prev, [tecnologiaId]: nivel }));

    if (nivel === 0) return; // no tiene sentido guardar nivel 0, simplemente no se envia

    setGuardandoId(tecnologiaId);
    setError(null);
    try {
      await usuarioService.agregarHabilidad(usuarioId, {
        tecnologiaId,
        nivel,
        origen: "MANUAL",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardandoId(null);
    }
  }

  if (cargando) return <p style={{ color: "var(--text-muted)" }}>Cargando tu perfil…</p>;

  const tecnologiasFiltradas = tecnologias.filter((t) =>
    t.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "26px", marginBottom: "4px" }}>Skill Matrix</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Evaluación cuantificable de tu dominio técnico.
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate("/ofertas")}>
          Comparar con una oferta →
        </Button>
      </div>

      {usuario && (
        <Card style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "16px" }}>{usuario.nombre}</h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {usuario.carrera || "Carrera sin definir"}
                {usuario.universidad ? ` · ${usuario.universidad}` : ""}
              </p>
            </div>
            <Button variant="secondary" onClick={() => navigate("/configuracion")}>
              Completar perfil
            </Button>
          </div>
        </Card>
      )}

      {error && <p style={{ color: "var(--accent-low)", fontSize: "14px", marginBottom: "16px" }}>{error}</p>}

      <div style={{ position: "relative", maxWidth: "320px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar tecnología…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            background: "var(--surface-raised)",
            border: "1px solid var(--border)",
            borderRadius: "999px",
            padding: "9px 16px",
            color: "var(--text-primary)",
            fontSize: "13px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {tecnologiasFiltradas.map((tech) => {
          const nivel = niveles[tech.id] || 0;
          return (
            <Card
              key={tech.id}
              style={{
                padding: "18px",
                borderColor: nivel > 0 ? "rgba(79,209,174,0.3)" : "var(--border)",
                opacity: guardandoId === tech.id ? 0.7 : 1,
                transition: "opacity 0.15s ease, border-color 0.15s ease",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--accent-ready)",
                }}
              >
                {ETIQUETAS_CATEGORIA[tech.categoria] || tech.categoria}
              </span>
              <h3 className="mono" style={{ fontSize: "16px", margin: "4px 0 14px" }}>
                {tech.nombre}
              </h3>
              <StarRating
                value={nivel}
                onChange={(n) => actualizarNivel(tech.id, n)}
                mostrarNivel
              />
            </Card>
          );
        })}
      </div>

      {tecnologiasFiltradas.length === 0 && (
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "12px" }}>
          No hay tecnologías que coincidan con "{busqueda}".
        </p>
      )}
    </div>
  );
}