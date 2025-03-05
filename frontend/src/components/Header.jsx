import React, { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode, MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  // Apply dark mode class to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout-user", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Logout failed:", data.message);
      } else {
        localStorage.removeItem("accessToken");
        dispatch(logout());
        setMenuOpen(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <nav className="bg-blue-500 dark:bg-gray-900 text-white dark:text-gray-200 p-4 flex justify-between items-center shadow-md transition-all duration-300">
      <div className="text-2xl font-bold">
        <h2 className="cursor-pointer" onClick={()=>navigate("/")}>Task Management System</h2>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <MdClose className="h-8 w-8 text-white dark:text-gray-200" /> : <MdMenu className="h-8 w-8 text-white dark:text-gray-200" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-blue-500 dark:bg-gray-900 md:flex md:items-center md:space-x-4 p-4 md:p-0 ${menuOpen ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="m-4 text-white dark:text-gray-200"
            >
              {theme === "light" ? (
                <MdDarkMode className="h-10 w-10 p-2" />
              ) : (
                <MdLightMode className="h-10 w-10 p-2" />
              )}
            </button>
          </li>

          {currentUser ? (
            <li>
              <button onClick={handleLogout} className="hover:text-gray-300 dark:hover:text-gray-400 h-10 m-4">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300 dark:hover:text-gray-400 h-10 m-4">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-300 dark:hover:text-gray-400 h-10 m-4">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
