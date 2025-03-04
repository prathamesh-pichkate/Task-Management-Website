import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import {useNavigate} from "react-router-dom"


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
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

    fetchTasks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="my-6 p-10 flex flex-col space-y-5 ">
        <h1 className="text-blue-800 text-bold text-2xl md:text-4xl">Create New Task</h1>
       <button className="h-14 max-w-fit bg-blue-400 p-4 flex justify-center items-center rounded-lg hover:bg-blue-800" onClick={()=> navigate("/create-task")}>Create Task</button>

      </div>
      <h2 className="text-2xl font-bold mb-4 text-4xl text-blue-800">
        Task List
      </h2>
  
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default Home;
