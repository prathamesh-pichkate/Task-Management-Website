import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/task/get-tasks");
      const data = await response.json();

      if (data.success) {
        setTasks(data.tasks);
      } else {
        console.error("Error fetching tasks:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Edit Task
  const handleEdit = (task) => {
    navigate(`/edit-task/${task._id}`);
  };

  // 🔹 Handle Delete Task
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Error deleting task:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className={`w-full min-h-screen mx-auto p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="my-6 p-10 flex flex-col space-y-5">
        <h1 className="font-bold text-2xl md:text-4xl">Create New Task</h1>
        <button
          className="h-14 max-w-fit bg-blue-400 p-4 flex justify-center items-center rounded-lg hover:bg-blue-800"
          onClick={() => navigate("/create-task")}
        >
          Create Task
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-4xl">Task List</h2>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onEdit={() => handleEdit(task)} 
              onDelete={() => handleDelete(task._id)} 
            />
          ))}
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Home;
