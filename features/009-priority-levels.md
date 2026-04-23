# Feature 009: Priority Levels

## Summary
Add a priority level (High, Medium, Low) to each todo. Priority is shown as a coloured indicator on each item and can be set at creation or via edit.

## Acceptance criteria
- Todos gain a `priority` field: `"high"`, `"medium"`, or `"low"` (defaults to `"medium"`)
- `POST /api/todos` and `PATCH /api/todos/:id` accept an optional `priority` field
- Backend validates that priority, if provided, is one of the three allowed values; returns 400 otherwise
- The create form has a select/toggle for priority (High / Medium / Low)
- Each todo item displays a coloured dot or pill: red = High, orange = Medium, grey = Low
- The todo list is sorted: High first, then Medium, then Low (within the same completion status)
- A priority filter: clicking "High", "Medium", or "Low" in the filter bar shows only that priority

## Technical notes
- Sort order on `GET /api/todos`: incomplete todos first (within incomplete, sort by priority), then completed todos
- Priority sort order: `high` > `medium` > `low`

## Out of scope
- Custom priority levels
- Priority combined with due-date urgency scoring
