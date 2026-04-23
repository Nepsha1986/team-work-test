# Feature 014: Sub-tasks

## Summary
Allow a todo to have an ordered list of sub-tasks. Each sub-task has its own title and completed state. The parent todo shows a progress indicator (e.g., "2 / 5 done").

## Acceptance criteria
- Todos gain a `subtasks` field: array of `{ id, title, completed }` (defaults to `[]`)
- `POST /api/todos/:id/subtasks` accepts `{ title }` and adds a subtask; returns updated todo
- `PATCH /api/todos/:id/subtasks/:subtaskId` accepts `{ completed }` or `{ title }` to toggle/rename
- `DELETE /api/todos/:id/subtasks/:subtaskId` removes the subtask
- Expanding a todo item (chevron) reveals the subtask list below the notes
- Each subtask has its own checkbox, title, and delete button
- An "Add sub-task" inline input appears at the bottom of the subtask list
- The parent todo item shows a progress badge: "2 / 5" in grey when some are done, green when all done
- Completing all subtasks does NOT automatically complete the parent todo

## Technical notes
- Subtasks are stored nested inside the parent todo object in `todos.json`
- Use `crypto.randomUUID()` for subtask IDs
- Subtask routes are nested under `/api/todos/:id/subtasks`

## Out of scope
- Nested subtasks (only one level deep)
- Reordering subtasks
