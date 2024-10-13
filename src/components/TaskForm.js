import React, { useState } from "react";
import axios from "axios"; // Import Axios

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low"); // Default to 'Low' priority

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation: Ensure title, description, and dueDate are not empty
    if (!title.trim() || !description.trim() || !dueDate) {
      console.error("All fields are required.");
      return; // Exit if validation fails
    }

    try {
      // Send a POST request to the backend API
      const response = await axios.post("http://localhost:5000/tasks", {
        title,
        description,
        dueDate: new Date(dueDate), // Convert dueDate to Date object
        priority,
        completed: false,
      });

      // Call addTask to update the local state if needed
      addTask(
        response.data.title,
        response.data.description,
        response.data.dueDate,
        response.data.priority
      );

      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low"); // Reset to 'Low' priority
    } catch (error) {
      // Log any errors to the console
      console.error(
        "Error adding task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
