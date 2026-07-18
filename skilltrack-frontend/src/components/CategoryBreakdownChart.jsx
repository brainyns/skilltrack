import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from "recharts";

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

function colorParaPorcentaje(pct) {
  if (pct >= 70) return "#4fd1ae";
  if (pct >= 40) return "#f2a65a";
  return "#e8637a";
}

export default function CategoryBreakdownChart({ fortalezas, debilidades }) {
  const porCategoria = {};

  for (const tech of fortalezas) {
    porCategoria[tech.categoria] ||= { cumplidas: 0, total: 0 };
    porCategoria[tech.categoria].cumplidas += 1;
    porCategoria[tech.categoria].total += 1;
  }
  for (const tech of debilidades) {
    porCategoria[tech.categoria] ||= { cumplidas: 0, total: 0 };
    porCategoria[tech.categoria].total += 1;
  }

  const datos = Object.entries(porCategoria)
    .map(([categoria, { cumplidas, total }]) => ({
      categoria: ETIQUETAS_CATEGORIA[categoria] || categoria,
      porcentaje: Math.round((cumplidas / total) * 100),
    }))
    .sort((a, b) => b.porcentaje - a.porcentaje);

  if (datos.length === 0) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: Math.max(datos.length * 42, 120) }}>
      <ResponsiveContainer>
        <BarChart data={datos} layout="vertical" margin={{ left: 10, right: 24 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="categoria"
            width={130}
            tick={{ fill: "var(--text-muted)", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Cobertura"]}
            contentStyle={{
              background: "var(--surface-raised)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="porcentaje" radius={[0, 6, 6, 0]} barSize={18}>
            {datos.map((entrada) => (
              <Cell key={entrada.categoria} fill={colorParaPorcentaje(entrada.porcentaje)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}