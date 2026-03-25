import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 flex-1 rounded"
        placeholder="Add a new todo..."
      />
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
}
