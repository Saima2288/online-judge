// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Register from './pages/Login/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './components/Home.jsx';

// Problem pages
import ProblemsList from './pages/Problems/ProblemsList.jsx';
import ProblemView from './pages/Problems/ProblemView.jsx';

// Submissions page
import Submissions from './pages/Submissions/Submissions.jsx';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You could verify the token here if needed
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAdmin(userData.role === 'admin');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="app min-h-screen bg-gray-900 text-white">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <div className="content p-4">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />

          {/* Problems Routes */}
          <Route path="/problems" element={<ProblemsList user={user} isAdmin={isAdmin} />} />
          <Route path="/problems/:problemNumber" element={<ProblemView user={user} />} />

          {/* Submissions Route */}
          <Route path="/submissions" element={<Submissions user={user} />} />

          {/* Additional routes can go here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
