import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('todo-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('todo-theme', theme);
  }, [theme]);

  function toggle() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }

  return { theme, toggle };
}
