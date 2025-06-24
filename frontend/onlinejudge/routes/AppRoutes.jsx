
// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Problems from '../pages/Problems/Problems';
import Contests from '../pages/Contests/Contests';
import Submissions from '../pages/Submissions/Submissions';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import Discuss from '../pages/Discuss/Discuss';
import Admin from '../pages/Admin/Admin';
import Profile from '../pages/Profile/Profile';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
