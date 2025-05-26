import { useState } from 'react';
import type { Todo } from '../types/todo';
import { todoApi } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  return (
    <div style={{ 
      margin: '10px 0', 
      padding: '10px', 
      border: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title || 'No title'}
        </h3>
        <p>{todo.description || 'No description'}</p>
      </div>
    </div>
  );
} 