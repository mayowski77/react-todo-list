import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// TodoItem Component
const TodoItem = React.memo(({ todo, onDelete }) => (
  <li>
    <span>{todo.text}</span>
    <button onClick={() => onDelete(todo.id)}>Delete</button>
  </li>
));

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

// TodoInput Component
const TodoInput = ({ value, onChange, onAdd, onKeyDown }) => (
  <div>
    <input
      type="text"
      aria-label="Todo input"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Add a todo..."
    />
    <button aria-label="Add todo" onClick={onAdd}>Add</button>
  </div>
);

TodoInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

// Main TodoList Component
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = useCallback(() => {
    if (inputValue.trim() === '') {
      setError('Todo cannot be empty.');
      clearErrorAfterDelay();
      return;
    }
    if (todos.some(todo => todo.text === inputValue.trim())) {
      setError('Todo already exists.');
      clearErrorAfterDelay();
      return;
    }
    setTodos(prevTodos => [...prevTodos, { id: uuidv4(), text: inputValue.trim(), completed: false }]);
    setInputValue('');
    setError('');
  }, [inputValue, todos]);

  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setError('');
    }, 5000); // Clear error after 5 seconds
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTodo();
    }
  };

  const handleDeleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TodoInput 
        value={inputValue} 
        onChange={handleInputChange} 
        onAdd={handleAddTodo} 
        onKeyDown={handleKeyDown} 
      />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;