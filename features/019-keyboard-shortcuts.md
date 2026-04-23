# Feature 019: Keyboard Shortcuts

## Summary
Add keyboard navigation and shortcuts so power users can manage todos without touching the mouse.

## Acceptance criteria
- `?` key opens a keyboard shortcuts help modal listing all available shortcuts
- `Escape` closes any open modal or cancels any active edit
- `n` focuses the "Add Todo" input (when not already in an input)
- `j` / `k` moves focus (highlight) down / up through the visible todo list
- `Space` toggles completion on the currently focused todo
- `e` starts inline title edit on the focused todo
- `d` deletes the focused todo (no confirmation)
- `x` selects/deselects the focused todo (bulk-select mode activates automatically)
- Shortcuts are disabled when the user is typing in any `<input>` or `<textarea>`
- A persistent `?` icon button in the top-right corner also opens the shortcuts modal

## Technical notes
- Attach a single `keydown` listener on `document` via `useEffect`; clean it up on unmount
- Track `focusedIndex` in React state
- The focused item is highlighted with a distinct background colour
- Guard all shortcuts with `event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA'`

## Out of scope
- Customisable keybindings
- `vim`-style command mode
- Shortcuts for filters or sort controls
