import { Link } from "react-router-dom";
import "../styles/landing.css";
import Button from "../components/Button.jsx";
import ReadinessGauge from "../components/ReadinessGauge.jsx";

const TECNOLOGIAS_DEMO = [
  "Java",
  "Spring Boot",
  "React",
  "Docker",
  "Git",
  "MySQL",
  "PostgreSQL",
  "AWS",
  "Testing",
];

export default function LandingPage() {
  return (
    <div className="landing landing-bg">
      <header className="landing-header">
        <div className="landing-header-inner">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "18px",
              color: "var(--text-primary)",
            }}
          >
            SkillTrack
          </span>

          <nav className="landing-nav-links">
            <a href="#beneficios">Beneficios</a>
            <a href="#como-funciona">Cómo funciona</a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              to="/login"
              style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
            >
              Iniciar sesión
            </Link>
            <Link to="/registro">
              <Button>Regístrate gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-gradient" />
        <div className="hero-inner">
          <div>
            <span className="hero-badge">
              <IconBolt /> Proyecto en desarrollo activo
            </span>

            <h1 className="hero-title">
              Descubre qué habilidades te faltan para{" "}
              <span className="accent">conseguir tu próximo empleo.</span>
            </h1>

            <p className="hero-subtitle">
              SkillTrack compara tus habilidades reales contra los requisitos de vacantes de
              Backend, Frontend y Full Stack Junior, y te arma un plan de estudio semanal para
              cerrar cada brecha.
            </p>

            <div className="hero-actions">
              <Link to="/registro">
                <Button style={{ padding: "13px 26px", fontSize: "15px" }}>
                  Comienza tu análisis →
                </Button>
              </Link>
              <a href="#como-funciona">
                <Button variant="secondary" style={{ padding: "13px 26px", fontSize: "15px" }}>
                  Ver cómo funciona
                </Button>
              </a>
            </div>
          </div>

          {/* Bento grid: piezas reales de la app, no capturas falsas */}
          <div className="bento-grid">
            <div className="glass-card bento-cell bento-skills">
              <span className="bento-label">Tus habilidades</span>
              <div>
                {["Java", "React", "Docker"].map((tech) => (
                  <span
                    key={tech}
                    className="skill-chip"
                    style={{
                      background: "rgba(79, 209, 174, 0.12)",
                      border: "1px solid rgba(79, 209, 174, 0.3)",
                      color: "var(--accent-ready)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card bento-cell bento-gauge">
              <ReadinessGauge porcentaje={75} />
            </div>

            <div className="glass-card bento-cell bento-analyzing">
              <div className="spinner" />
              <span className="mono" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                COMPARANDO REQUISITOS…
              </span>
            </div>

            <div className="glass-card bento-cell bento-progress">
              <div>
                <div className="mini-progress-track">
                  <div className="mini-progress-fill" />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  <span>Plan de estudio</span>
                  <span style={{ color: "var(--accent-ready)" }}>75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section" id="beneficios">
        <div className="section-inner">
          <div className="section-heading">
            <h2>¿Por qué SkillTrack?</h2>
            <p>Medimos objetivamente la brecha entre donde estás y lo que pide el mercado.</p>
          </div>

          <div className="benefits-grid">
            <div className="glass-card benefit-card">
              <div className="benefit-icon">
                <IconSearch />
              </div>
              <h3>Identificación de brechas</h3>
              <p>
                Comparamos tu perfil contra los requisitos reales de vacantes Junior y te decimos
                exactamente qué tecnologías te faltan.
              </p>
            </div>

            <div className="glass-card benefit-card" style={{ borderTopColor: "var(--accent-gap)" }}>
              <div className="benefit-icon" style={{ background: "rgba(242,166,90,0.12)", color: "var(--accent-gap)" }}>
                <IconRoute />
              </div>
              <h3>Plan de estudio personalizado</h3>
              <p>
                Nada de cursos genéricos: un roadmap semana a semana, basado únicamente en tus
                brechas reales.
              </p>
            </div>

            <div className="glass-card benefit-card">
              <div className="benefit-icon">
                <IconChart />
              </div>
              <h3>Seguimiento de progreso</h3>
              <p>
                Marca cada tecnología como completada y mira tu porcentaje de preparación subir en
                tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section" id="como-funciona" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="section-heading">
            <h2>Tu camino en 3 pasos</h2>
            <p>Así de directo es el flujo, de principio a fin.</p>
          </div>

          <div className="steps-list" style={{ maxWidth: "560px", margin: "0 auto" }}>
            <div className="step-item">
              <div className="step-number">1</div>
              <div>
                <h4>Crea tu perfil</h4>
                <p>Marca con estrellas qué tanto conoces cada tecnología del catálogo.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div>
                <h4>Compara con una vacante</h4>
                <p>
                  Elige una oferta (Backend, Frontend o Full Stack Junior) y obtén tu % de
                  compatibilidad al instante.
                </p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number activo">3</div>
              <div>
                <h4 style={{ color: "var(--accent-ready)" }}>Sigue tu plan de estudio</h4>
                <p>Recibe un roadmap semanal y marca tu progreso a medida que avanzas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologias que analizamos (reemplaza estadisticas ficticias) */}
      <section className="section" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="section-inner">
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "13px",
              marginBottom: "18px",
            }}
          >
            Tecnologías que ya puedes comparar
          </p>
          <div className="tech-strip">
            {TECNOLOGIAS_DEMO.map((tech) => (
              <span key={tech} className="skill-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section">
        <div className="section-inner">
          <div className="glass-card cta-card">
            <h2>Tu próxima práctica empieza con un análisis honesto.</h2>
            <p>Gratis, sin tarjeta de crédito. Tarda menos de 2 minutos.</p>
            <div className="cta-actions">
              <Link to="/registro">
                <Button style={{ padding: "13px 28px", fontSize: "15px" }}>Crear cuenta gratis</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" style={{ padding: "13px 28px", fontSize: "15px" }}>
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>SkillTrack — proyecto académico de evaluación de preparación laboral.</p>
      </footer>
    </div>
  );
}

// Iconos en linea, sin dependencias externas
function IconBolt() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M5 8.5C5 14 9 12 12 14s3 4.5 7 3.5" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20V10M12 20V4M20 20v-6" strokeLinecap="round" />
    </svg>
  );
}