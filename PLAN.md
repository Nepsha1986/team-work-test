# Plan: Due Dates

## Summary

Add an optional `dueDate` field (ISO date string, nullable) to todos. The backend router will be updated to accept `dueDate` in POST and PATCH requests, and to support a `GET /api/todos?overdue=true` query that returns only incomplete todos whose `dueDate` is before today. The frontend will gain a date picker in the create form, display the due date on each todo item formatted as `DD MMM YYYY`, show a red "Overdue" badge for past-due incomplete todos and an orange "Due today" badge for todos due today, and add an "Overdue" filter button in the filter bar alongside any existing category filters.

## Tasks

- [ ] TASK-1: Update backend router to accept dueDate in POST /api/todos and PATCH /api/todos/:id, and filter by overdue in GET /api/todos — file: backend/src/router.js
- [ ] TASK-2: Add date picker to create form, display due date and badges on todo items, and add Overdue filter button in the frontend — file: frontend/src/App.jsx
