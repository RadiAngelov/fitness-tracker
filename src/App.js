import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const Home = () => <h1>🏠 Welcome to Fitness Tracker</h1>;
const Workouts = () => <h1>🚴 Your Workouts</h1>;
const Stats = () => <h1>📊 Workout Statistics</h1>;

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  );
}

export default App;
