import { useState, useEffect } from 'react';
import { useTheme } from './useTheme';
import Stats from './Stats';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
}

function getDueBadge(dueDate, completed) {
  if (!dueDate || completed) return null;
  const today = new Date().toISOString().slice(0, 10);
  if (dueDate < today) return { label: 'Overdue', color: 'red' };
  if (dueDate === today) return { label: 'Due today', color: 'orange' };
  return null;
}

function TodoItem({ todo }) {
  const badge = getDueBadge(todo.dueDate, todo.completed);
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: 4 }}>
      {todo.title}
      {todo.dueDate && (
        <span style={{ marginLeft: 8, fontSize: '0.85em', color: '#666' }}>
          {formatDate(todo.dueDate)}
        </span>
      )}
      {badge && (
        <span style={{
          marginLeft: 8,
          fontSize: '0.78em',
          fontWeight: 'bold',
          color: 'white',
          background: badge.color,
          borderRadius: 3,
          padding: '1px 6px'
        }}>
          {badge.label}
        </span>
      )}
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
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  function loadTodos() {
    const url = filter === 'overdue' ? '/api/todos?overdue=true' : '/api/todos';
    fetch(url).then(r => r.ok ? r.json() : Promise.reject()).then(data => { setTodos(data); setLoading(false); }).catch(() => { setError('Failed to load todos'); setLoading(false); });
  }
  useEffect(() => { setLoading(true); loadTodos(); }, [filter]);

  async function handleSubmit(e) {
    e.preventDefault(); setError('');
    const body = { title };
    if (dueDate) body.dueDate = dueDate;
    const res = await fetch('/api/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed'); return; }
    setTitle(''); setDueDate(''); loadTodos();
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
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={{ marginLeft: 8 }}
          title="Due date (optional)"
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: 12, marginBottom: 8 }}>
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal', marginRight: 4 }}
        >
          All
        </button>
        <button
          onClick={() => setFilter('overdue')}
          style={{ fontWeight: filter === 'overdue' ? 'bold' : 'normal', marginRight: 4, color: filter === 'overdue' ? 'red' : undefined }}
        >
          Overdue
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && todos.length === 0 && <p>No todos yet</p>}
      {!loading && todos.length > 0 && <ul>{todos.map(t => <TodoItem key={t.id} todo={t} />)}</ul>}
    </div>
  );
}

export default App;
