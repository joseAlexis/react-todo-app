import { useAuth } from "./hooks/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { TodoPage } from "./pages/TodoPage";

function App() {
  const { user } = useAuth();

  return user ? <TodoPage /> : <LoginPage />;
}

export default App;
