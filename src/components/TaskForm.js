import React, { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://to-do-app-backend-chi.vercel.app";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleInputChange = useCallback(
    (setter) => (e) => {
      setter(e.target.value);
      setError(""); // Clear error on input change
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      return;
    }
    setLoading(true);
    setError(""); // Clear previous error
    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        completed: false,
      });
      addTask(response.data); // Add the new task
      // Reset form fields only after successfully adding the task
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low");
    } catch (error) {
      // Handle error and set error message
      setError(
        error.response ? error.response.data.message : "Error adding task."
      );
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={handleInputChange(setTitle)}
        required
        disabled={loading} // Disable input while loading
      />
      <input
        type="text"
        placeholder="Short description"
        value={description}
        onChange={handleInputChange(setDescription)}
        required
        disabled={loading} // Disable input while loading
      />
      <input
        type="date"
        value={dueDate}
        onChange={handleInputChange(setDueDate)}
        required
        disabled={loading} // Disable input while loading
      />
      <select
        value={priority}
        onChange={handleInputChange(setPriority)}
        disabled={loading}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"} {/* Show loading text */}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
    </form>
  );
};

export default TaskForm;
