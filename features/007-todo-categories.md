# Feature 007: Todo Categories

## Summary
Add a category (label) to each todo. Users can assign a category when creating a todo and filter the list to show only todos of a specific category.

## Acceptance criteria
- Todos gain a `category` field (string, optional, defaults to `"general"`)
- `POST /api/todos` accepts an optional `category` field
- `PATCH /api/todos/:id` accepts an optional `category` field
- `GET /api/todos?category=<name>` returns only todos matching that category
- The create form has a text input (or simple dropdown with presets) for category
- Below the todo list, a row of category filter buttons is shown (one per distinct category + an "All" button)
- Clicking a category button filters the list to that category; "All" clears the filter
- Each todo item shows its category as a small badge/tag

## Technical notes
- Categories are freeform strings — no separate categories table or file
- The distinct category list for the filter buttons is derived from the current todos array
- Preset suggestions in the dropdown: `general`, `work`, `personal`, `shopping`

## Out of scope
- Creating/renaming/deleting categories as standalone objects
- Color-coding categories
- Multiple categories per todo
