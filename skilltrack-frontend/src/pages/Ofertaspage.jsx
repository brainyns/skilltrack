import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ofertaService } from "../api/ofertaService";
import { comparacionService } from "../api/comparacionService";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function OfertasPage() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("skilltrack_usuarioId");

  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [comparandoId, setComparandoId] = useState(null);

  useEffect(() => {
    ofertaService
      .listarTodas()
      .then(setOfertas)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  async function manejarComparar(ofertaId) {
    setError(null);
    setComparandoId(ofertaId);
    try {
      const comparacion = await comparacionService.comparar(Number(usuarioId), ofertaId);
      localStorage.setItem("skilltrack_ultimaComparacionId", String(comparacion.id));
      navigate(`/dashboard/${comparacion.id}`);
    } catch (err) {
      setError(err.message);
      setComparandoId(null);
    }
  }

  if (!usuarioId) {
    return (
      <Card style={{ maxWidth: "480px" }}>
        <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>Falta tu perfil</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "16px" }}>
          Necesitas crear tu perfil antes de comparar contra una oferta.
        </p>
        <Button onClick={() => navigate("/perfil")}>Ir a mi perfil</Button>
      </Card>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>Ofertas disponibles</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "28px" }}>
        Elige una oferta para ver qué tan preparado estás y qué te falta.
      </p>

      {cargando && <p style={{ color: "var(--text-muted)" }}>Cargando ofertas…</p>}

      {error && (
        <p style={{ color: "var(--accent-low)", fontSize: "14px", marginBottom: "16px" }}>{error}</p>
      )}

      <div style={{ display: "grid", gap: "16px" }}>
        {ofertas.map((oferta) => (
          <Card key={oferta.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "17px", marginBottom: "4px" }}>{oferta.titulo}</h2>
                {oferta.empresa && (
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "12px" }}>
                    {oferta.empresa}
                  </p>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {oferta.requisitos.map((req) => (
                    <span
                      key={req.tecnologiaId}
                      className="mono"
                      style={{
                        fontSize: "12px",
                        padding: "4px 9px",
                        borderRadius: "999px",
                        border: `1px solid ${
                          req.esObligatorio ? "var(--accent-gap)" : "var(--border)"
                        }`,
                        color: req.esObligatorio ? "var(--accent-gap)" : "var(--text-muted)",
                      }}
                      title={req.esObligatorio ? "Requisito obligatorio" : "Deseable"}
                    >
                      {req.tecnologiaNombre}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => manejarComparar(oferta.id)}
                disabled={comparandoId === oferta.id}
                style={{ flexShrink: 0 }}
              >
                {comparandoId === oferta.id ? "Comparando…" : "Comparar mi perfil"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}