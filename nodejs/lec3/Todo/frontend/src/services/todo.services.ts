
import axios from "axios";
import { config } from "../config";
import type { Todo, CreateTodoInput } from "../types/todo.types";

const todoApi = axios.create({
  baseURL: `${config.backend_url}/api/v1/todo`,
});

todoApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("taskflow_token");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const response = await todoApi.get("/");
    return response.data.data.todos;
  },

  async create(input: CreateTodoInput): Promise<Todo> {
    const response = await todoApi.post("/", input);
    return response.data.data.todo;
  },

  async toggle(todo: Todo): Promise<Todo> {
    const response = await todoApi.patch(`/${todo._id}`, {
      completed: !todo.completed,
    });
    console.log(response);
    
    return response.data.data.todo;
  },

  async delete(id: string): Promise<void> {
    await todoApi.delete(`/${id}`);
  },
};
