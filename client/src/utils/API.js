// API.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const jsonHeader = { "Content-Type": "application/json" };
const authHeader = (token) => ({ authorization: `Bearer ${token}` });

const log = (msg) => console.log(`[API] ${msg}`);

export const getMe = (token) => {
  log("Fetching current user");
  return fetch(`${API_URL}/api/user/me`, { headers: { ...jsonHeader, ...authHeader(token) } });
};

export const createUser = (data) => {
  log("Creating user");
  return fetch(`${API_URL}/api/user`, { method: "POST", headers: jsonHeader, body: JSON.stringify(data) });
};

export const loginUser = (data) => {
  log("Logging in user");
  return fetch(`${API_URL}/api/user/login`, { method: "POST", headers: jsonHeader, body: JSON.stringify(data) });
};

export const createCardio = (data, token) => {
  log("Adding cardio entry");
  return fetch(`${API_URL}/api/exercise/cardio`, { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });
};

export const createResistance = (data, token) => {
  log("Adding resistance entry");
  return fetch(`${API_URL}/api/exercise/resistance`, { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });
};

export const createStrengthTraining = (data, token) => {
  log("Adding strength training entry");
  return fetch(`${API_URL}/api/exercise/strengthtraining`, { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });
};

export const getCardioById = (id, token) => {
  log(`Fetching cardio ID: ${id}`);
  return fetch(`${API_URL}/api/exercise/cardio/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });
};

export const getResistanceById = (id, token) => {
  log(`Fetching resistance ID: ${id}`);
  return fetch(`${API_URL}/api/exercise/resistance/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });
};

export const getStrengthTrainingById = (id, token) => {
  log(`Fetching strength training ID: ${id}`);
  return fetch(`${API_URL}/api/exercise/strength/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });
};

export const getStrengthTrainingRecords = (token) => {
  log("Fetching all strength training records");
  return fetch(`${API_URL}/api/exercise/strengthtraining`, { headers: { ...jsonHeader, ...authHeader(token) } });
};

export const deleteCardio = (id, token) => {
  log(`Deleting cardio ID: ${id}`);
  return fetch(`${API_URL}/api/exercise/cardio/${id}`, { method: "DELETE", headers: authHeader(token) });
};

export const deleteResistance = (id, token) => {
  log(`Deleting resistance ID: ${id}`);
  return fetch(`${API_URL}/api/exercise/resistance/${id}`, { method: "DELETE", headers: authHeader(token) });
};

export const deleteStrengthTraining = (id, token) => {
  log(`Deleting strength training ID: ${id}`);
  return fetch(`${API_URL}/api/exercise/strengthtraining/${id}`, { method: "DELETE", headers: authHeader(token) });
};