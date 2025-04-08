import { AUTH_TOKEN_KEY, BASE_URL } from "../utils/constants";
import Cookies from "js-cookie";
export async function getMyTodos() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const response = await fetch(`${BASE_URL}/todo/myTodo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}
export async function createTodo(payload) {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const response = await fetch(`${BASE_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
}

export async function getTodoById(id) {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const response = await fetch(`${BASE_URL}/todo/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function updateTodoById(id, payload) {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const response = await fetch(`${BASE_URL}/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
}

export async function deleteTodoById(id) {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  await fetch(`${BASE_URL}/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return { status: "success" };
}
