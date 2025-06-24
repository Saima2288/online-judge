// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Login/Register/Register';
import Login from './pages/Login/Login';
import Home from './components/Home';  // Import the new Home component
import './App.css'

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
            {/* Add protected routes here, like /problems, /profile, etc. */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
