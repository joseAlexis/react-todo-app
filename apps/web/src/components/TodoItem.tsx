import { useState } from "react";
import type { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    if (saving) return;

    const trimmed = value.trim();
    if (!trimmed) return;

    setSaving(true);

    await onUpdate(todo.id!, trimmed);

    setSaving(false);
    setEditing(false);
  };

  const handleStartEditing = () => {
    if (todo.completed) return;
    setEditing(true);
  };

  return (
    <div className="flex items-center justify-between border p-2 rounded mb-2">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id!)}
          data-testid={`checkbox-todo-${todo.id}`}
        />

        {editing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate();
              }
              if (e.key === "Escape") {
                setEditing(false);
                setValue(todo.title); // reset value
              }
            }}
            className="border p-1 flex-1"
            data-testid="edit-todo-title-input"
          />
        ) : (
          <span
            className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}
            data-testid="todo-title"
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {editing ? (
          <button onClick={handleUpdate} data-testid="save-todo-button">
            Save
          </button>
        ) : (
          !todo.completed && (
            <button onClick={handleStartEditing} data-testid="edit-todo-button">
              Edit
            </button>
          )
        )}
        <button onClick={() => onDelete(todo.id!)} data-testid="delete-todo-button">
          Delete
        </button>
      </div>
    </div>
  );
}
