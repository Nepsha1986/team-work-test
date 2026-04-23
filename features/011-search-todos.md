# Feature 011: Search Todos

## Summary
Add a search bar that filters the visible todo list in real time as the user types. Search matches against the todo title and notes.

## Acceptance criteria
- A search input is displayed above the todo list with placeholder "Search todos..."
- As the user types, the list is filtered client-side to show only todos whose `title` or `notes` contains the search string (case-insensitive)
- If no todos match, a "No results for '<query>'" message is shown
- Clearing the search input restores the full list
- Search works in combination with any active category/status/priority filters
- A small "×" clear button appears inside the input when it has a value

## Technical notes
- Filtering is entirely client-side — no new API endpoint required
- Use `String.prototype.includes()` with `.toLowerCase()` for matching
- Debounce is not required (filter on every keystroke is fine for a local JSON file)

## Out of scope
- Server-side search endpoint
- Fuzzy matching
- Highlighting matched text in results
