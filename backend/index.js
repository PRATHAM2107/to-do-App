const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task"); // Import the Task model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB (update with your connection string)
const connectionString =
  "mongodb+srv://prathameshpatil0303:HwZwwFwpPaEKTG0U@cluster0.axvrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your connection string

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// API Endpoints

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err); // Log error details
    res.status(500).json({ message: err.message });
  }
});

// Add a new task
app.post("/tasks", async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  // Log the request payload for debugging
  console.log("Received payload:", req.body);

  const newTask = new Task({
    title,
    description,
    dueDate,
    priority,
    completed: false, // Include completed in the task creation
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error saving task:", err); // Log the error
    res.status(400).json({ message: err.message });
  }
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err); // Log error details
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting task:", err); // Log error details
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
