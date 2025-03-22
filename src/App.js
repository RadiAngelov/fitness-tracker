import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/Workouts';
import Stats from './pages/Stats';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const Home = () => <h1>🏠 Welcome to Fitness Tracker</h1>;

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:5001/workouts")
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(w => w.userId === user.id)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(filtered);
      })
      .catch(err => console.error("Грешка при зареждане на тренировките:", err));
  }, [user]);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route path="/workouts" element={
          <PrivateRoute user={user}>
            <Workouts user={user} />
          </PrivateRoute>
        } />

        <Route path="/stats" element={
          <PrivateRoute user={user}>
            <Stats user={user} workouts={workouts} />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
