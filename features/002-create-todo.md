# Feature 002: Create Todo

## Summary
Allow the user to create a new todo item by typing a title and submitting a form. The todo is saved to the JSON file on the backend and immediately appears in the UI.

## Acceptance criteria
- `POST /api/todos` accepts `{ title: string }` and returns the created todo with status 201
- Created todo has: `id` (uuid), `title`, `completed: false`, `createdAt` (ISO string)
- Backend validates that `title` is a non-empty string; returns 400 with `{ error: "Title is required" }` otherwise
- Frontend shows an input field and a submit button labeled "Add Todo"
- Submitting adds the todo to the list without a full page reload
- Input is cleared after successful submission
- If the API returns an error, a brief error message is shown below the input

## Technical notes
- Use `crypto.randomUUID()` for ID generation (Node.js 16+ built-in)
- Storage: read `todos.json`, push new item, write back
- Frontend: controlled input with React state; `fetch` POST on submit

## Out of scope
- Description, due date, priority, category — plain title only
- Optimistic UI updates
