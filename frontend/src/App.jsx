import { useState, useEffect, useRef } from 'react';
import { useTheme } from './useTheme';
import Stats from './Stats';

const CATEGORY_PRESETS = ['general', 'work', 'personal', 'shopping'];

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

function CategoryBadge({ category }) {
  const cat = category || 'general';
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.75em',
      padding: '1px 6px',
      borderRadius: 4,
      background: '#e0e0e0',
      color: '#555',
      marginLeft: 4,
      verticalAlign: 'middle',
    }}>{cat}</span>
  );
}

function TodoItem({ todo, onToggle, onDelete, onTitleSaved }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [inputError, setInputError] = useState(false);
  const cancelledRef = useRef(false);
  const badge = getDueBadge(todo.dueDate, todo.completed);

  async function handleCheck() {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (res.ok) {
      const updated = await res.json();
      onToggle(updated);
    }
  }

  function startEdit() {
    cancelledRef.current = false;
    setDraft(todo.title);
    setInputError(false);
    setEditing(true);
  }

  async function saveEdit() {
    if (cancelledRef.current) return;
    if (!draft.trim()) { setInputError(true); return; }
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: draft.trim() }),
    });
    if (res.ok) { setEditing(false); onTitleSaved(); }
  }

  function cancelEdit() {
    cancelledRef.current = true;
    setEditing(false);
    setDraft('');
    setInputError(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  }

  if (editing) {
    return (
      <li style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <input type="checkbox" checked={todo.completed} onChange={handleCheck} />
        <input
          autoFocus
          value={draft}
          onChange={e => { setDraft(e.target.value); setInputError(false); }}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          style={{ border: inputError ? '2px solid red' : undefined }}
        />
        <CategoryBadge category={todo.category} />
        <button onClick={() => onDelete(todo.id)} title="Delete" aria-label="Delete todo">🗑</button>
      </li>
    );
  }

  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      <input type="checkbox" checked={todo.completed} onChange={handleCheck} />
      <span onDoubleClick={startEdit} title="Double-click to edit">{todo.title}</span>
      <CategoryBadge category={todo.category} />
      {todo.dueDate && (
        <span style={{ fontSize: '0.85em', color: '#666' }}>{formatDate(todo.dueDate)}</span>
      )}
      {badge && (
        <span style={{ fontSize: '0.78em', fontWeight: 'bold', color: 'white', background: badge.color, borderRadius: 3, padding: '1px 6px' }}>
          {badge.label}
        </span>
      )}
      <button onClick={() => onDelete(todo.id)} title="Delete" aria-label="Delete todo">🗑</button>
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
  const [category, setCategory] = useState('general');
  const [activeCategory, setActiveCategory] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  function loadTodos() {
    const url = filter === 'overdue' ? '/api/todos?overdue=true' : '/api/todos';
    fetch(url).then(r => r.ok ? r.json() : Promise.reject()).then(data => { setTodos(data); setLoading(false); }).catch(() => { setError('Failed to load todos'); setLoading(false); });
  }
  useEffect(() => { setLoading(true); loadTodos(); }, [filter]);

  async function handleDelete(id) {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) {
      setTodos(prev => prev.filter(t => t.id !== id));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); setError('');
    const body = { title, category: category || 'general' };
    if (dueDate) body.dueDate = dueDate;
    const res = await fetch('/api/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed'); return; }
    setTitle(''); setDueDate(''); setCategory('general'); loadTodos();
  }

  const allCategories = [...new Set(todos.map(t => t.category || 'general'))];
  const displayedTodos = activeCategory ? todos.filter(t => (t.category || 'general') === activeCategory) : todos;

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
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" />
        <input
          list="category-presets"
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category"
          style={{ width: 120 }}
        />
        <datalist id="category-presets">
          {CATEGORY_PRESETS.map(p => <option key={p} value={p} />)}
        </datalist>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          title="Due date (optional)"
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        <button onClick={() => { setFilter('all'); setActiveCategory(null); }} style={{ fontWeight: filter === 'all' && !activeCategory ? 'bold' : 'normal' }}>All</button>
        <button onClick={() => { setFilter('overdue'); setActiveCategory(null); }} style={{ fontWeight: filter === 'overdue' ? 'bold' : 'normal', color: filter === 'overdue' ? 'red' : undefined }}>Overdue</button>
        {allCategories.map(cat => (
          <button key={cat} onClick={() => { setFilter('all'); setActiveCategory(cat); }} style={{ fontWeight: activeCategory === cat ? 'bold' : 'normal' }}>{cat}</button>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && displayedTodos.length === 0 && <p>No todos yet</p>}
      {!loading && displayedTodos.length > 0 && <ul>{displayedTodos.map(t => <TodoItem key={t.id} todo={t} onToggle={updated => setTodos(prev => prev.map(x => x.id === updated.id ? updated : x))} onDelete={handleDelete} onTitleSaved={loadTodos} />)}</ul>}
    </div>
  );
}

export default App;
