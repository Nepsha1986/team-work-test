import { useState, useEffect } from 'react';

function ProgressBar({ value, max }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div style={{ background: '#eee', borderRadius: 4, overflow: 'hidden', height: 16, width: '100%' }}>
      <div style={{ width: `${pct}%`, background: '#4caf50', height: '100%' }} />
    </div>
  );
}

export default function Stats({ onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); });
  }

  useEffect(load, []);

  if (loading) return <div><p>Loading stats...</p></div>;

  return (
    <div>
      <button onClick={onClose}>← Back</button>
      <h2>Statistics</h2>

      <p>Total todos: <strong>{stats.total}</strong></p>
      <p>Completed: <strong>{stats.completed}</strong> ({stats.total ? Math.round(stats.completed / stats.total * 100) : 0}%)</p>
      <ProgressBar value={stats.completed} max={stats.total} />
      <p>Active: <strong>{stats.active}</strong></p>
      <p>Overdue: <strong>{stats.overdue}</strong></p>

      <h3>By Category</h3>
      <table>
        <thead><tr><th>Category</th><th>Total</th><th>Done</th></tr></thead>
        <tbody>
          {stats.byCategory.map(c => (
            <tr key={c.category}>
              <td>{c.category}</td>
              <td>{c.total}</td>
              <td>{c.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>By Priority</h3>
      <p>High: {stats.byPriority.high} | Medium: {stats.byPriority.medium} | Low: {stats.byPriority.low}</p>

      <button onClick={load}>Refresh</button>
    </div>
  );
}
