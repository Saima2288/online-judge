// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Register from './pages/Login/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './components/Home.jsx';

// Problem pages
import ProblemsList from './pages/Problems/ProblemsList.jsx';
import ProblemView from './pages/Problems/ProblemView.jsx';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (userData, adminStatus) => {
    setUser(userData);
    setIsAdmin(adminStatus);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="app min-h-screen bg-gray-900 text-white">
        <Navbar user={user} isAdmin={isAdmin} handleLogout={handleLogout} />
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />

            {/* Problems Routes */}
            <Route path="/problems" element={<ProblemsList user={user} isAdmin={isAdmin} />} />
            <Route path="/problems/:problemNumber" element={<ProblemView user={user} />} />

            {/* Additional routes can go here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
