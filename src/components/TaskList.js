import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTaskCompletion, editTask, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task._id} // Use _id instead of id for the key
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
