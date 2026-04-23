import { useState } from 'react';
import Stats from './Stats';

function App() {
  const [view, setView] = useState('main');

  if (view === 'stats') return <Stats onClose={() => setView('main')} />;

  return (
    <div>
      <h1>Advanced Todo App</h1>
      <button onClick={() => setView('stats')}>Stats</button>
    </div>
  );
}

export default App;
