import React, { useState, useEffect, useCallback } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css"; // Ensure your CSS includes styles for the loading spinner
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        // Check if error response exists and log it
        const message =
          error.response && error.response.data
            ? error.response.data.message
            : "Failed to load tasks.";
        setError(message);
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);
  const addTask = useCallback(async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Error creating task."
      );
      console.error("Error creating task:", error);
    }
  }, []);

  const toggleTaskCompletion = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    try {
      await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      setError("Error updating task.");
      console.error("Error updating task:", error);
    }
  };

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
      completed: false,
    };
    try {
      await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      setError("Error editing task.");
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      setError("Error deleting task.");
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      {loading ? (
        <div className="spinner"></div> // Loading spinner
      ) : (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
            deleteTask={handleDeleteTask}
          />
        </>
      )}
    </div>
  );
};

export default App;
