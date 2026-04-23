# Feature 013: Sort Todos

## Summary
Let the user choose how the todo list is sorted via a dropdown. Supported sort options: Date Created, Due Date, Priority, and Title.

## Acceptance criteria
- A "Sort by" dropdown is displayed next to the filter controls
- Sort options: "Date Created (newest)", "Date Created (oldest)", "Due Date (soonest)", "Priority (high first)", "Title (A–Z)"
- Default sort is "Date Created (newest)"
- Sorting is applied client-side after all active filters
- Todos without a due date sort to the bottom when sorting by Due Date
- The selected sort option persists for the session (React state)

## Technical notes
- All sorting is done in the frontend by sorting the filtered array before rendering
- Priority sort order: `high` > `medium` > `low`
- Use `Array.prototype.sort()` with appropriate comparator functions

## Out of scope
- Server-side sort params
- Drag-and-drop manual reordering
- Secondary sort key
