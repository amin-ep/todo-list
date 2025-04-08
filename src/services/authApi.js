import { BASE_URL } from "../utils/constants";

export async function signup(payload) {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function login(payload) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}
