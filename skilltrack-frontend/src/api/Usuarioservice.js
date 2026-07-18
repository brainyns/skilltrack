import { api } from "./client";

export const usuarioService = {
  obtenerPorId: (id) => api.get(`/usuarios/${id}`),
  obtenerHabilidades: (id) => api.get(`/usuarios/${id}/habilidades`),
  agregarHabilidad: (id, datos) => api.post(`/usuarios/${id}/habilidades`, datos),
  actualizarPerfil: (id, datos) => api.patch(`/usuarios/${id}`, datos),
};