import { Navigate } from "react-router-dom";
import { authService } from "../api/authService";

export default function RutaProtegida({ children }) {
  if (!authService.estaAutenticado()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
