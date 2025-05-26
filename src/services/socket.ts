import { io } from 'socket.io-client';
import type { Todo } from '../types/todo';

const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export const todoSocket = {
  onTodoCreated: (callback: (todo: Todo) => void) => {
    socket.on('todo:created', (todo) => {
      console.log('Todo created:', todo);
      callback(todo);
    });
  },

  onTodoUpdated: (callback: (todo: Todo) => void) => {
    socket.on('todo:updated', (todo) => {
      console.log('Todo updated:', todo);
      callback(todo);
    });
  },

  onTodoDeleted: (callback: (id: string) => void) => {
    socket.on('todo:deleted', (id) => {
      console.log('Todo deleted:', id);
      callback(id);
    });
  },

  onTodoToggled: (callback: (todo: Todo) => void) => {
    socket.on('todo:toggled', (todo) => {
      console.log('Todo toggled:', todo);
      callback(todo);
    });
  },

  disconnect: () => {
    socket.disconnect();
  },
}; 