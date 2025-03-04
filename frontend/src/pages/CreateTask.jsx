import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!task.title || !task.description || !task.dueDate) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("api/task/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Task created successfully!");
        navigate("/");
        setTask({ title: "", description: "", dueDate: "" }); // Reset form

      } else {
        setError(data.message || "Failed to create task.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Create a New Task
      </h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Description Input */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Due Date Input */}
        <div>
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
