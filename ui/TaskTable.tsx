import React, { useState } from "react";
import { Task } from "../types/task";
import ReusableTable from "@/components/Table";
import styles from "@/styles/table.module.scss";
import TaskModal from "@/ui/TaskModal";
import DeleteModal from "@/ui/DeleteModal";

interface TaskTableProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onUpdate, onDelete }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "Low":
        return styles.priorityLow;
      case "Medium":
        return styles.priorityMedium;
      case "High":
        return styles.priorityHigh;
      default:
        return "";
    }
  };

  const columns = [
    {
      header: "Task Title",
      field: "title",
    },
    {
      header: "Status",
      field: "status",
    },
    {
      header: "Assignee",
      field: "assignee",
    },
    {
      header: "Priority",
      field: "priority",
      render: (task: Task) => (
        <span className={getPriorityClass(task.priority)}>{task.priority}</span>
      ),
    },
    {
      header: "Due Date",
      field: "dueDate",
      render: (task: Task) => task.dueDate,
    },
  ];

  const handleMenuToggle = (index: number) => {
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  };

  const renderActions = (task: Task, index: number) => (
    <div className={styles.optionsContainer}>
      <button
        className={styles.optionsButton}
        onClick={() => handleMenuToggle(index)}
      >
        •••
      </button>
      {activeMenuIndex === index && (
        <div className={styles.popupMenu}>
          <button
            className={styles.edit}
            onClick={() => {
              setSelectedTask(task);
              setIsModalOpen(true);
              handleMenuToggle(index);
            }}
          >
            Edit
          </button>
          <button
            className={styles.del}
            onClick={() => {
              setTaskToDelete(task.id);
              setIsDeleteModalOpen(true);
              handleMenuToggle(index);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <ReusableTable
        data={tasks}
        columns={columns}
        renderActions={renderActions}
        pageSize={5}
        showPagination={true}
        sortable={true}
        emptyMessage="No tasks available"
      />

      {isModalOpen && selectedTask && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
          onUpdate={onUpdate}
          onSub={() => {}}
          mode="edit"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setTaskToDelete(null);
          }}
          onConfirm={() => {
            if (taskToDelete) {
              onDelete(taskToDelete);
              setIsDeleteModalOpen(false);
              setTaskToDelete(null);
            }
          }}
        />
      )}
    </>
  );
};

export default TaskTable;
