import React, { useState, useEffect } from "react";

const TaskItem = ({ task, toggleTaskCompletion, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  const [newPriority, setNewPriority] = useState(task.priority);

  // Use useEffect to update local state when task changes
  useEffect(() => {
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate);
    setNewPriority(task.priority);
  }, [task]);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task._id, newTitle, newDescription, newDueDate, newPriority); // Use _id here
    }
    setIsEditing(!isEditing);
  };

  // Function to format due date into a readable format
  const formatDueDate = (dueDate) => {
    return dueDate ? new Date(dueDate).toLocaleDateString() : "No due date";
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed || false} // Use a default value if undefined
        onChange={() => toggleTaskCompletion(task._id)} // Use _id here
      />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      ) : (
        <div>
          <span>
            {task.title}
            {task.completed && (
              <span className="done-label"> [Marked as Done]</span>
            )}
          </span>
          <p>{task.description}</p>
          <p>
            Due: <span className="due-date">{formatDueDate(task.dueDate)}</span>
          </p>
          <p>
            Priority:{" "}
            <span className={`priority ${task.priority}`}>{task.priority}</span>
          </p>
        </div>
      )}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
