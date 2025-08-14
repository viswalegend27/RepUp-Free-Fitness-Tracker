const jsonHeader = { "Content-Type": "application/json" };
const authHeader = (token) => ({ authorization: `Bearer ${token}` });

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:3001" : "");

// Small helper that prefixes the base URL
const apiFetch = (endpoint, options = {}) => fetch(`${API_BASE_URL}${endpoint}`, options);

export const getMe = (token) =>
  apiFetch("/api/user/me", { headers: { ...jsonHeader, ...authHeader(token) } });

export const createUser = (data) =>
  apiFetch("/api/user", { method: "POST", headers: jsonHeader, body: JSON.stringify(data) });

export const loginUser = (data) =>
  apiFetch("/api/user/login", { method: "POST", headers: jsonHeader, body: JSON.stringify(data) });

export const createCardio = (data, token) =>
  apiFetch("/api/exercise/cardio", { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });

export const createResistance = (data, token) =>
  apiFetch("/api/exercise/resistance", { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });

export const createStrengthTraining = (data, token) =>
  apiFetch("/api/exercise/strengthtraining", { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });

export const getCardioById = (id, token) =>
  apiFetch(`/api/exercise/cardio/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });

export const getResistanceById = (id, token) =>
  apiFetch(`/api/exercise/resistance/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });

export const getStrengthTrainingById = (id, token) =>
  apiFetch(`/api/exercise/strength/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });

export const getStrengthTrainingRecords = (token) =>
  apiFetch("/api/exercise/strengthtraining", { headers: { ...jsonHeader, ...authHeader(token) } });

export const deleteCardio = (id, token) =>
  apiFetch(`/api/exercise/cardio/${id}`, { method: "DELETE", headers: authHeader(token) });

export const deleteResistance = (id, token) =>
  apiFetch(`/api/exercise/resistance/${id}`, { method: "DELETE", headers: authHeader(token) });

export const deleteStrengthTraining = (id, token) =>
  apiFetch(`/api/exercise/strengthtraining/${id}`, { method: "DELETE", headers: authHeader(token) });
