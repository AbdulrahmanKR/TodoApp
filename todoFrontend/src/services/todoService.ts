import api from "../api/axios";
import type { Todo } from "../types/todo";

const TodoService = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>("/todo");
    return response.data;
  },

  create: async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const response = await api.post<Todo>("/todo", todo);
    return response.data;
  },

  update: async (id: number, todo: Todo) => {
    await api.put(`/todo/${id}`, todo);
  },

  delete: async (id: number) => {
    await api.delete(`/todo/${id}`);
  },
};

export default TodoService;
