import { useTheme } from './useTheme';

function App() {
  const { theme, toggle } = useTheme();

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Advanced Todo App</h1>
        <button onClick={toggle} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}

export default App;
