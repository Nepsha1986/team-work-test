const express = require('express');
const router = express.Router();
const { readTodos } = require('./storage');

router.get('/health', (req, res) => res.json({ status: 'ok' }));

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
    const rows = todos.map(t =>
      [
        t.id,
        `"${(t.title || '').replace(/"/g, '""')}"`,
        t.completed,
        t.priority || 'medium',
        t.category || 'general',
        t.dueDate || '',
        t.createdAt || '',
        `"${(t.notes || '').replace(/"/g, '""')}"`,
      ].join(',')
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="todos-${date}.csv"`);
    return res.send([header, ...rows].join('\n'));
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="todos-${date}.json"`);
  res.json(todos);
});

module.exports = router;
