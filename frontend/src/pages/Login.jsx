import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errorMessage } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(loginFail("All fields are required"));
    }
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        return dispatch(loginFail(data.message));
      }

      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`p-6 max-w-md w-full rounded-md shadow-md transition-all ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded transition-all ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded transition-all ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
          />
          <button
            type="submit"
            className={`w-full p-2 rounded transition-all ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } disabled:opacity-50`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
