const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { readTodos, writeTodos } = require('./storage');

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.get('/todos', (req, res) => {
  const { category } = req.query;
  let todos = readTodos();
  if (category) todos = todos.filter(t => (t.category || 'general') === category);
  const sorted = [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sorted);
});

router.post('/todos', (req, res) => {
  const { title, category } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: 'Title is required' });
  const todos = readTodos();
  const todo = { id: crypto.randomUUID(), title: title.trim(), completed: false, category: category && category.trim() ? category.trim() : 'general', createdAt: new Date().toISOString() };
  todos.push(todo);
  writeTodos(todos);
  res.status(201).json(todo);
});

router.patch('/todos/:id', (req, res) => {
  const todos = readTodos();
  const idx = todos.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { title, completed, category } = req.body;
  if (title !== undefined) {
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title must not be empty' });
    todos[idx].title = title.trim();
  }
  if (completed !== undefined) todos[idx].completed = Boolean(completed);
  if (category !== undefined) todos[idx].category = category && category.trim() ? category.trim() : 'general';
  writeTodos(todos);
  res.json(todos[idx]);
});

router.delete('/todos/:id', (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  todos.splice(index, 1);
  writeTodos(todos);
  res.status(204).end();
});

router.get('/todos/export', (req, res) => {
  const { format = 'json', category, status, priority } = req.query;
  let todos = readTodos();
  if (category) todos = todos.filter(t => (t.category || 'general') === category);
  if (status === 'completed') todos = todos.filter(t => t.completed);
  if (status === 'active') todos = todos.filter(t => !t.completed);
  if (priority) todos = todos.filter(t => (t.priority || 'medium') === priority);
  const date = new Date().toISOString().slice(0, 10);
  if (format === 'csv') {
    const header = 'id,title,completed,priority,category,dueDate,createdAt,notes';
    const rows = todos.map(t => [t.id, `"${(t.title||'').replace(/"/g,'""')}"`, t.completed, t.priority||'medium', t.category||'general', t.dueDate||'', t.createdAt||'', `"${(t.notes||'').replace(/"/g,'""')}"`].join(','));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="todos-${date}.csv"`);
    return res.send([header, ...rows].join('\n'));
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="todos-${date}.json"`);
  res.json(todos);
});

router.get('/stats', (req, res) => {
  const todos = readTodos().filter(t => !t.archived);
  const today = new Date().toISOString().slice(0, 10);
  const byCategory = {};
  for (const t of todos) {
    const cat = t.category || 'general';
    if (!byCategory[cat]) byCategory[cat] = { category: cat, total: 0, completed: 0 };
    byCategory[cat].total++;
    if (t.completed) byCategory[cat].completed++;
  }
  const byPriority = { high: 0, medium: 0, low: 0 };
  for (const t of todos) { const p = t.priority || 'medium'; if (byPriority[p] !== undefined) byPriority[p]++; }
  res.json({ total: todos.length, completed: todos.filter(t => t.completed).length, active: todos.filter(t => !t.completed).length, overdue: todos.filter(t => t.dueDate && t.dueDate < today && !t.completed).length, byCategory: Object.values(byCategory), byPriority });
});

module.exports = router;
