import React, { useState, useEffect } from 'react';
import styles from '../components/WorkoutForm.module.css';


const getMinDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  return today.toISOString().split("T")[0];
};

const getMaxDate = () => {
  return new Date().toISOString().split("T")[0];
};

const WorkoutForm = ({ onAddWorkout, selectedWorkout, onDelete, onClearSelection, onUpdateWorkout }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('medium');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (selectedWorkout) {
      setDate(selectedWorkout.date);
      setDistance(selectedWorkout.distance);
      setDuration(selectedWorkout.duration);
      setIntensity(selectedWorkout.intensity);
      setComments(selectedWorkout.comments);
    } else {
      setDate('');
      setDistance('');
      setDuration('');
      setIntensity('medium');
      setComments('');
    }
  }, [selectedWorkout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance || !duration) {
      alert('Моля, попълни всички задължителни полета!');
      return;
    }

    const workoutData = {
      date,
      distance: parseFloat(distance),
      duration: parseFloat(duration),
      intensity,
      comments
    };

    if (selectedWorkout) {
      onUpdateWorkout(selectedWorkout.id, workoutData);
    } else {
      onAddWorkout(workoutData);
    }

    setDate('');
    setDistance('');
    setDuration('');
    setIntensity('medium');
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles['workout-form']} ${styles['fade-in']}`}>
      <div className={styles['form-group']}>
        <label>Дата:</label>
        <input type="date" min={getMinDate()} max={getMaxDate()} value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className={styles['form-group']}>
        <label>Разстояние (км):</label>
        <input type="number" min="1" value={distance} onChange={(e) => setDistance(e.target.value)} required />
      </div>

      <div className={styles['form-group']}>
        <label>Времетраене (минути):</label>
        <input type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </div>

      <div className={styles['form-group']}>
        <label>Интензивност:</label>
        <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
          <option value="light">Леко</option>
          <option value="medium">Средно</option>
          <option value="extreme">Екстремно</option>
        </select>
      </div>

      <div className={styles['form-group']}>
        <label>Коментари:</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Допълнителни бележки..." />
      </div>

      {!selectedWorkout ? (
        <button type="submit">Добави тренировка</button>
      ) : (
        <div className={styles['form-buttons']}>
          <button type="submit">Редактирай</button>
          <button type="button" className={styles.danger} onClick={() => onDelete(selectedWorkout.id)}>Изтрий</button>
          <button type="button" onClick={onClearSelection}>Отказ</button>
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
