# Feature 017: Statistics Dashboard

## Summary
A dedicated stats page showing an overview of the user's todo activity: completion rate, todos by category, overdue count, and a simple activity breakdown.

## Acceptance criteria
- A "Stats" link at the top of the page navigates to the stats view (toggle, no router needed)
- `GET /api/stats` returns a computed stats object (see below)
- Stats displayed:
  - Total todos (excluding archived)
  - Completed todos count + percentage bar
  - Active (incomplete) todos count
  - Overdue todos count (past due date, not completed)
  - Todos by category: a list of `{ category, total, completed }` rows
  - Todos by priority: counts for High / Medium / Low
- Stats are computed on the backend from `todos.json`
- A "Refresh" button re-fetches stats

## API response shape
```json
{
  "total": 20,
  "completed": 8,
  "active": 12,
  "overdue": 3,
  "byCategory": [
    { "category": "work", "total": 10, "completed": 4 }
  ],
  "byPriority": {
    "high": 5,
    "medium": 10,
    "low": 5
  }
}
```

## Technical notes
- No charting library — render data as styled HTML (progress bars with CSS width %, simple tables)
- Archived todos are excluded from all stats

## Out of scope
- Historical trends over time
- Per-day completion graphs
