# Feature 012: Filter by Status

## Summary
Add tab-style buttons to filter the todo list by completion status: All, Active (incomplete), and Completed.

## Acceptance criteria
- Three filter tabs are displayed: "All", "Active", "Completed"
- "All" shows every todo (default)
- "Active" shows only todos where `completed === false`
- "Completed" shows only todos where `completed === true`
- The active tab is visually highlighted
- A count badge on each tab shows how many todos match (e.g., "Active (3)")
- Status filter works in combination with search and category/priority filters
- The selected tab persists during the session (React state) but resets on page reload

## Technical notes
- Client-side filtering only — no query param required
- Counts update reactively as todos are created, completed, or deleted

## Out of scope
- URL-based filter state (no query params / router)
- Archived status tab (that is Feature 015)
