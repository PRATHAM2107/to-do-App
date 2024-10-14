import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTaskCompletion, editTask, deleteTask }) => {
  return (
    <ul>
      {tasks.length === 0 ? (
        <li>No tasks available.</li> // Display a message if there are no tasks
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id} // Use _id as the key
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </ul>
  );
};

export default TaskList;
