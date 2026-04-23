# Feature 003: List Todos

## Summary
Display all todos fetched from the backend in a list. Each item shows the title and its completion status. The list is loaded when the page mounts.

## Acceptance criteria
- `GET /api/todos` returns the full array of todos sorted by `createdAt` descending (newest first)
- Frontend fetches and renders todos on mount
- Each todo item shows: checkbox (reflecting `completed`), title text
- Completed todos have their title visually struck through
- While loading, a "Loading..." text is shown
- If the fetch fails, an error message is shown
- If there are no todos, a "No todos yet" empty state message is shown

## Technical notes
- No pagination required — load all todos at once
- Use a `TodoList` component and a `TodoItem` component
- Store todos in React component state; re-fetch after any mutation

## Out of scope
- Sorting controls, filters — static newest-first order only
- Editing or deleting from this view
