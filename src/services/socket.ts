import { io, Socket } from 'socket.io-client';
import type { Todo } from '../types/todo';

let socket: Socket | null = null;

const createSocket = () => {
  if (!socket) {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    socket = io(socketUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
  }
  return socket;
};

export const todoSocket = {
  connect: () => {
    const socket = createSocket();
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return socket;
  },

  onTodoCreated: (callback: (todo: Todo) => void) => {
    const socket = createSocket();
    socket.on('todo:created', (todo) => {
      console.log('Todo created:', todo);
      callback(todo);
    });
    return () => socket.off('todo:created');
  },

  onTodoUpdated: (callback: (todo: Todo) => void) => {
    const socket = createSocket();
    socket.on('todo:updated', (todo) => {
      console.log('Todo updated:', todo);
      callback(todo);
    });
    return () => socket.off('todo:updated');
  },

  onTodoDeleted: (callback: (id: string) => void) => {
    const socket = createSocket();
    socket.on('todo:deleted', (id) => {
      console.log('Todo deleted:', id);
      callback(id);
    });
    return () => socket.off('todo:deleted');
  },

  onTodoToggled: (callback: (todo: Todo) => void) => {
    const socket = createSocket();
    socket.on('todo:toggled', (todo) => {
      console.log('Todo toggled:', todo);
      callback(todo);
    });
    return () => socket.off('todo:toggled');
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
}; 