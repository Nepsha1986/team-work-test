const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { readTodos, writeTodos } = require('./storage');

router.get('/health', (req, res) => res.json({ status: 'ok' }));

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

module.exports = router;
