import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { comparacionService } from "../api/comparacionService";
import Card from "../components/Card.jsx";
import ReadinessGauge from "../components/ReadinessGauge.jsx";
import CategoryBreakdownChart from "../components/CategoryBreakdownChart.jsx";

export default function DashboardPage() {
  const { comparacionId } = useParams();
  const [comparacion, setComparacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    comparacionService
      .obtenerPorId(comparacionId)
      .then(setComparacion)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [comparacionId]);

  if (cargando) return <p style={{ color: "var(--text-muted)" }}>Cargando resultados…</p>;
  if (error) return <p style={{ color: "var(--accent-low)" }}>{error}</p>;
  if (!comparacion) return null;

  const { porcentajeCompatibilidad, ofertaTitulo, fortalezas, debilidades, plan } = comparacion;

  return (
    <div>
      <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "4px" }}>
        Resultado para
      </p>
      <h1 style={{ fontSize: "26px", marginBottom: "28px" }}>{ofertaTitulo}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "24px",
          marginBottom: "20px",
          alignItems: "stretch",
        }}
      >
        <Card style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ReadinessGauge porcentaje={porcentajeCompatibilidad} />
        </Card>

        <Card>
          <h2 style={{ fontSize: "15px", marginBottom: "16px" }}>Cobertura por categoría</h2>
          <CategoryBreakdownChart fortalezas={fortalezas} debilidades={debilidades} />
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <Card>
          <h2 style={{ fontSize: "15px", marginBottom: "14px", color: "var(--accent-ready)" }}>
            Fortalezas ({fortalezas.length})
          </h2>
          {fortalezas.length === 0 && (
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              Aún no cubres ninguno de los requisitos de esta oferta.
            </p>
          )}
          <ListaTecnologias items={fortalezas} simbolo="✓" color="var(--accent-ready)" />
        </Card>

        <Card>
          <h2 style={{ fontSize: "15px", marginBottom: "14px", color: "var(--accent-gap)" }}>
            Por cubrir ({debilidades.length})
          </h2>
          {debilidades.length === 0 && (
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              ¡Cubres todos los requisitos de esta oferta!
            </p>
          )}
          <ListaTecnologias items={debilidades} simbolo="✗" color="var(--accent-gap)" />
        </Card>
      </div>

      {plan.length > 0 && (
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <h2 style={{ fontSize: "15px" }}>Plan de estudio ({plan.length} semanas)</h2>
            <Link
              to={`/dashboard/${comparacionId}/plan`}
              style={{ fontSize: "13px", color: "var(--accent-ready)", textDecoration: "none" }}
            >
              Ver plan completo →
            </Link>
          </div>
          <ol style={{ margin: 0, paddingLeft: "20px", color: "var(--text-muted)", fontSize: "14px" }}>
            {plan.slice(0, 4).map((item) => (
              <li key={item.id} style={{ marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Semana {item.semanaAsignada}: </span>
                <span className="mono" style={{ color: "var(--text-primary)" }}>
                  {item.tecnologiaNombre}
                </span>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  );
}

function ListaTecnologias({ items, simbolo, color }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((tech) => (
        <li
          key={tech.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 0",
            fontSize: "14px",
          }}
        >
          <span style={{ color, fontWeight: 700 }}>{simbolo}</span>
          <span className="mono">{tech.nombre}</span>
        </li>
      ))}
    </ul>
  );
}