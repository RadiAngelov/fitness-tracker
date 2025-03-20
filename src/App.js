import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkoutForm from './components/WorkoutForm';

const Home = () => <h1>🏠 Welcome to Fitness Tracker</h1>;
const Stats = () => <h1>📊 Workout Statistics</h1>;

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  const convertIntensity = (level) => {
    switch (level) {
      case 'light': return 'Леко';
      case 'medium': return 'Средно';
      case 'extreme': return 'Екстремно';
      default: return 'Неизвестно';
    }
  };  

  return (
    <div>
      <h1>🚴 Your Workouts</h1>
      <WorkoutForm onAddWorkout={addWorkout} />
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            📅 {workout.date} - 🚴 {workout.distance} км - ⏳ {workout.duration} мин - 💪 {convertIntensity(workout.intensity)}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
