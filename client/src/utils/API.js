// utils/API.js

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://rep-up-free-fitness-tracker.vercel.app/"
    : "http://localhost:3000"; 

export const getMe = (token) => {
  return fetch(`${API_BASE_URL}/api/user/me`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch(`${API_BASE_URL}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch(`${API_BASE_URL}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const createCardio = (cardioData, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/cardio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardioData),
  });
};

export const createResistance = (resistanceData, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/resistance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resistanceData),
  });
};

export const createStrengthTraining = (strengthData, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/strengthtraining`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(strengthData),
  });
};

export const getCardioById = (cardioId, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/cardio/${cardioId}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getResistanceById = (resistanceId, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/resistance/${resistanceId}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getStrengthTrainingById = (strengthId, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/strength/${strengthId}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getStrengthTrainingRecords = (token) => {
  return fetch(`${API_BASE_URL}/api/exercise/strengthtraining`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCardio = (cardioId, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/cardio/${cardioId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteResistance = (resistanceId, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/resistance/${resistanceId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteStrengthTraining = (strengthId, token) => {
  return fetch(`${API_BASE_URL}/api/exercise/strengthtraining/${strengthId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
