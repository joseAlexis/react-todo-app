import { useAuth } from "../hooks/useAuth";

type HeaderProps = {
  pending: number;
  completed: number;
  showCompleted: boolean;
  toggleView: () => void;
};

export function Header({
  pending,
  completed,
  showCompleted,
  toggleView,
}: HeaderProps) {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-xl font-bold">Todos</h1>
        <p className="text-sm">
          Pending: {pending} | Completed: {completed}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleView}
          className="text-sm bg-gray-200 px-2 py-1 rounded"
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>

        <button
          onClick={logout}
          className="text-sm bg-red-500 text-white px-2 py-1 rounded"
          data-testid="logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}