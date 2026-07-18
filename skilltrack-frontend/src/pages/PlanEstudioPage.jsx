import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { comparacionService } from "../api/comparacionService";
import Card from "../components/Card.jsx";

export default function PlanEstudioPage() {
  const { comparacionId } = useParams();
  const [comparacion, setComparacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [actualizandoId, setActualizandoId] = useState(null);

  useEffect(() => {
    cargarComparacion();
  }, [comparacionId]);

  function cargarComparacion() {
    setCargando(true);
    comparacionService
      .obtenerPorId(comparacionId)
      .then(setComparacion)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }

  async function alternarCompletado(item) {
    setActualizandoId(item.id);
    setError(null);

    // actualizacion optimista: refleja el cambio de inmediato en la UI
    setComparacion((prev) => ({
      ...prev,
      plan: prev.plan.map((p) => (p.id === item.id ? { ...p, completado: !p.completado } : p)),
    }));

    try {
      await comparacionService.marcarItemCompletado(item.id, !item.completado);
    } catch (err) {
      setError(err.message);
      // revertir si fallo la llamada
      setComparacion((prev) => ({
        ...prev,
        plan: prev.plan.map((p) => (p.id === item.id ? { ...p, completado: item.completado } : p)),
      }));
    } finally {
      setActualizandoId(null);
    }
  }

  if (cargando) return <p style={{ color: "var(--text-muted)" }}>Cargando plan…</p>;
  if (error && !comparacion) return <p style={{ color: "var(--accent-low)" }}>{error}</p>;
  if (!comparacion) return null;

  const { plan, ofertaTitulo } = comparacion;
  const completadas = plan.filter((p) => p.completado).length;
  const progresoPct = plan.length > 0 ? Math.round((completadas / plan.length) * 100) : 0;

  const semanas = plan.reduce((acc, item) => {
    (acc[item.semanaAsignada] ||= []).push(item);
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link
        to={`/dashboard/${comparacionId}`}
        style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
      >
        ← Volver al dashboard
      </Link>

      <h1 style={{ fontSize: "26px", margin: "10px 0 4px" }}>Plan de estudio</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
        Para: <span style={{ color: "var(--text-primary)" }}>{ofertaTitulo}</span>
      </p>

      <Card style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Progreso: {completadas} de {plan.length} completadas
          </span>
          <span className="mono" style={{ fontSize: "13px", color: "var(--accent-ready)" }}>
            {progresoPct}%
          </span>
        </div>
        <div
          style={{
            height: "8px",
            background: "var(--surface-raised)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progresoPct}%`,
              background: "var(--accent-ready)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </Card>

      {error && (
        <p style={{ color: "var(--accent-low)", fontSize: "13px", marginBottom: "14px" }}>{error}</p>
      )}

      {Object.entries(semanas)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([semana, items]) => (
          <Card key={semana} style={{ marginBottom: "14px" }}>
            <h2
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--text-muted)",
                marginBottom: "12px",
              }}
            >
              Semana {semana}
            </h2>
            {items.map((item) => (
              <label
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 0",
                  cursor: "pointer",
                  opacity: actualizandoId === item.id ? 0.6 : 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={item.completado}
                  onChange={() => alternarCompletado(item)}
                  disabled={actualizandoId === item.id}
                  style={{ width: "16px", height: "16px", accentColor: "var(--accent-ready)" }}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: "14px",
                    textDecoration: item.completado ? "line-through" : "none",
                    color: item.completado ? "var(--text-muted)" : "var(--text-primary)",
                  }}
                >
                  {item.tecnologiaNombre}
                </span>
              </label>
            ))}
          </Card>
        ))}
    </div>
  );
}