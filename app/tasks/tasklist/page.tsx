"use client";
import Sidebar from "@/components/Sidebar";
import css from "@/styles/dashboard.module.scss";
import { Task } from "@/types/task";
import TaskTable from "@/ui/TaskTable";
import React, { useState, useEffect, useRef } from "react";
import TaskModal from "@/ui/TaskModal";
import Button from "@/components/Button";
import SingleLineFooter from "@/components/SingleLineFooter";

const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasksData, setTasksData] = useState<Task[]>([
    {
      id: "1",
      title: "Task 1",
      status: "To Do",
      assignee: "Alice",
      priority: "High",
      dueDate: "2024-10-02",
    },
    {
      id: "2",
      title: "Task 2",
      status: "In Progress",
      assignee: "Bob",
      priority: "Medium",
      dueDate: "2024-10-07",
    },
    {
      id: "3",
      title: "Task 3",
      status: "Completed",
      assignee: "Charlie",
      priority: "Low",
      dueDate: "2024-10-09",
    },
    {
      id: "4",
      title: "Task 4",
      status: "Completed",
      assignee: "Charlie",
      priority: "Low",
      dueDate: "2024-10-11",
    },
    {
      id: "5",
      title: "Task 5",
      status: "To Do",
      assignee: "Bob",
      priority: "High",
      dueDate: "2024-10-17",
    },
    {
      id: "6",
      title: "Task 6",
      status: "In Progress",
      assignee: "Alice",
      priority: "Medium",
      dueDate: "2024-10-27",
    },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasksData);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<any[]>([]);

  const tabs = ["All", "To Do", "In Progress", "Completed"];

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredTasks(tasksData);
    } else {
      setFilteredTasks(
        tasksData.filter((task) => task.status === statusFilter)
      );
    }
  }, [statusFilter, tasksData]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setStatusFilter(tabs[index]);
    updateIndicatorPosition(index);
  };

  const updateIndicatorPosition = (index: number) => {
    const currentTab = tabRefs.current[index];
    if (currentTab && indicatorRef.current) {
      indicatorRef.current.style.width = `${currentTab.offsetWidth}px`;
      indicatorRef.current.style.transform = `translateX(${currentTab.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    updateIndicatorPosition(activeTab);
  }, [activeTab]);

  const handleTaskSubmit = (newTask: Omit<Task, "id">) => {
    setTasksData((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: `${prevTasks.length + 1}` },
    ]);
    handleModalClose();
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasksData((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (id: string) => {
    setTasksData((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className={css.wholepage}>
      <Sidebar isOpen={isModalOpen} />
      <div className={css.mainContent}>
        <div className={css.header}>
          {/* Pills for filtering */}
          <div className={css.pills}>
            <div className={css.tabs}>
              <div className={css.indicator} ref={indicatorRef}></div>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  ref={(el: HTMLButtonElement | null) => {
                    tabRefs.current[index] = el;
                  }}
                  className={`${css.tab} ${
                    activeTab === index ? css.active : ""
                  } notosans-600`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={css.btn}>
            <Button onClick={handleModalOpen} label={"Create Task"} />
          </div>
        </div>
        <TaskTable
          tasks={filteredTasks}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
        />
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSub={handleTaskSubmit}
          onUpdate={handleTaskUpdate}
          mode={"create"}
        />
        <SingleLineFooter />
      </div>
    </div>
  );
};

export default TaskList;
