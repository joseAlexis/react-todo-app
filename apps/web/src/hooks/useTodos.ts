import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { getTodos, createTodo, updateTodoApi, deleteTodoApi } from "../services/todoService";

// CHECK WITH AUTH NO TODOS ARE DISPLAYED WHEN USER LOGS IN PROBABLY A JSON-SERVER MISSING REQUEST PARAM
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const addTodo = async (title: string) => {
    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    try {
      const newTodo = await createTodo({
        title,
        completed: false,
        createdAt: Date.now(),
        userId: user.id,
      });

      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (id: string, title: string) => {
    try {
      const updated = await updateTodoApi(id, { title });

      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id: string) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    try {
      const updated = await updateTodoApi(id, {
        completed: !current.completed,
      });

      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoApi(id);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const visibleTodos = showCompleted ? todos : todos.filter((t) => !t.completed);

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
