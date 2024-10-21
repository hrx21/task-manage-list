export const allTasks = Array.from({ length: 200 }, (_, index) => ({
    id: `task-${index + 1}`,
    title: `Task ${index + 1}`,
    status: ["To Do", "In Progress", "Completed"][index % 3],
    assignee: `Assignee ${index + 1}`,
    priority: ["Low", "Medium", "High"][index % 3],
    dueDate: new Date(Date.now() + index * 86400000).toISOString(),
  }));
  