export default function Button({ children, variant = "primary", ...props }) {
  const estilos = {
    primary: {
      background: "var(--accent-ready)",
      color: "#0d1a16",
      border: "none",
    },
    secondary: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid var(--border)",
    },
  };

  return (
    <button
      {...props}
      style={{
        ...estilos[variant],
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "14px",
        padding: "10px 20px",
        borderRadius: "var(--radius-sm)",
        cursor: props.disabled ? "not-allowed" : "pointer",
        opacity: props.disabled ? 0.5 : 1,
        ...props.style,
      }}
    >
      {children}
    </button>
  );
}