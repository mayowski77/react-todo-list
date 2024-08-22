import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './TodoList';
import './styles.css';

ReactDOM.render(
    <React.StrictMode>
        <TodoList />
    </React.StrictMode>,
    document.getElementById('root')
);