import React, { useEffect, useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import styles from '../pages/Workouts.module.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
  
    fetch("http://localhost:5001/workouts")
      .then(res => res.json())
      .then(data => {
        const userWorkouts = data
          .filter(workout => workout.userId === user.id)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(userWorkouts);
      })
      .catch(err => console.error("Грешка при зареждане на тренировките:", err));
  }, []);  

  const addWorkout = (newWorkout) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
  
    fetch("http://localhost:5001/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...newWorkout, userId: user.id })
    })
      .then(res => res.json())
      .then(savedWorkout => {
        const updated = [...workouts, savedWorkout].sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(updated);
      })
      .catch(err => console.error("Грешка при добавяне на тренировка:", err));
  };
  

  const deleteWorkout = (id) => {
    fetch(`http://localhost:5001/workouts/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setWorkouts((prev) => prev.filter(workout => workout.id !== id));
        setSelectedWorkout(null);
      })
      .catch(err => console.error("Грешка при изтриване:", err));
  };

  const updateWorkout = (id, updatedWorkout) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
  
    fetch(`http://localhost:5001/workouts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...updatedWorkout,
        userId: user.id // 🔥 Запазваме userId при редакция
      })
    })
      .then(res => res.json())
      .then((data) => {
        setWorkouts(prev =>
          prev.map(w => (w.id === id ? data : w)).sort((a, b) => new Date(b.date) - new Date(a.date))
        );
        setSelectedWorkout(null);
      })
      .catch(err => console.error("Грешка при редактиране:", err));
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
    <div className={styles["workouts-container"]}>
      <h1>🚴 Моите тренировки</h1>

      <WorkoutForm
        onAddWorkout={addWorkout}
        selectedWorkout={selectedWorkout}
        onDelete={deleteWorkout}
        onClearSelection={() => setSelectedWorkout(null)}
        onUpdateWorkout={updateWorkout}
      />

      <ul className={styles["workout-list"]}>
        {workouts.map((workout) => (
          <li
            key={workout.id}
            className={`${styles["workout-item"]} ${selectedWorkout?.id === workout.id ? styles["selected"] : ''}`}
            onClick={() => setSelectedWorkout(workout)}
          >
            <span>📅 {workout.date}</span>
            <span>🚴 {workout.distance} км</span>
            <span>⏳ {workout.duration} мин</span>
            <span>💪 {convertIntensity(workout.intensity)}</span>
            {selectedWorkout?.id === workout.id && (
              <span className={styles["edit-icon"]}>✏️</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
