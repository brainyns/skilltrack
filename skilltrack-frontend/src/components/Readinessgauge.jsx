const RADIO = 90;
const CX = 110;
const CY = 110;
const LARGO_ARCO = Math.PI * RADIO;

function colorParaPorcentaje(pct) {
  if (pct >= 70) return "var(--accent-ready)";
  if (pct >= 40) return "var(--accent-gap)";
  return "var(--accent-low)";
}

export default function ReadinessGauge({ porcentaje }) {
  const fraccion = Math.max(0, Math.min(100, porcentaje)) / 100;
  const desfase = LARGO_ARCO * (1 - fraccion);
  const color = colorParaPorcentaje(porcentaje);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="220" height="130" viewBox="0 0 220 130">
        {/* arco de fondo */}
        <path
          d={`M ${CX - RADIO},${CY} A ${RADIO} ${RADIO} 0 1 1 ${CX + RADIO},${CY}`}
          fill="none"
          stroke="var(--surface-raised)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* arco de progreso */}
        <path
          d={`M ${CX - RADIO},${CY} A ${RADIO} ${RADIO} 0 1 1 ${CX + RADIO},${CY}`}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${LARGO_ARCO} ${LARGO_ARCO}`}
          strokeDashoffset={desfase}
          style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease" }}
        />
        <text
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          className="mono"
          style={{ fontSize: "36px", fontWeight: 700, fill: "var(--text-primary)" }}
        >
          {Math.round(porcentaje)}%
        </text>
      </svg>
      <span style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "-6px" }}>
        Preparación laboral
      </span>
    </div>
  );
}