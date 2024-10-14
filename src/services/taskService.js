import axios from "axios";
const API_URL = "http://localhost:5000/tasks";

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
