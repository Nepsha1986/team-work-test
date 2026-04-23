import { useState, useEffect } from 'react';

function TodoItem({ todo }) {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.title}
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load todos');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Advanced Todo App</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && todos.length === 0 && <p>No todos yet</p>}
      {!loading && !error && todos.length > 0 && (
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
