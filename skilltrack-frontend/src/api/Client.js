const BASE_URL = "http://localhost:8080/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("skilltrack_token");

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (response.status === 401) {
    localStorage.removeItem("skilltrack_token");
    localStorage.removeItem("skilltrack_usuarioId");
    window.location.href = "/login";
    return null;
  }

  if (!response.ok) {
    let mensaje = `Error ${response.status}`;
    try {
      const body = await response.json();
      mensaje = body.mensaje || mensaje;
    } catch {
      // el backend no devolvio JSON (ej: 500 sin cuerpo), se usa el mensaje generico
    }
    throw new Error(mensaje);
  }

  // 204 No Content no tiene body que parsear
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, data) => request(path, { method: "POST", body: JSON.stringify(data) }),
  patch: (path, data) => request(path, { method: "PATCH", body: JSON.stringify(data) }),
};