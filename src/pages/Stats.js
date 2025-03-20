import React from 'react';
import '../pages/Stats.css';

const Stats = () => {
  return (
    <div className="stats-container">
      <h1>📊 Workout Statistics</h1>
      <div className="stats-item">Общо изминати километри: 0 км</div>
      <div className="stats-item">Средна продължителност: 0 мин</div>
    </div>
  );
};

export default Stats;
