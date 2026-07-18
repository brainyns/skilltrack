import { api } from "./client";

export const ofertaService = {
  listarTodas: () => api.get("/ofertas"),
  obtenerPorId: (id) => api.get(`/ofertas/${id}`),
};