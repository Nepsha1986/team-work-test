const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { readTodos, writeTodos } = require('./storage');

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.get('/todos', (req, res) => {
  const todos = readTodos();
  const sorted = [...todos].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sorted);
});

router.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todos = readTodos();
  const todo = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  writeTodos(todos);
  res.status(201).json(todo);
});

router.get('/stats', (req, res) => {
  const all = readTodos();
  const todos = all.filter(t => !t.archived);
  const today = new Date().toISOString().slice(0, 10);

  const byCategory = {};
  for (const t of todos) {
    const cat = t.category || 'general';
    if (!byCategory[cat]) byCategory[cat] = { category: cat, total: 0, completed: 0 };
    byCategory[cat].total++;
    if (t.completed) byCategory[cat].completed++;
  }

  const byPriority = { high: 0, medium: 0, low: 0 };
  for (const t of todos) {
    const p = t.priority || 'medium';
    if (byPriority[p] !== undefined) byPriority[p]++;
  }

  res.json({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => t.dueDate && t.dueDate < today && !t.completed).length,
    byCategory: Object.values(byCategory),
    byPriority,
  });
});

module.exports = router;
