# Feature 006: Edit Todo Title

## Summary
Allow the user to rename a todo by double-clicking its title. An inline text input replaces the title. Pressing Enter or clicking away saves the change.

## Acceptance criteria
- `PATCH /api/todos/:id` accepts `{ title: string }` and returns the updated todo
- Returns 400 if title is empty; returns 404 if id not found
- Double-clicking a todo title switches it to an inline `<input>` pre-filled with the current title
- Pressing Enter or blurring the input saves the change via PATCH
- Pressing Escape cancels editing and restores the original title
- An empty title is rejected: the input gets a red border and no request is made
- After saving, the input is replaced by the updated title text

## Technical notes
- Track `editingId` in component state to know which item is in edit mode
- Only one item can be in edit mode at a time
- Reuse the existing PATCH endpoint from Feature 004 — it should accept partial updates

## Out of scope
- Editing description, due date, or any field other than title
- Multi-line editing
