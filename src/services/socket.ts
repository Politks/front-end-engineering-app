import { io } from 'socket.io-client';
import type { Todo } from '../types/todo';

const socket = io('http://localhost:3000');

export const todoSocket = {
  onTodoCreated: (callback: (todo: Todo) => void) => {
    socket.on('todo:created', callback);
  },

  onTodoUpdated: (callback: (todo: Todo) => void) => {
    socket.on('todo:updated', callback);
  },

  onTodoDeleted: (callback: (id: string) => void) => {
    socket.on('todo:deleted', callback);
  },

  onTodoToggled: (callback: (todo: Todo) => void) => {
    socket.on('todo:toggled', callback);
  },

  disconnect: () => {
    socket.disconnect();
  },
}; 