import ToDoList from "./ToDoList.jsx";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login.jsx';  
import Signup from './Signup.jsx';  


function App() {
    const [user, setUser] = useState(null);  
  
    useEffect(() => {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) {
        setUser(savedUser.username);  
      }
}, []);
const handleLogout = () => {
    setUser(null);  
    localStorage.removeItem('user');
};

return (
    <Router>
      <div>
        <nav>
          {user ? (
            <>
              <Link to="/">To-Do</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={user ? <ToDoList user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

