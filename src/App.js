import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService"; // Import the service methods
import "./App.css"; // Import the CSS styles

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from the backend on component mount
  useEffect(() => {
    const loadTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };

    loadTasks();
  }, []);

  // Add a new task with title, description, due date, and priority
  const addTask = async (title, description, dueDate, priority) => {
    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    const createdTask = await createTask(newTask); // Create task in backend
    setTasks([...tasks, createdTask]); // Update local state with new task
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    await updateTask(id, updatedTask); // Update task in backend
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task))); // Update local state
  };

  // Edit task details
  const editTask = async (
    id,
    newTitle,
    newDescription,
    newDueDate,
    newPriority
  ) => {
    const updatedTask = {
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
      priority: newPriority,
      completed: false, // Reset completion status if needed
    };

    await updateTask(id, updatedTask); // Update task in backend
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, ...updatedTask } : task
      )
    ); // Update local state
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    await deleteTask(id); // Delete task in backend
    setTasks(tasks.filter((task) => task._id !== id)); // Update local state
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};
