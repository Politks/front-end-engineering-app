import { useEffect, useState } from 'react';
import type { Todo } from '../types/todo';
import { todoApi } from '../services/api';
import { todoSocket } from '../services/socket';
import { TodoItem } from './Todo';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    // Load initial todos
    loadTodos();

    // Set up socket event listeners
    const handleTodoCreated = (todo: Todo) => {
      console.log('Handling todo created:', todo);
      setTodos((prev) => [...prev, todo]);
    };

    const handleTodoUpdated = (updatedTodo: Todo) => {
      console.log('Handling todo updated:', updatedTodo);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    };

    const handleTodoDeleted = (id: string) => {
      console.log('Handling todo deleted:', id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const handleTodoToggled = (toggledTodo: Todo) => {
      console.log('Handling todo toggled:', toggledTodo);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === toggledTodo.id ? toggledTodo : todo))
      );
    };

    const socket = todoSocket.connect();
    const cleanupFunctions = [
      todoSocket.onTodoCreated(handleTodoCreated),
      todoSocket.onTodoUpdated(handleTodoUpdated),
      todoSocket.onTodoDeleted(handleTodoDeleted),
      todoSocket.onTodoToggled(handleTodoToggled)
    ];

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      todoSocket.disconnect();
    };
  }, []);

  const loadTodos = async () => {
    try {
      console.log('Loading todos...');
      const data = await todoApi.list();
      console.log('Loaded todos:', data);
      // Ensure we're getting the correct data structure
      const formattedTodos = data.map((todo: any) => {
        if (todo.props) {
          return todo.props;
        }
        return todo;
      });
      setTodos(formattedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const handleCreateTodo = async () => {
    if (!newTodoTitle.trim()) {
      alert('Title is required');
      return;
    }

    try {
      console.log('Creating todo:', { title: newTodoTitle, description: newTodoDescription });
      await todoApi.create({
        title: newTodoTitle,
        description: newTodoDescription,
      });
      setNewTodoTitle('');
      setNewTodoDescription('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    console.log('Updating todo in state:', updatedTodo);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    console.log('Deleting todo from state:', id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo List</h1>
      <button onClick={() => setIsModalOpen(true)}>Create New Todo</button>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '400px',
            }}
          >
            <h2>Create New Todo</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Description"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={handleCreateTodo}>Create</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {todos.length === 0 ? (
          <p>No todos yet. Create one!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
} 