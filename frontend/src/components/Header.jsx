import React, { useState } from 'react';
import { MdLightMode, MdMenu, MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    
    // Get current user from Redux
    const { currentUser } = useSelector((state) => state.user);

    // Check if the user is on the login or register page
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout-user", {
                method: "POST",
                credentials: "include", // Ensures cookies (if any) are sent
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                console.error("Logout failed:", data.message);
            } else {
                localStorage.removeItem("accessToken"); // Remove stored access token
                dispatch(logout()); // Dispatch logout action to update state
                window.location.href = "/login"; // Redirect to login page
            }
        } catch (error) {
            console.error("Error during logout:", error.message);
        }
    };
    

    return (
        <nav className='bg-gray-700 text-white p-4 flex justify-between items-center'>
            <div className='text-2xl font-bold'>
                <h2>Task Management System</h2>
            </div>
            
            {/* Mobile Menu Toggle Button */}
            <div className='md:hidden'>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <MdClose className='h-8 w-8' /> : <MdMenu className='h-8 w-8' />}
                </button>
            </div>
            
            {/* Navigation Links */}
            <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-700 md:flex md:items-center md:space-x-4 p-4 md:p-0 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                <ul className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center'>
                    <li>
                        <button className='m-4'><MdLightMode className='h-10 w-10 p-2'/></button>
                    </li>
                    {currentUser ? (
                        <li>
                            <button onClick={handleLogout} className='hover:text-gray-200 h-10 m-4'>Logout</button>
                        </li>
                    ) : (
                        isAuthPage && (
                            <>
                                <li>
                                    <Link to="/login" className='hover:text-gray-200 h-10 m-4'>Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className='hover:text-gray-200 h-10 m-4'>Register</Link>
                                </li>
                            </>
                        )
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
