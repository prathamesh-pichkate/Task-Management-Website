import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md p-4 overflow-hidden">
      {/* Task Title (Prevents Overflow with Truncate) */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
        {task.title}
      </h3>
      
      {/* Task Description (Wraps Long Words) */}
      <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 break-words line-clamp-3">
        {task.description}
      </p>

      {/* Task Due Date */}
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      {/* Edit and Delete Buttons */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
