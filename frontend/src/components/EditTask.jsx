import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch task details on component mount
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`/api/task/get-task/${taskId}`);
        const data = await response.json();

        if (data.success && data.task) {
          setTask({
            title: data.task.title || "",
            description: data.task.description || "",
            dueDate: data.task.dueDate ? data.task.dueDate.split("T")[0] : "",
          });
        } else {
          setError(data.message || "Failed to fetch task.");
          console.error("Error fetching task:", data.message);
        }
      } catch (error) {
        setError("Network error. Please try again.");
        console.error("Network error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (data.success) {
        alert("Task updated successfully!");
        navigate("/");
      } else {
        setError(data.message || "Update failed.");
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      setError("Error updating task. Please try again.");
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Edit Task</h1>

      {loading ? (
        <p className="text-gray-500">Loading task details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Due Date Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Update Task
          </button>
        </form>
      )}
    </div>
  );
};

export default EditTask;
