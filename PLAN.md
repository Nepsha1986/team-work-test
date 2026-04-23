# Plan: Delete Todo

## Summary
Add the ability to permanently delete a todo item. On the backend, a new `DELETE /api/todos/:id` route will filter out the specified todo from the JSON data file and return 204 No Content, or 404 if the id does not exist. On the frontend, the `TodoItem` component will be updated to accept an `onDelete` callback and render a delete button; the `App` component will wire up a handler that calls the API and removes the item from local state on success.

## Tasks
- [ ] TASK-1: Add DELETE /api/todos/:id route to backend router — file: backend/src/router.js
- [ ] TASK-2: Add delete button to TodoItem and wire up deletion in App — file: frontend/src/App.jsx
