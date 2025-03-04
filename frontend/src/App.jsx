import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTask from "./pages/CreateTask";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Protected Route for Home Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
