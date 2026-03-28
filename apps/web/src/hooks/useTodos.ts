import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import {
  getTodos,
  createTodo,
  updateTodoApi,
  deleteTodoApi,
} from "../services/todoService";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 LOAD TODOS
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError("Error loading todos");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // 🔹 CREATE
  const addTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({
        title,
        completed: false,
        createdAt: Date.now(),
      });

      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 UPDATE TITLE
  const updateTodo = async (id: string, title: string) => {
    try {
      const updated = await updateTodoApi(id, { title });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 TOGGLE
  const toggleTodo = async (id: string) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    try {
      const updated = await updateTodoApi(id, {
        completed: !current.completed,
      });

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, ...updated } : todo
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 DELETE
  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoApi(id);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 DERIVED STATE
  const pendingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const visibleTodos = showCompleted
    ? todos
    : todos.filter((t) => !t.completed);

  return {
    todos: visibleTodos,
    allTodos: todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    pendingCount,
    completedCount,
    showCompleted,
    setShowCompleted,
    loading,
    error,
  };
}
