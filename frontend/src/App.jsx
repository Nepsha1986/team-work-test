import { useState, useEffect } from 'react';
import Stats from './Stats';

function TodoItem({ todo }) {
  return <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</li>;
}

function ExportButton() {
  function doExport(format) { const a = document.createElement('a'); a.href = `/api/todos/export?format=${format}`; a.click(); }
  return <div><button onClick={() => doExport('json')}>Export JSON</button> <button onClick={() => doExport('csv')}>Export CSV</button></div>;
}

function App() {
  const [view, setView] = useState('main');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  function loadTodos() {
    fetch('/api/todos').then(r => r.ok ? r.json() : Promise.reject()).then(data => { setTodos(data); setLoading(false); }).catch(() => { setError('Failed to load todos'); setLoading(false); });
  }
  useEffect(loadTodos, []);

  async function handleSubmit(e) {
    e.preventDefault(); setError('');
    const res = await fetch('/api/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed'); return; }
    setTitle(''); loadTodos();
  }

  if (view === 'stats') return <Stats onClose={() => setView('main')} />;

  return (
    <div>
      <h1>Advanced Todo App</h1>
      <button onClick={() => setView('stats')}>Stats</button>
      <ExportButton />
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && todos.length === 0 && <p>No todos yet</p>}
      {!loading && todos.length > 0 && <ul>{todos.map(t => <TodoItem key={t.id} todo={t} />)}</ul>}
    </div>
  );
}

export default App;
