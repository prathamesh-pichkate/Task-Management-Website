import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800 dark:border-gray-700">
      {/* Task Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {task.title}
      </h3>
      {/* Task Description */}
      <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
        {task.description}
      </p>
      {/* Task Due Date */}
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskCard;
