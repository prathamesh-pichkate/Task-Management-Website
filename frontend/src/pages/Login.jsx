import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errorMessage } = useSelector((state) => state.user);

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
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