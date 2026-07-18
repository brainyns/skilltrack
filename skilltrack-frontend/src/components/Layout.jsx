import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { authService } from "../api/authService";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const ultimaComparacionId = localStorage.getItem("skilltrack_ultimaComparacionId");

  function irADashboard() {
    if (ultimaComparacionId) {
      navigate(`/dashboard/${ultimaComparacionId}`);
    } else {
      navigate("/ofertas");
    }
  }

  function irAPlan() {
    if (ultimaComparacionId) {
      navigate(`/dashboard/${ultimaComparacionId}/plan`);
    } else {
      navigate("/ofertas");
    }
  }

  function cerrarSesion() {
    authService.cerrarSesion();
    navigate("/login");
  }

  const esActivo = (prefijo) => location.pathname.startsWith(prefijo);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/perfil" className="sidebar-brand">
          <GaugeMark />
          <span className="sidebar-brand-name">SkillTrack</span>
        </Link>
        <span className="sidebar-tagline">Leveling Up</span>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${location.pathname.startsWith("/dashboard") ? "activo" : ""}`}
            onClick={irADashboard}
          >
            <IconDashboard />
            <span className="label">Dashboard</span>
          </button>

          <Link to="/perfil" className={`sidebar-link ${esActivo("/perfil") ? "activo" : ""}`}>
            <IconMatrix />
            <span className="label">Skill Matrix</span>
          </Link>

          <button className="sidebar-link" onClick={irAPlan}>
            <IconRoadmap />
            <span className="label">Study Plan</span>
          </button>

          <Link to="/ofertas" className={`sidebar-link ${esActivo("/ofertas") ? "activo" : ""}`}>
            <IconBriefcase />
            <span className="label">Job Board</span>
          </Link>

          <Link to="/configuracion" className={`sidebar-link ${esActivo("/configuracion") ? "activo" : ""}`}>
            <IconSettings />
            <span className="label">Settings</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link" onClick={cerrarSesion}>
            <IconLogout />
            <span className="label">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>
    </div>
  );
}

function GaugeMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 18a8 8 0 1 1 16 0" stroke="var(--border)" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M4 18a8 8 0 0 1 10.5-7.6"
        stroke="var(--accent-ready)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function IconMatrix() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20V10M12 20V4M20 20v-6" strokeLinecap="round" />
    </svg>
  );
}

function IconRoadmap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M5 8.2C5 14 9 12 12 14s3 4.5 7 3.5" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.63 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.63a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.37 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" />
      <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" />
    </svg>
  );
}