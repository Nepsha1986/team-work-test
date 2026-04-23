import { useState, useEffect } from 'react';
import { useTheme } from './useTheme';
import Stats from './Stats';

function TodoItem({ todo, onTitleSaved }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [inputError, setInputError] = useState(false);

  function startEdit() {
    setDraft(todo.title);
    setInputError(false);
    setEditing(true);
  }

  async function saveEdit() {
    if (!draft.trim()) { setInputError(true); return; }
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: draft.trim() }),
    });
    if (res.ok) { setEditing(false); onTitleSaved(); }
  }

  function cancelEdit() { setEditing(false); setDraft(''); setInputError(false); }

  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  }

  if (editing) {
    return (
      <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <input
          autoFocus
          value={draft}
          onChange={e => { setDraft(e.target.value); setInputError(false); }}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          style={{ border: inputError ? '2px solid red' : undefined }}
        />
      </li>
    );
  }

  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onDoubleClick={startEdit} title="Double-click to edit">{todo.title}</span>
    </li>
  );
}

function ExportButton() {
  function doExport(format) { const a = document.createElement('a'); a.href = `/api/todos/export?format=${format}`; a.click(); }
  return <div><button onClick={() => doExport('json')}>Export JSON</button> <button onClick={() => doExport('csv')}>Export CSV</button></div>;
}

function App() {
  const { theme, toggle } = useTheme();
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
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Advanced Todo App</h1>
        <div>
          <button onClick={() => setView('stats')}>Stats</button>
          <button onClick={toggle} title="Toggle theme">{theme === 'dark' ? '☀️' : '🌙'}</button>
        </div>
      </div>
      <ExportButton />
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && todos.length === 0 && <p>No todos yet</p>}
      {!loading && todos.length > 0 && <ul>{todos.map(t => <TodoItem key={t.id} todo={t} onTitleSaved={loadTodos} />)}</ul>}
    </div>
  );
}

export default App;
