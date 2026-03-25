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

  const handleUpdate = () => {
    onUpdate(todo.id, value);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between border p-2 rounded mb-2">
      <div className="flex items-center gap-2 flex-1">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />

        {editing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border p-1 flex-1"
          />
        ) : (
          <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {editing ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}
