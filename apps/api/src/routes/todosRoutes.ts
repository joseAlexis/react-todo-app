import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todosController";

const router = Router();

router.post("/api/todos", createTodo);
router.get("/api/todos", getTodos);
router.get("/api/todos/:id", getTodoById);
router.put("/api/todos/:id", updateTodo);
router.delete("/api/todos/:id", deleteTodo);

export default router;
