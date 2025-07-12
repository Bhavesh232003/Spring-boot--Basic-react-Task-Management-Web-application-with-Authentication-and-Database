import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// === Auth ===
export const signup = (userData) => api.post("/auth/signup", userData);
export const login = (userData) => api.post("/auth/login", userData);

// === Todos ===
export const fetchTodos = (token) =>
  api.get("/todos", { headers: { Authorization: `Bearer ${token}` } });
export const addTodo = (todo, token) =>
  api.post("/todos", todo, { headers: { Authorization: `Bearer ${token}` } });
export const updateTodo = (id, todo, token) =>
  api.put(`/todos/${id}`, todo, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTodo = (id, token) =>
  api.delete(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// === Reviews ===
export const fetchReviews = (token) =>
  api.get("/reviews", { headers: { Authorization: `Bearer ${token}` } });

export const submitReview = (review, token) =>
  api.post("/reviews", review, { headers: { Authorization: `Bearer ${token}` } });
