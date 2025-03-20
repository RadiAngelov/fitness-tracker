import React, { useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import '../pages/Workouts.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (newWorkout) => {
    const sortedWorkouts = [...workouts, newWorkout].sort((a, b) => new Date(b.date) - new Date(a.date));
    setWorkouts(sortedWorkouts);
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
    <div className="workouts-container">
      <h1>🚴 Your Workouts</h1>
      <WorkoutForm onAddWorkout={addWorkout} />
      <ul className="workout-list">
        {workouts.map((workout, index) => (
          <li key={index} className="workout-item">
            <span>📅 {workout.date}</span>
            <span>🚴 {workout.distance} км</span>
            <span>⏳ {workout.duration} мин</span>
            <span>💪 {convertIntensity(workout.intensity)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
