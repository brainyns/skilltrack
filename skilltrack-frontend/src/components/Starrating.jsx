export default function StarRating({ value, onChange, max = 5, mostrarNivel = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ display: "flex", gap: "2px" }} role="radiogroup" aria-label="Nivel de habilidad">
        {Array.from({ length: max }, (_, i) => i + 1).map((estrella) => {
          const activa = estrella <= value;
          return (
            <button
              key={estrella}
              type="button"
              role="radio"
              aria-checked={activa}
              aria-label={`Nivel ${estrella} de ${max}`}
              onClick={() => onChange(estrella === value ? 0 : estrella)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                lineHeight: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M12 2.5l2.9 6.3 6.9.8-5.1 4.8 1.4 6.9L12 17.9l-6.1 3.4 1.4-6.9L2.2 9.6l6.9-.8z"
                  fill={activa ? "var(--accent-ready)" : "none"}
                  stroke={activa ? "var(--accent-ready)" : "var(--text-muted)"}
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          );
        })}
      </div>
      {mostrarNivel && (
        <span
          className="mono"
          style={{
            fontSize: "12px",
            color: value > 0 ? "var(--accent-ready)" : "var(--text-muted)",
            minWidth: "38px",
          }}
        >
          Lvl {value}
        </span>
      )}
    </div>
  );
}