import { useState } from 'react';
import Stats from './Stats';

function App() {
  const [view, setView] = useState('main');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to create todo');
      return;
    }
    setTitle('');
  }

  if (view === 'stats') return <Stats onClose={() => setView('main')} />;

  return (
    <div>
      <h1>Advanced Todo App</h1>
      <button onClick={() => setView('stats')}>Stats</button>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
