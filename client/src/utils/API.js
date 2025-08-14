// Base API URL detection: Localhost → local server, else deployed backend
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://rep-up-free-fitness-tracker.vercel.app/";

// Helper: make a request with optional token
const request = (endpoint, method = "GET", data = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.authorization = `Bearer ${token}`;

  return fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });
};

// ==========================
// Auth Routes
// ==========================
export const getMe = (token) =>
  request("/api/user/me", "GET", null, token);

export const createUser = (userData) =>
  request("/api/user", "POST", userData);

export const loginUser = (userData) =>
  request("/api/user/login", "POST", userData);

// ==========================
// Cardio Routes
// ==========================
export const createCardio = (cardioData, token) =>
  request("/api/exercise/cardio", "POST", cardioData, token);

export const getCardioById = (cardioId, token) =>
  request(`/api/exercise/cardio/${cardioId}`, "GET", null, token);

export const deleteCardio = (cardioId, token) =>
  request(`/api/exercise/cardio/${cardioId}`, "DELETE", null, token);

// ==========================
// Resistance Routes
// ==========================
export const createResistance = (resistanceData, token) =>
  request("/api/exercise/resistance", "POST", resistanceData, token);

export const getResistanceById = (resistanceId, token) =>
  request(`/api/exercise/resistance/${resistanceId}`, "GET", null, token);

export const deleteResistance = (resistanceId, token) =>
  request(`/api/exercise/resistance/${resistanceId}`, "DELETE", null, token);

// ==========================
// Strength Training Routes
// ==========================
export const createStrengthTraining = (strengthData, token) =>
  request("/api/exercise/strengthtraining", "POST", strengthData, token);

export const getStrengthTrainingById = (strengthId, token) =>
  request(`/api/exercise/strengthtraining/${strengthId}`, "GET", null, token);

export const getStrengthTrainingRecords = (token) =>
  request("/api/exercise/strengthtraining", "GET", null, token);

export const deleteStrengthTraining = (strengthId, token) =>
  request(`/api/exercise/strengthtraining/${strengthId}`, "DELETE", null, token);
