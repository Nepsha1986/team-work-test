# Feature 018: Export Todos

## Summary
Allow the user to download their todos as a JSON or CSV file. Export respects the currently active filters.

## Acceptance criteria
- `GET /api/todos/export?format=json` returns the full todos array as a downloadable JSON file
- `GET /api/todos/export?format=csv` returns todos as a downloadable CSV file
- Both endpoints support the same filter query params as `GET /api/todos` (`category`, `status`, `priority`, `archived`)
- Frontend shows an "Export" dropdown button with two options: "Export as JSON" and "Export as CSV"
- Clicking an option constructs the URL with current active filters and triggers a file download
- JSON export filename: `todos-<YYYY-MM-DD>.json`
- CSV export filename: `todos-<YYYY-MM-DD>.csv`
- CSV columns: `id`, `title`, `completed`, `priority`, `category`, `dueDate`, `createdAt`, `notes`

## Technical notes
- For JSON: set `Content-Disposition: attachment; filename="todos-<date>.json"` and `Content-Type: application/json`
- For CSV: set `Content-Disposition: attachment; filename="todos-<date>.csv"` and `Content-Type: text/csv`
- Build the CSV manually with a header row + one row per todo — no external CSV library
- Trigger download on the frontend using a temporary `<a>` tag with `href` set to the API URL

## Out of scope
- Import from file
- Excel (.xlsx) format
- Subtasks in CSV (omit or flatten to count)
