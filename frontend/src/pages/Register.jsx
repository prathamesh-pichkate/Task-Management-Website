import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setErrorMessage(data.message || "Registration failed");
      }

      setLoading(false);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-md transition-all ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            className={`w-full p-2 border rounded transition-all ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            required
          />
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            className={`w-full p-2 border rounded transition-all ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            className={`w-full p-2 border rounded transition-all ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className={`w-full p-2 border rounded transition-all ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded transition-all ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } disabled:opacity-50`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`transition-all ${
              theme === "dark" ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
            }`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
