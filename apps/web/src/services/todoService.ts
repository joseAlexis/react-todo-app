import type { Todo } from "../types/todo";
import type { User } from "../types/user";

const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

export const getTodos = async () => {
  const user: User = JSON.parse(sessionStorage.getItem("user") || "null");

  const res = await fetch(`${API_URL}?userId=${user.id}`);
  return res.json();
};

export const createTodo = async (todo: Todo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const updateTodoApi = async (id: string, data: Partial<Todo>) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTodoApi = async (id: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
