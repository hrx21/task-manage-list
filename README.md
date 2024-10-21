# task-manage-list

# Project Components Documentation

This documentation provides detailed information about the components used in the project: **Button**, **Modal**, **Table**, **Sidebar**, and **Footer**. These components are utilized to build the **TaskList** feature of the application.

## 1. Button Component

### Usage

The `Button` component is a reusable element that can be used throughout the application to handle various click events.

### Props

- **`onClick: () => void`**: Function that will be executed when the button is clicked.
- **`label: string`**: The text displayed inside the button.

### Example

```tsx
<Button onClick={handleModalOpen} label="Create Task" />
```
