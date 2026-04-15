import express from "express";
import todosRoutes from "./routes/todosRoutes";
import { errorHandler } from "./middlewares/errorHandling";

const app = express();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// Test route
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Routes
app.use("/", todosRoutes);

// Error handling
app.use(errorHandler);

export default app;
