# Feature 005: Delete Todo

## Summary
Allow the user to permanently delete a todo item. The item is removed from the JSON file and disappears from the list.

## Acceptance criteria
- `DELETE /api/todos/:id` removes the todo and returns 204 No Content
- Returns 404 with `{ error: "Not found" }` if the id does not exist
- Each todo item in the UI has a delete button (a trash icon or "Delete" label)
- Clicking the delete button removes the item from the list immediately
- No confirmation dialog is required

## Technical notes
- Backend: filter out the todo by id, write file back, return 204
- Frontend: remove item from local state after successful response

## Out of scope
- Soft delete / archive
- Undo / restore
