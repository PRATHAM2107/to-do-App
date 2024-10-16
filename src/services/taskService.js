import axios from "axios";

const API_URL = "https://to-do-app-backend-chi.vercel.app";

console.log("API URL:", API_URL); // Check if API_URL is set correctly

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response || error.message);
    throw error;
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error.response || error.message);
    throw error;
  }
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error.response || error.message);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error.response || error.message);
    throw error;
  }
};
