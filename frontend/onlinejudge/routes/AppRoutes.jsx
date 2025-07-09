
// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProblemsList from '../pages/Problems/ProblemsList';
import ProblemView from '../pages/Problems/ProblemView';
import Contests from '../pages/Contests/Contests';
import Submissions from '../pages/Submissions/Submissions';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import Discuss from '../pages/Discuss/Discuss';

import Profile from '../pages/Profile/Profile';

const AppRoutes = ({ user, isAdmin, handleLogout, handleLogin }) => {
  return (
    <Router>
      <div className="app min-h-screen bg-gray-900 text-white">
        <Navbar user={user} isAdmin={isAdmin} handleLogout={handleLogout} />
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<ProblemsList user={user} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/problems" element={<ProblemsList user={user} />} />
            <Route path="/problems/:problemNumber" element={<ProblemView user={user} />} />
            <Route path="/contests" element={<Contests user={user} />} />
            <Route path="/submissions" element={<Submissions user={user} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/discuss" element={<Discuss user={user} />} />

            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
