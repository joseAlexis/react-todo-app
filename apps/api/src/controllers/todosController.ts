import { Request, Response, NextFunction } from "express";
import supabase from "../config/superbaseClient";
import { Todo } from "../types/todo";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body as Todo;

    const { data, error } = await supabase
      .from("todos")
      .insert([body])
      .select();
    res.status(201).json(data);

    if (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data, error } = await supabase.from("todos").select("*");
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const body = req.body as Todo;

    const { data, error } = await supabase
      .from("todos")
      .update(body)
      .eq("id", id)
      .single();
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .single();
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(204).json(data);
  } catch (error) {
    next(error);
  }
};
