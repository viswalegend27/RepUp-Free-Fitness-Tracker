const jsonHeader = { "Content-Type": "application/json" };
const authHeader = (token) => ({ authorization: `Bearer ${token}` });

export const getMe = (token) =>
  fetch("/api/user/me", { headers: { ...jsonHeader, ...authHeader(token) } });

export const createUser = (data) =>
  fetch("/api/user", { method: "POST", headers: jsonHeader, body: JSON.stringify(data) });

export const loginUser = (data) =>
  fetch("/api/user/login", { method: "POST", headers: jsonHeader, body: JSON.stringify(data) });

export const createCardio = (data, token) =>
  fetch("/api/exercise/cardio", { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });

export const createResistance = (data, token) =>
  fetch("/api/exercise/resistance", { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });

export const createStrengthTraining = (data, token) =>
  fetch("/api/exercise/strengthtraining", { method: "POST", headers: { ...jsonHeader, ...authHeader(token) }, body: JSON.stringify(data) });

export const getCardioById = (id, token) =>
  fetch(`/api/exercise/cardio/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });

export const getResistanceById = (id, token) =>
  fetch(`/api/exercise/resistance/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });

export const getStrengthTrainingById = (id, token) =>
  fetch(`/api/exercise/strength/${id}`, { headers: { ...jsonHeader, ...authHeader(token) } });

export const getStrengthTrainingRecords = (token) =>
  fetch("/api/exercise/strengthtraining", { headers: { ...jsonHeader, ...authHeader(token) } });

export const deleteCardio = (id, token) =>
  fetch(`/api/exercise/cardio/${id}`, { method: "DELETE", headers: authHeader(token) });

export const deleteResistance = (id, token) =>
  fetch(`/api/exercise/resistance/${id}`, { method: "DELETE", headers: authHeader(token) });

export const deleteStrengthTraining = (id, token) =>
  fetch(`/api/exercise/strengthtraining/${id}`, { method: "DELETE", headers: authHeader(token) });
