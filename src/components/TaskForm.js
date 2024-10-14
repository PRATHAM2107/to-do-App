import React, { useState, useCallback } from "react";
import axios from "axios";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(
    (setter) => (e) => {
      setter(e.target.value);
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        completed: false,
      });
      addTask(response.data);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low");
    } catch (error) {
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
      />
      <input
        type="text"
        placeholder="Short description"
        value={description}
        onChange={handleInputChange(setDescription)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={handleInputChange(setDueDate)}
        required
      />
      <select value={priority} onChange={handleInputChange(setPriority)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" disabled={loading}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
