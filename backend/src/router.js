const express = require('express');
const router = express.Router();
const { readTodos } = require('./storage');

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.get('/todos', (req, res) => {
  const todos = readTodos();
  const sorted = [...todos].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sorted);
});

module.exports = router;
