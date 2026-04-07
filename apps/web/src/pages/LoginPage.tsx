import { useState } from "react";
import { login, register } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { loginUser } = useAuth();

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      if (isRegister) {
        await register(email, password);

        setSuccess("User registered successfully. Please login.");
        setIsRegister(false);

        setEmail("");
        setPassword("");

        return;
      } else {
        const user = await login(email, password);
        loginUser(user);

        // 👇 force re-render fallback
        window.location.reload();
      }
    } catch (err) {
      setError(isRegister ? "Error registering user" : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="border p-6 rounded w-80 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">{isRegister ? "Register" : "Login"}</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
          autoFocus
          data-testid="auth-email-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
          data-testid="auth-password-input"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          data-testid="auth-submit-button"
        >
          {loading
            ? isRegister
              ? "Registering..."
              : "Logging in..."
            : isRegister
              ? "Register"
              : "Login"}
        </button>

        <p className="text-sm text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => setIsRegister((prev) => !prev)}
            data-testid="toggle-auth-mode"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}
