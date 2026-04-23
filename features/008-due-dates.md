# Feature 008: Due Dates

## Summary
Allow users to set an optional due date on a todo. Overdue todos are visually highlighted. Users can filter to see only overdue items.

## Acceptance criteria
- Todos gain a `dueDate` field (ISO date string, optional, defaults to `null`)
- `POST /api/todos` accepts an optional `dueDate` field
- `PATCH /api/todos/:id` accepts an optional `dueDate` field
- `GET /api/todos?overdue=true` returns todos where `dueDate < today` and `completed === false`
- The create form has a date picker input (`<input type="date">`) for due date
- Each todo item shows its due date (formatted as `DD MMM YYYY`) if set
- Overdue todos (past due date, not completed) display a red "Overdue" badge
- Todos due today display an orange "Due today" badge
- An "Overdue" filter button appears in the filter bar alongside category filters

## Technical notes
- Date comparison on the backend uses `Date` objects; compare date strings at midnight UTC
- No external date library — use built-in `Date`

## Out of scope
- Due time (only date, not time)
- Recurring todos
- Calendar view
- Notifications or reminders
