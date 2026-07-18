import { api } from "./client";

export const tecnologiaService = {
  listarTodas: () => api.get("/tecnologias"),
};