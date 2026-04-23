# Feature 015: Archive Completed Todos

## Summary
Instead of deleting completed todos, users can archive them. Archived todos are hidden from the main list but viewable in a separate Archive view.

## Acceptance criteria
- Todos gain an `archived` field (`boolean`, defaults to `false`)
- `POST /api/todos/:id/archive` sets `archived: true` on a todo; returns updated todo
- `POST /api/todos/:id/unarchive` sets `archived: false`; returns updated todo
- `GET /api/todos` excludes archived todos by default
- `GET /api/todos?archived=true` returns only archived todos
- A "Archive" button appears on each completed todo item (in addition to the delete button)
- Clicking "Archive" moves the todo off the main list immediately
- An "Archive" link/tab at the top of the page navigates to the archive view
- The archive view lists archived todos with an "Unarchive" button on each
- Archived todos can still be permanently deleted from the archive view

## Technical notes
- Archive view is a separate component rendered conditionally (no router needed — a boolean state flag is fine)
- The main list filter always adds `archived: false` to its query unless the user is in archive view

## Out of scope
- Auto-archiving on completion
- Archive statistics
