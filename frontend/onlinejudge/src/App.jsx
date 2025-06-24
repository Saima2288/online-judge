// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './pages/Login/Register/Register';
import Login from './pages/Login/Login';
import Home from './components/Home';

// Import problem pages
import ProblemsList from './pages/Problems/ProblemsList';
import ProblemView from './pages/Problems/ProblemView';

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
      <div className="app">
        <Navbar user={user} isAdmin={isAdmin} handleLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />

            {/* Problems routes */}
            <Route path="/problems" element={<ProblemsList />} />
            <Route path="/problems/:problemNumber" element={<ProblemView />} />

            {/* You can add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
