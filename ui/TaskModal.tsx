// components/TaskModal.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../styles/modal.module.scss";
import { Task } from "@/types/task";
import Button from "../components/Button";
import ReusableModal from "../components/Modal";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  // users: string[];
  onSub: (task: Omit<Task, "id">) => void; // Omit the id field
  onUpdate: (task: Task) => void;
  task?: any;
  mode: "create" | "edit";
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  // users,
  onSub,
  onUpdate,
  task,
  mode,
}) => {
  if (!isOpen) return null;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    dueDate: Yup.date().required("Due date is required"),
  });

  const formik: any = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      assignee: task?.assignee || "none",
      priority: task?.priority || "Low",
      dueDate: task?.dueDate || "",
      status: task?.status || "To Do",
    },
    validationSchema,
    onSubmit: (values: any) => {
      const updatedTask = task ? { ...task, ...values } : values;

      if (task) {
        onUpdate(updatedTask);
      } else {
        onSub(updatedTask);
      }

      console.log("Task values:", values);

      onClose();
    },
  });

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit Task" : "Create Task"}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="title">Title*</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div style={{ color: "red" }}>{formik.errors.title}</div>
          ) : null}
        </div>

        <div className={styles.formField}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="assignee">Assignee</label>
          <select
            id="assignee"
            name="assignee"
            value={formik.values.assignee}
            onChange={formik.handleChange}
          >
            <option value="">Select Assignee</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
          </select>
        </div>

        <div className={styles.formField}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className={styles.formField}>
          <label htmlFor="dueDate">Due Date*</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <div style={{ color: "red" }}>{formik.errors.dueDate}</div>
          ) : null}
        </div>

        <div className={styles.formField}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <Button
          type="submit"
          label={mode === "edit" ? "Update Task" : "Add Task"}
        />
      </form>
    </ReusableModal>
  );
};

export default TaskModal;
