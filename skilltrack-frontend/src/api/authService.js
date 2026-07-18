import { api } from "./client";

export const authService = {
  registrar: (datos) => api.post("/auth/registro", datos),
  login: (email, password) => api.post("/auth/login", { email, password }),

  guardarSesion: (auth) => {
    localStorage.setItem("skilltrack_token", auth.token);
    localStorage.setItem("skilltrack_usuarioId", String(auth.usuarioId));
  },

  cerrarSesion: () => {
    localStorage.removeItem("skilltrack_token");
    localStorage.removeItem("skilltrack_usuarioId");
  },

  estaAutenticado: () => Boolean(localStorage.getItem("skilltrack_token")),
};