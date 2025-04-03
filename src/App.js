import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/Workouts';
import Stats from './pages/Stats';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import './App.css';


function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const saved = localStorage.getItem("user");
  if (!saved) return;

  const parsed = JSON.parse(saved);

  fetch(`http://localhost:5001/users/${parsed.id}`)
    .then(res => {
      if (!res.ok) throw new Error("Потребителят не съществува");
      return res.json();
    })
    .then(() => {
      setUser(parsed); // потребителят е валиден
    })
    .catch((err) => {
      console.error("Невалидна сесия:", err);
      localStorage.removeItem("user");
      setUser(null);
    });
}, []);


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
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={
  <PublicRoute>
    <Login setUser={setUser} />
  </PublicRoute>
} />
<Route path="/register" element={
  <PublicRoute>
    <Register setUser={setUser} />
  </PublicRoute>
} />


<Route path="/workouts" element={
  <PrivateRoute user={user} setUser={setUser}>
    <Workouts user={user} />
  </PrivateRoute>
} />


<Route path="/stats" element={
  <PrivateRoute user={user} setUser={setUser}>
    <Stats user={user} setUser={setUser} workouts={workouts} />
  </PrivateRoute>
} />


      </Routes>
    </div>
  );
}

export default App;
