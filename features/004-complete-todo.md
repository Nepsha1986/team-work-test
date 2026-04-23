# Feature 004: Complete Todo

## Summary
Let the user toggle a todo between completed and not completed by clicking its checkbox. The change is persisted to the JSON file.

## Acceptance criteria
- `PATCH /api/todos/:id` accepts `{ completed: boolean }` and returns the updated todo
- Returns 404 with `{ error: "Not found" }` if the id does not exist
- Clicking the checkbox in the UI sends the PATCH request and updates the item in place
- Completed items get a strikethrough style; incomplete items are normal
- The checkbox reflects the current `completed` state at all times

## Technical notes
- Backend: find todo by id, update `completed`, write file, return updated todo
- Frontend: update local state optimistically after a successful response (or re-fetch — either is acceptable)

## Out of scope
- Bulk completion
- Completion timestamps
