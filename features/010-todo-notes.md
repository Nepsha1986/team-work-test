# Feature 010: Todo Notes

## Summary
Add an optional multiline notes/description field to each todo. The notes are hidden by default and revealed by expanding the todo item.

## Acceptance criteria
- Todos gain a `notes` field (string, optional, defaults to `""`)
- `POST /api/todos` and `PATCH /api/todos/:id` accept an optional `notes` field
- The create form has a collapsible "Add notes" section with a `<textarea>`
- Each todo item shows an expand/collapse toggle (e.g., a chevron) if notes are present
- Clicking the toggle reveals the notes text below the title; clicking again hides it
- Notes can be edited in-place: clicking into the revealed notes area switches it to a `<textarea>`; blurring saves via PATCH
- Todos with notes show a small "note" icon to indicate content is available

## Technical notes
- Notes are plain text — no markdown rendering required
- Only one item should be expanded at a time (collapse others on open) — or allow multiple; either is acceptable

## Out of scope
- Rich text / markdown formatting
- Attachments
