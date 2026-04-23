const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/todos.json');

function readTodos() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
}

module.exports = { readTodos, writeTodos };
