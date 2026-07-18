import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistroPage from "./pages/RegistroPage.jsx";
import PerfilPage from "./pages/PerfilPage.jsx";
import OfertasPage from "./pages/OfertasPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PlanEstudioPage from "./pages/PlanEstudioPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        {/* Rutas privadas: requieren sesion activa */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Layout>
                <PerfilPage />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/ofertas"
          element={
            <RutaProtegida>
              <Layout>
                <OfertasPage />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/dashboard/:comparacionId"
          element={
            <RutaProtegida>
              <Layout>
                <DashboardPage />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/dashboard/:comparacionId/plan"
          element={
            <RutaProtegida>
              <Layout>
                <PlanEstudioPage />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/configuracion"
          element={
            <RutaProtegida>
              <Layout>
                <SettingsPage />
              </Layout>
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}