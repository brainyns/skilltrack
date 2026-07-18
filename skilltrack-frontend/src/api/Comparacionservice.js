import { api } from "./client";
 
export const comparacionService = {
  comparar: (usuarioId, ofertaId) => api.post("/comparaciones", { usuarioId, ofertaId }),
  obtenerPorId: (id) => api.get(`/comparaciones/${id}`),
  marcarItemCompletado: (itemPlanId, completado) =>
    api.patch(`/comparaciones/plan-items/${itemPlanId}`, { completado }),
};
 
