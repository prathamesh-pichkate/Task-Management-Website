import React from 'react';

const Card = ({ title, description, onUpdate, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 border border-gray-200">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex space-x-2">
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update
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

export default Card;
