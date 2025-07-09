// src/components/Navbar/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-400">
        <NavLink to="/" className="hover:text-indigo-300 transition">
          YourCode
        </NavLink>
      </div>

      <div className="flex space-x-6 text-sm md:text-base">
        <NavLink to="/problems" className="hover:text-indigo-300">Problems</NavLink>
        <NavLink to="/contests" className="hover:text-indigo-300">Contests</NavLink>
        <NavLink to="/submissions" className="hover:text-indigo-300">Submissions</NavLink>
        <NavLink to="/leaderboard" className="hover:text-indigo-300">Leaderboard</NavLink>
        <NavLink to="/discuss" className="hover:text-indigo-300">Discuss</NavLink>
      </div>

      <div className="flex space-x-4">
        <NavLink to="/profile" className="hover:text-indigo-300">Profile</NavLink>
        <NavLink
          to="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition font-semibold"
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
