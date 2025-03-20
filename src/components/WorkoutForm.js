import React, { useState } from 'react';

const WorkoutForm = ({ onAddWorkout }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('medium');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance || !duration) {
      alert('Моля, попълни всички задължителни полета!');
      return;
    }
    onAddWorkout({ date, distance, duration, intensity, comments });
    setDate('');
    setDistance('');
    setDuration('');
    setIntensity('medium');
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <label>Дата:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Разстояние (км):</label>
      <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} required />

      <label>Времетраене (минути):</label>
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />

      <label>Интензивност:</label>
      <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
        <option value="light">Леко</option>
        <option value="medium">Средно</option>
        <option value="extreme">Екстремно</option>
      </select>

      <label>Коментари:</label>
      <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Допълнителни бележки..." />

      <button type="submit">Добави тренировка</button>
    </form>
  );
};

export default WorkoutForm;
