# Feature 020: Dark Mode

## Summary
Add a light/dark theme toggle. The chosen theme is persisted in `localStorage` and automatically applied on page load. The default respects the OS preference.

## Acceptance criteria
- A sun/moon toggle button in the top-right corner switches between light and dark mode
- The active theme is saved to `localStorage` under the key `todo-theme`
- On page load, the saved theme is applied before first render (no flash of wrong theme)
- If no saved preference exists, the OS preference (`prefers-color-scheme`) is used
- All existing UI elements (background, text, borders, buttons, badges, inputs) adapt correctly to both themes
- The toggle button shows a sun icon in dark mode and a moon icon in light mode

## Technical notes
- Implement using CSS custom properties (variables) defined on `:root` and overridden on `[data-theme="dark"]` set on `<html>`
- Apply the theme class/attribute in a `<script>` tag in `index.html` before React mounts to prevent flash
- A `useTheme` custom hook manages reading/writing localStorage and toggling the attribute
- Define at minimum: `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`, `--border`, `--accent` variables and use them throughout existing styles

## Out of scope
- Multiple colour themes beyond light/dark
- Per-component theme overrides
- System theme change detection after page load
