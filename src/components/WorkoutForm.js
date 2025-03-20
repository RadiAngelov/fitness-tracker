import React, { useState } from 'react';
import '../components/WorkoutForm.css';

const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 30); // 30 дни назад
    return today.toISOString().split("T")[0]; // Връща във формат YYYY-MM-DD
  };
  
  const getMaxDate = () => {
    return new Date().toISOString().split("T")[0]; // Днешна дата
  };
  

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
    <form onSubmit={handleSubmit} className="workout-form fade-in">
      <div className="form-group">
        <label>Дата:</label>
        <input type="date" min={getMinDate()} max={getMaxDate()} value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Разстояние (км):</label>
        <input type="number" min="1" value={distance} onChange={(e) => setDistance(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Времетраене (минути):</label>
        <input type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Интензивност:</label>
        <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
          <option value="light">Леко</option>
          <option value="medium">Средно</option>
          <option value="extreme">Екстремно</option>
        </select>
      </div>

      <div className="form-group">
        <label>Коментари:</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Допълнителни бележки..." />
      </div>

      <button type="submit">Добави тренировка</button>

    </form>
  );
};

export default WorkoutForm;
