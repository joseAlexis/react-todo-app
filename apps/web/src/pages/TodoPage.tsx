import { Header } from "../components/Header";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";
import { useTodos } from "../hooks/useTodos";

export function TodoPage() {
  const {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    pendingCount,
    completedCount,
    showCompleted,
    setShowCompleted,
  } = useTodos();

  return (
    <div className="max-w-xl mx-auto p-4">
      <Header
        pending={pendingCount}
        completed={completedCount}
        showCompleted={showCompleted}
        toggleView={() => setShowCompleted((prev) => !prev)}
      />

      <TodoInput onAdd={addTodo} />

      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}
