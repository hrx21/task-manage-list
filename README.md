# task-manage-list

# Project Components Documentation

This documentation provides detailed information about the components used in the project: **Button**, **Modal**, **Table**, **Sidebar**, and **Footer**. These components are utilized to build the **TaskList** feature of the application.

## How to run

After cloning this repository in your terminal type npm run dev and in your browser paste this localhost:3000

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

## 2. Modal Component

## Usage

The TaskModal component is a reusable modal used for creating and editing tasks in the application.

## Props

isOpen: boolean: Controls whether the modal is open or closed.
onClose: () => void: Function that closes the modal.
onSub: (newTask: Omit<Task, "id">) => void: Function that handles the submission of a new task.
onUpdate: (updatedTask: Task) => void: Function that handles the update of an existing task.
mode: "create" | "edit": Defines whether the modal is in create or edit mode.

## Example

<TaskModal
  isOpen={isModalOpen}
  onClose={handleModalClose}
  onSub={handleTaskSubmit}
  onUpdate={handleTaskUpdate}
  mode="create"
/>

## 3. Table Component

## Usage

The TaskTable component displays a list of tasks in a structured table format, supporting filtering, updating, and deleting tasks.

## Props

tasks: Task[]: An array of task objects to be displayed.
onUpdate: (updatedTask: Task) => void: Function to handle updates to a task.
onDelete: (id: string) => void: Function to delete a task by its ID.

## Example

<TaskTable
  tasks={filteredTasks}
  onUpdate={handleTaskUpdate}
  onDelete={handleTaskDelete}
/>

## 4. Sidebar Component

## Usage

The Sidebar component is used for navigation and displaying additional information or actions. In this project, it's part of the dashboard layout.

## Props

isOpen: boolean: Controls the visibility of the sidebar.

## Example

<Sidebar isOpen={isModalOpen} />

## TaskList Component

The TaskList component brings together all these components to create a comprehensive task management interface. It includes features such as task filtering, creating, updating, and deleting tasks using a modal, and a responsive table for displaying task details.

## State Variables

isModalOpen: boolean: Controls the visibility of the task modal.
tasksData: Task[]: Holds the complete list of tasks.
filteredTasks: Task[]: Holds the filtered tasks based on the selected tab.
statusFilter: string: Stores the current status filter (e.g., "All", "To Do").
activeTab: number: Tracks the currently active tab.
indicatorRef: A reference for managing the indicator's position.
tabRefs: A reference for accessing each tab button.

## Methods

handleModalOpen(): Opens the task modal.
handleModalClose(): Closes the task modal.
handleTabClick(index: number): Handles the click event on tabs for filtering tasks based on their status.
updateIndicatorPosition(index: number): Updates the position and width of the tab indicator.
handleTaskSubmit(newTask: Omit<Task, "id">): Submits a new task and adds it to the task list.
handleTaskUpdate(updatedTask: Task): Updates an existing task.
handleTaskDelete(id: string): Deletes a task by its ID.

## How it works??

Created a task management system with form and tables also added a edit and delete feature in this.
