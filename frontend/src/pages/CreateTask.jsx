import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { theme } = useSelector((state) => state.theme);

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
    <div className={`min-h-screen w-full ${
        theme === "dark"
          ? "bg-gray-900 text-white shadow-lg"
          : "bg-white text-gray-800 shadow-md"
      }`}>
      <div
      className={`max-w-lg mx-auto p-6 rounded-lg transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-white shadow-lg"
          : "bg-white text-gray-800 shadow-md"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md transition-all ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md transition-all ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            required
          />
        </div>

        {/* Due Date Input */}
        <div>
          <label className="block text-sm font-medium">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md transition-all ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 rounded-md transition-all ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateTask;
