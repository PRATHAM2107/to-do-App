// src/services/taskService.js
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new task
export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
