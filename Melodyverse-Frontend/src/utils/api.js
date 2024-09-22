import { BASE_URL, endpoints, RETRY } from "../config/config";

export const signup = async function (username, email, password) {
  try {
    const response = await fetch(`${BASE_URL}${endpoints.signup}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const login = async function (payload) {
  try {
    const response = await fetch(`${BASE_URL}${endpoints.login}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const logout = async function () {
  try {
    const response = await fetch(`${BASE_URL}${endpoints.logout}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetcher = async function (endpoint) {
  let tries = 0;

  while (tries < RETRY) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(` Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      tries++;
      if (tries >= RETRY) throw new Error(err);
    }
  }
};
