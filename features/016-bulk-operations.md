# Feature 016: Bulk Operations

## Summary
Let users select multiple todos with checkboxes and apply an action (Complete, Delete, Archive) to all selected items at once.

## Acceptance criteria
- A "Select" toggle button activates bulk-selection mode
- In selection mode, each todo item shows a selection checkbox on the left
- A "Select all" checkbox in the header selects/deselects all visible (filtered) todos
- When one or more todos are selected, a bulk-action toolbar appears showing: "Complete selected", "Delete selected", "Archive selected"
- Each action applies to all selected todos, sending individual API requests in parallel
- After the action completes, selection mode is exited and the list refreshes
- The count of selected items is shown in the toolbar: "3 selected"
- Pressing Escape exits selection mode and clears selections

## Technical notes
- Track selected IDs in a `Set` in React state
- Fire all API requests with `Promise.all` for parallel execution
- "Archive selected" only archives completed todos in the selection; incomplete ones are skipped (show a brief notice)

## Out of scope
- Server-side bulk endpoint
- Partial failures / rollback
