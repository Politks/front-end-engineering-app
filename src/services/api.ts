import axios from 'axios';
import type { CreateTodoInput, Todo, UpdateTodoInput } from '../types/todo';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const todoApi = {
  create: async (data: CreateTodoInput): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', data);
    return response.data;
  },

  list: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },

  update: async (id: string, data: UpdateTodoInput): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  toggle: async (id: string): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todos/${id}/toggle`);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
}; 