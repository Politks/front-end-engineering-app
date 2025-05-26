import { useState } from 'react';
import type { Todo } from '../types/todo';
import { todoApi } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleToggle = async () => {
    try {
      const updatedTodo = await todoApi.toggle(todo.id);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedTodo = await todoApi.update(todo.id, { title, description });
      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await todoApi.delete(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (isEditing) {
    return (
      <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: '5px' }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', marginBottom: '5px' }}
        />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
      <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </h3>
      <p>{todo.description}</p>
      <button onClick={handleToggle}>
        {todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      </button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
} 