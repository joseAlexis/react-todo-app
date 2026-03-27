type Props = {
  pending: number;
  completed: number;
  showCompleted: boolean;
  toggleView: () => void;
};

export function Header({ pending, completed, showCompleted, toggleView }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="space-x-4">
        <span className="bg-blue-500 text-white px-3 py-1 rounded" data-testid="pending-count">
          Pending: {pending}
        </span>
        <span className="bg-green-500 text-white px-3 py-1 rounded" data-testid="completed-count">
          Completed: {completed}
        </span>
      </div>

      <button
        onClick={toggleView}
        className="text-sm underline text-gray-600"
        data-testid="filter-completed-button"
      >
        {showCompleted ? "Hide Completed" : "Show Completed"}
      </button>
    </div>
  );
}
