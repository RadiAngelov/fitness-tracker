import React, { useEffect, useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import styles from '../pages/Workouts.module.css';
import {
  Calendar, Activity, Clock, Flame, Sun, Zap, Edit3, MessageSquare, Dumbbell
} from 'lucide-react';


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
        userId: user.id
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
      <h1><Dumbbell size={24} className={styles.icon} /> Моите тренировки</h1>

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
            <span><Calendar size={16} className={styles.icon} /> {workout.date}</span>
            <span><Activity size={16} className={styles.icon} /> {workout.distance} км</span>
            <span><Clock size={16} className={styles.icon} /> {workout.duration} мин</span>
            <span className={styles.icon}>
              {workout.intensity === 'light' && <Sun size={16} className={styles.icon} />}
              {workout.intensity === 'medium' && <Zap size={16} className={styles.icon} />}
              {workout.intensity === 'extreme' && <Flame size={16} className={styles.icon} />}
              {convertIntensity(workout.intensity)}
            </span>
            {selectedWorkout?.id === workout.id && (
              <span className={styles["edit-icon"]}>
                <Edit3 size={16} />
              </span>
            )}
            {workout.comments && (
              <span className={styles.comment}>
                <MessageSquare size={16} className={styles.icon} />
                {workout.comments}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
