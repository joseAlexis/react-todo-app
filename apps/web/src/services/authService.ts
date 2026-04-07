const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
  const users = await res.json();

  if (users.length === 0) {
    throw new Error("Invalid credentials");
  }

  return users[0];
};

export const register = async (email: string, password: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, createdAt: Date.now() }),
  });

  return res.json();
};
