import type { Todo } from "../types/todo";

export const isOverdue = (todo: Todo): boolean => {
  if (!todo.dueAt) return false;
  return !todo.isDone && new Date(todo.dueAt).getTime() < Date.now();
};
