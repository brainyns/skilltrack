export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-card)",
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}