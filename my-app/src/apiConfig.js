export const API_BASE = import.meta.env.VITE_API_BASE || "";

export function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getJsonHeaders() {
  return {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
}
